/*
 * Chabad of Fort Lee — Homepage Redesign V3
 * Moves the REAL ChabadOne widgets into a new visual layout.
 * It does not replace event, prayer, candle-lighting, mailing-list,
 * Donate, menu, or Pushka functionality.
 */
(function(){
  "use strict";

  if(window.CFLE_REDESIGN_V3_LOADED){ return; }
  window.CFLE_REDESIGN_V3_LOADED=true;

  var d=document;
  var mounted=false;
  var tries=0;
  var MAX_TRIES=80; // ~20 seconds at 250ms

  function q(sel,root){ return (root||d).querySelector(sel); }
  function qa(sel,root){ return Array.prototype.slice.call((root||d).querySelectorAll(sel)); }
  function text(el){ return el ? String(el.textContent||el.innerText||"").replace(/\u00a0/g," ").replace(/\s+/g," ").trim() : ""; }

  function isHomepage(){
    var path=String(location.pathname||"/").replace(/\/+$/g,"").toLowerCase();
    if(d.body && /(^|\s)home(?:\s|$)/.test(d.body.className||"")){ return true; }
    return path==="" || path==="/" || /\/(?:index|default)\.(?:html?|asp)$/.test(path);
  }

  function findPrayerWidget(){
    var widgets=qa(".chabad_updates");
    for(var i=0;i<widgets.length;i++){
      if(/(^|\s)cfle-home-events-widget(?:\s|$)/.test(widgets[i].className||"")){ continue; }
      var h=text(q(".widget_header h5",widgets[i]));
      if(/^prayer times$/i.test(h) || (/shacharit/i.test(text(widgets[i])) && /mincha\/?maariv/i.test(text(widgets[i])))){
        return widgets[i];
      }
    }
    return null;
  }

  function findWidgets(){
    var events=q(".cfle-home-events-widget");
    var prayer=findPrayerWidget();
    var shabbat=q(".widget-5.candlelighting") || q(".candlelighting.custom") || q(".candlelighting");
    var mailing=q(".hp_subscribe .subscribe") || q(".widget-4.subscribe") || q(".subscribe.custom");

    // Wait until events.js has actually rendered its real homepage list.
    if(events && !q(".cfle-home-events-list",events)){ events=null; }

    return {events:events, prayer:prayer, shabbat:shabbat, mailing:mailing};
  }

  function make(tag,cls,html){
    var el=d.createElement(tag);
    if(cls){ el.className=cls; }
    if(html!==undefined){ el.innerHTML=html; }
    return el;
  }

  function buildShell(){
    var root=make("div","cfle-v3-home");
    root.id="cfle-home-v3";
    root.innerHTML='\
      <section class="cfle-v3-hero" aria-label="Welcome to Chabad of Fort Lee">\
        <div class="cfle-v3-hero-copy">\
          <div class="cfle-v3-eyebrow"><span>Welcome to</span></div>\
          <h1><span class="cfle-v3-title-dark">Chabad of</span><span class="cfle-v3-title-gold">Fort Lee</span></h1>\
        </div>\
        <svg class="cfle-v3-hero-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">\
          <path class="cfle-v3-hero-wave-fill" d="M0,76 C190,116 390,118 590,92 C810,64 1000,38 1180,50 C1300,58 1385,76 1440,88 L1440,121 L0,121 Z"></path>\
          <path class="cfle-v3-hero-wave-line" d="M0,76 C190,116 390,118 590,92 C810,64 1000,38 1180,50 C1300,58 1385,76 1440,88"></path>\
        </svg>\
      </section>\
      <main class="cfle-v3-main">\
        <section class="cfle-v3-events-slot" data-cfle-v3-events></section>\
        <section class="cfle-v3-info">\
          <div class="cfle-v3-prayer-slot" data-cfle-v3-prayer></div>\
          <div class="cfle-v3-shabbat-slot" data-cfle-v3-shabbat></div>\
        </section>\
      </main>\
      <section class="cfle-v3-mailing">\
        <div class="cfle-v3-mailing-inner">\
          <div class="cfle-v3-mailing-slot" data-cfle-v3-mailing></div>\
        </div>\
      </section>';
    return root;
  }

  function splitPrayerIntoBlocks(prayer){
    var bottom=q(".bottom_padding",prayer);
    if(!bottom || bottom.getAttribute("data-cfle-v3-split")==="1"){ return; }

    var nodes=Array.prototype.slice.call(bottom.childNodes);
    var blocks=[];
    var current=null;

    nodes.forEach(function(node){
      var isHeading=node.nodeType===1 && /(^|\s)prayer_heading(?:\s|$)/.test(node.className||"");
      if(isHeading){
        current=make("div","cfle-v3-prayer-block");
        blocks.push(current);
      }
      if(current){ current.appendChild(node); }
    });

    if(blocks.length){
      bottom.innerHTML="";
      blocks.forEach(function(block){ bottom.appendChild(block); });
      bottom.setAttribute("data-cfle-v3-split","1");
    }
  }

  function decorateEvents(events){
    var list=q(".cfle-home-events-list",events);
    if(!list){ return; }

    function update(){
      var cards=qa(".cfle-home-event",list);
      list.setAttribute("data-cfle-count",String(Math.min(cards.length,4)));
      // events.js already caps the homepage at 4; this is only a safety net.
      cards.forEach(function(card,index){ card.style.display=index<4?"":"none"; });

      var more=q(".cfle-home-events-more",events) || q(".cfle-home-more",events);
      if(more){ more.innerHTML='View All Upcoming Events <span aria-hidden="true">›</span>'; }
    }

    update();
    if(window.MutationObserver){
      var observer=new MutationObserver(update);
      observer.observe(list,{childList:true,subtree:true});
    }
  }

  function decorateMailing(mailing){
    var header=q(".widget_header",mailing);
    if(header && !q(".cfle-v3-mail-subtitle",mailing)){
      var sub=make("p","cfle-v3-mail-subtitle","Stay connected with upcoming events, classes, and community updates.");
      header.parentNode.insertBefore(sub,header.nextSibling);
    }
    qa('input[type="text"],input[type="email"]',mailing).forEach(function(input){
      if(!input.getAttribute("aria-label")){
        input.setAttribute("aria-label",input.getAttribute("placeholder")||input.name||"Mailing list field");
      }
    });
  }

  function hideOldHomepageShell(root){
    // The legacy homepage table is kept in the DOM so all ChabadOne scripts still exist,
    // but the working widgets themselves have already been moved into V3.
    var hp=q(".hp-table");
    if(hp && !root.contains(hp)){ hp.className += " cfle-v3-native-home-hidden"; }

    // In templates where the homepage isn't wrapped by .hp-table, hide only old empty rows.
    qa(".hp-row-first,.hp-row.hp_content_wrapper,.hp-row.hp_subscribe").forEach(function(row){
      if(!root.contains(row) && !q(".cfle-home-events-widget,.chabad_updates,.candlelighting,.subscribe",row)){
        row.className += " cfle-v3-native-home-hidden";
      }
    });
  }

  function mount(w){
    if(mounted){ return; }

    var anchor=q(".hp-table") || q(".hp-row-first") || q(".hp_content_wrapper");
    if(!anchor || !anchor.parentNode){ return; }

    var root=buildShell();
    anchor.parentNode.insertBefore(root,anchor);

    q("[data-cfle-v3-events]",root).appendChild(w.events);
    q("[data-cfle-v3-prayer]",root).appendChild(w.prayer);
    q("[data-cfle-v3-shabbat]",root).appendChild(w.shabbat);
    q("[data-cfle-v3-mailing]",root).appendChild(w.mailing);

    splitPrayerIntoBlocks(w.prayer);
    decorateEvents(w.events);
    decorateMailing(w.mailing);

    hideOldHomepageShell(root);

    d.body.className += " cfle-v3-active";
    mounted=true;
  }

  function attempt(){
    if(!isHomepage() || mounted){ return; }
    tries++;
    var w=findWidgets();
    if(w.events && w.prayer && w.shabbat && w.mailing){
      mount(w);
      return;
    }
    if(tries<MAX_TRIES){ window.setTimeout(attempt,250); }
  }

  function start(){
    if(!isHomepage()){ return; }
    attempt();
    if(window.MutationObserver){
      var observer=new MutationObserver(function(){ if(!mounted){ attempt(); } });
      observer.observe(d.documentElement,{childList:true,subtree:true});
      window.setTimeout(function(){ try{observer.disconnect();}catch(e){} },22000);
    }
  }

  if(d.readyState==="loading"){
    d.addEventListener("DOMContentLoaded",start,false);
  }else{
    start();
  }
})();
