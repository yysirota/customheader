/*
 * Chabad of Fort Lee — Homepage Redesign V4.1
 *
 * Structural update:
 * - Mounts the V4 homepage shell as soon as the native homepage anchor exists.
 * - Moves the events marker/widget immediately, before waiting for Prayer,
 *   Shabbat, or Mailing widgets.
 * - Moves the remaining real ChabadOne widgets into their slots as each appears.
 * - Keeps the native homepage DOM alive off-screen so ChabadOne scripts continue
 *   to function.
 *
 * This removes the several-second "old/stacked events first, corrected later"
 * behavior without changing the mobile visual design.
 */
(function(){
  "use strict";

  if(window.CFLE_REDESIGN_V4_LOADED){ return; }
  window.CFLE_REDESIGN_V4_LOADED=true;

  var d=document;
  var root=null;
  var syncTimer=null;
  var globalObserver=null;
  var stopTimer=null;

  function q(sel,ctx){ return (ctx||d).querySelector(sel); }
  function qa(sel,ctx){ return Array.prototype.slice.call((ctx||d).querySelectorAll(sel)); }
  function text(el){ return el ? String(el.textContent||el.innerText||"").replace(/\u00a0/g," ").replace(/\s+/g," ").trim() : ""; }

  function isHomepage(){
    var path=String(location.pathname||"/").replace(/\/+$/g,"").toLowerCase();
    if(d.body && /(^|\s)home(?:\s|$)/.test(d.body.className||"")){ return true; }
    return path==="" || path==="/" || /\/(?:index|default)\.(?:html?|asp)$/.test(path);
  }

  function make(tag,cls,html){
    var el=d.createElement(tag);
    if(cls){ el.className=cls; }
    if(html!==undefined){ el.innerHTML=html; }
    return el;
  }

  function buildShell(){
    var el=make("div","cfle-v4-home");
    el.id="cfle-home-v4";
    el.innerHTML='\
      <section class="cfle-v4-hero" aria-label="Welcome to Chabad of Fort Lee">\
        <h1 class="cfle-v4-visually-hidden">Welcome to Chabad of Fort Lee</h1>\
        <picture class="cfle-v4-hero-picture">\
          <source media="(max-width: 700px)" srcset="https://yysirota.github.io/customheader/cfle-hero-exact-mobile.webp?v=4.0.0">\
          <img class="cfle-v4-hero-art" src="https://yysirota.github.io/customheader/cfle-hero-exact-desktop.webp?v=4.0.0" alt="">\
        </picture>\
      </section>\
      <main class="cfle-v4-main">\
        <section class="cfle-v4-events-slot" data-cfle-v4-events></section>\
        <section class="cfle-v4-info">\
          <div class="cfle-v4-prayer-slot" data-cfle-v4-prayer></div>\
          <div class="cfle-v4-shabbat-slot" data-cfle-v4-shabbat></div>\
        </section>\
      </main>\
      <section class="cfle-v4-mailing">\
        <div class="cfle-v4-mailing-inner">\
          <div class="cfle-v4-mailing-slot" data-cfle-v4-mailing></div>\
        </div>\
      </section>';
    return el;
  }

  function findHomepageEventsWidget(){
    var rendered=q(".chabad_updates.cfle-home-events-widget");
    var widgets;
    var i;

    if(rendered){ return rendered; }

    widgets=qa(".chabad_updates");

    for(i=0;i<widgets.length;i++){
      if(text(widgets[i]).indexOf("CFLE_PAGE_EVENTS")>-1){
        return widgets[i];
      }
    }

    return null;
  }

  function findPrayerWidget(){
    var widgets=qa(".chabad_updates");
    var i;
    var h;
    var whole;

    for(i=0;i<widgets.length;i++){
      if(widgets[i]===findHomepageEventsWidget()){ continue; }
      if(/(^|\s)cfle-home-events-widget(?:\s|$)/.test(widgets[i].className||"")){ continue; }

      h=text(q(".widget_header h5",widgets[i]));
      whole=text(widgets[i]);

      if(
        /^prayer times$/i.test(h) ||
        (/shacharit/i.test(whole) && /mincha\/?maariv/i.test(whole))
      ){
        return widgets[i];
      }
    }

    return null;
  }

  function findWidgets(){
    return {
      events:findHomepageEventsWidget(),
      prayer:findPrayerWidget(),
      shabbat:q(".widget-5.candlelighting") || q(".candlelighting.custom") || q(".candlelighting"),
      mailing:q(".hp_subscribe .subscribe") || q(".widget-4.subscribe") || q(".subscribe.custom")
    };
  }

  function hideOldHomepageShell(currentRoot){
    var hp=q(".hp-table");

    if(hp && !currentRoot.contains(hp) && !/(^|\s)cfle-v4-native-home-hidden(?:\s|$)/.test(hp.className||"")){
      hp.className += " cfle-v4-native-home-hidden";
    }

    qa(".hp-row-first,.hp-row.hp_content_wrapper,.hp-row.hp_subscribe").forEach(function(row){
      if(
        !currentRoot.contains(row) &&
        !/(^|\s)cfle-v4-native-home-hidden(?:\s|$)/.test(row.className||"") &&
        !q(".cfle-home-events-widget,.chabad_updates,.candlelighting,.subscribe",row)
      ){
        row.className += " cfle-v4-native-home-hidden";
      }
    });
  }

  function ensureShell(){
    var anchor;

    if(root && root.parentNode){ return root; }

    root=q("#cfle-home-v4");
    if(root){ return root; }

    anchor=q(".hp-table") || q(".hp-row-first") || q(".hp_content_wrapper");

    if(!anchor || !anchor.parentNode){ return null; }

    root=buildShell();
    anchor.parentNode.insertBefore(root,anchor);

    /*
     * Hide the old homepage immediately. Its widgets remain in the DOM and
     * keep functioning; syncWidgets() moves them into the visible V4 slots
     * as soon as each one is available.
     */
    hideOldHomepageShell(root);

    if(d.body && !/(^|\s)cfle-v4-active(?:\s|$)/.test(d.body.className||"")){
      d.body.className += " cfle-v4-active";
    }

    return root;
  }

  function splitPrayerIntoBlocks(prayer){
    var bottom=q(".bottom_padding",prayer);
    var nodes;
    var blocks=[];
    var current=null;

    if(!bottom || bottom.getAttribute("data-cfle-v4-split")==="1"){ return; }

    nodes=Array.prototype.slice.call(bottom.childNodes);

    nodes.forEach(function(node){
      var isHeading=node.nodeType===1 && /(^|\s)prayer_heading(?:\s|$)/.test(node.className||"");

      if(isHeading){
        current=make("div","cfle-v4-prayer-block");
        blocks.push(current);
      }

      if(current){ current.appendChild(node); }
    });

    if(blocks.length){
      bottom.innerHTML="";
      blocks.forEach(function(block){ bottom.appendChild(block); });
      bottom.setAttribute("data-cfle-v4-split","1");
    }
  }

  function decorateEvents(events){
    var existingObserver;
    var eventUpdateTimer=null;

    if(!events){ return; }

    function update(){
      var list=q(".cfle-home-events-list",events);
      var cards;
      var more;

      if(!list){ return; }

      cards=qa(".cfle-home-event",list);

      /*
       * Never hide events here. events.js is authoritative for the homepage
       * limit and already renders the final count.
       */
      list.setAttribute(
        "data-cfle-count",
        String(cards.length)
      );

      more=q(".cfle-home-events-more",events) || q(".cfle-home-more",events);

      if(more && text(more)!=="View All Upcoming Events ›"){
        more.innerHTML='View All Upcoming Events <span aria-hidden="true">›</span>';
      }

      if(window.CFLE_REFIT_EVENT_TITLES){
        window.CFLE_REFIT_EVENT_TITLES(events);
      }
    }

    update();

    if(events.getAttribute("data-cfle-v4-events-observer")==="1"){ return; }

    events.setAttribute("data-cfle-v4-events-observer","1");

    if(window.MutationObserver){
      existingObserver=new MutationObserver(function(){
        window.clearTimeout(eventUpdateTimer);
        eventUpdateTimer=window.setTimeout(update,0);
      });

      existingObserver.observe(events,{
        childList:true,
        subtree:true
      });
    }
  }


  function ordinalNumber(value){
    var n=parseInt(value,10);
    var mod100=n%100;
    var suffix="th";

    if(mod100<11 || mod100>13){
      if(n%10===1){ suffix="st"; }
      else if(n%10===2){ suffix="nd"; }
      else if(n%10===3){ suffix="rd"; }
    }

    return String(n)+suffix;
  }

  function ordinalizeDateText(value){
    return String(value||"").replace(/\b(\d{1,2})\b/g,function(match){
      return ordinalNumber(match);
    });
  }

  function normalizeShabbatLabel(value){
    var s=String(value||"").replace(/\u00a0/g," ").replace(/\s+/g," ").trim();

    if(/light\s+candles/i.test(s)){
      return "Light candles at";
    }

    if(/shabbat\s+ends/i.test(s)){
      return "Shabbat ends";
    }

    return s;
  }

  function decorateShabbat(shabbat){
    var content;
    var nativeRoot;
    var present;
    var heading;
    var locationText;
    var timeRows;
    var timeData=[];
    var parsha;
    var holiday;
    var parshaLink;
    var holidayLink;
    var holidayDate;
    var keyParts=[];
    var key;

    if(!shabbat){ return; }

    content=q(".widget_content",shabbat);
    nativeRoot=content ? content.firstElementChild : null;

    if(!content || !nativeRoot){ return; }

    if(!/(^|\s)cfle-v8-shabbat-native(?:\s|$)/.test(nativeRoot.className||"")){
      nativeRoot.className=(nativeRoot.className||"")+" cfle-v8-shabbat-native";
    }

    heading=text(q(".candlelighting_heading .section_heading",nativeRoot)) || "Candle Lighting Times";
    locationText=text(q(".candlelighting_heading .section_subheading",nativeRoot));

    timeRows=qa(".times_wrapper .medium_top_padding",nativeRoot);

    timeRows.forEach(function(row){
      var label=normalizeShabbatLabel(text(q(".when_to_light",row)));
      var anchor=q(".float_left a",row) || q("a",row);
      var timeNode=q(".bold.large",row);
      var timeText=text(timeNode);
      var full=text(anchor || row);
      var dateText=full;

      if(timeText){
        dateText=dateText.replace(timeText,"");
      }

      dateText=dateText.replace(/^\s*[-–—]+\s*/,"").trim();
      dateText=ordinalizeDateText(dateText);

      timeData.push({
        label:label,
        time:timeText,
        date:dateText,
        href:anchor ? (anchor.getAttribute("href")||"") : ""
      });
    });

    parsha=q(".parsha_content",nativeRoot);
    holiday=q(".upcomingholiday_content",nativeRoot);
    parshaLink=parsha && q("a",parsha);
    holidayLink=holiday && q("a",holiday);

    holidayDate="";
    if(holiday){
      Array.prototype.slice.call(holiday.children||[]).forEach(function(el){
        var v=text(el);
        if(v && !/upcoming\s+holiday/i.test(v)){
          holidayDate=v;
        }
      });
    }

    keyParts.push(heading,locationText);
    timeData.forEach(function(item){
      keyParts.push(item.date,item.label,item.time,item.href);
    });
    keyParts.push(
      parshaLink?text(parshaLink):"",
      parshaLink?(parshaLink.getAttribute("href")||""):"",
      holidayLink?text(holidayLink):"",
      holidayLink?(holidayLink.getAttribute("href")||""):"",
      holidayDate
    );
    key=keyParts.join("\u0001");

    present=q(".cfle-v8-shabbat-present",content);

    if(present && present.getAttribute("data-cfle-v8-key")===key){
      return;
    }

    if(!present){
      present=make("div","cfle-v8-shabbat-present");
      content.appendChild(present);
    }

    present.setAttribute("data-cfle-v8-key",key);
    present.innerHTML="";

    var card=make("div","cfle-v8-shabbat-card");
    var head=make("div","cfle-v8-shabbat-card-head");
    head.appendChild(make("div","cfle-v8-shabbat-title",heading));
    if(locationText){
      head.appendChild(make("div","cfle-v8-shabbat-location",locationText));
    }
    card.appendChild(head);

    var times=make("div","cfle-v8-shabbat-times");
    timeData.forEach(function(item){
      var row=item.href ? make("a","cfle-v8-shabbat-time-line") : make("div","cfle-v8-shabbat-time-line");

      if(item.href){ row.setAttribute("href",item.href); }

      row.appendChild(make("span","cfle-v8-shabbat-date",item.date));
      row.appendChild(make("span","cfle-v8-shabbat-dash"," — "));
      row.appendChild(make("span","cfle-v8-shabbat-label",item.label+" "));
      row.appendChild(make("strong","cfle-v8-shabbat-time",item.time));
      times.appendChild(row);
    });
    card.appendChild(times);

    if(parshaLink){
      card.appendChild(make("div","cfle-v8-shabbat-divider"));
      var pblock=make("div","cfle-v8-shabbat-detail");
      pblock.appendChild(make("div","cfle-v8-shabbat-detail-heading","Weekly Torah Portion"));
      var pa=make("a","cfle-v8-shabbat-detail-value",text(parshaLink));
      pa.setAttribute("href",parshaLink.getAttribute("href")||"");
      pblock.appendChild(pa);
      card.appendChild(pblock);
    }

    if(holidayLink || holidayDate){
      card.appendChild(make("div","cfle-v8-shabbat-divider"));
      var hblock=make("div","cfle-v8-shabbat-detail");
      hblock.appendChild(make("div","cfle-v8-shabbat-detail-heading","Upcoming Holiday"));

      if(holidayLink){
        var ha=make("a","cfle-v8-shabbat-detail-value",text(holidayLink));
        ha.setAttribute("href",holidayLink.getAttribute("href")||"");
        hblock.appendChild(ha);
      }

      if(holidayDate){
        hblock.appendChild(make("div","cfle-v8-shabbat-detail-date",holidayDate));
      }

      card.appendChild(hblock);
    }

    present.appendChild(card);
  }

  function decorateMailing(mailing){
    var header;

    if(!mailing){ return; }

    header=q(".widget_header",mailing);

    if(header && !q(".cfle-v4-mail-subtitle",mailing)){
      var sub=make(
        "p",
        "cfle-v4-mail-subtitle",
        "Stay connected with upcoming events, classes, and community updates."
      );

      header.parentNode.insertBefore(sub,header.nextSibling);
    }

    qa('input[type="text"],input[type="email"]',mailing).forEach(function(input){
      if(!input.getAttribute("aria-label")){
        input.setAttribute(
          "aria-label",
          input.getAttribute("placeholder") || input.name || "Mailing list field"
        );
      }
    });
  }

  function moveWidget(widget,slotSelector){
    var slot;

    if(!root || !widget){ return false; }

    slot=q(slotSelector,root);

    if(!slot){ return false; }

    if(widget.parentNode!==slot){
      slot.appendChild(widget);
    }

    return true;
  }

  function allPrimaryWidgetsPlaced(){
    return !!(
      root &&
      q("[data-cfle-v4-events] .chabad_updates",root) &&
      q("[data-cfle-v4-prayer] .chabad_updates",root) &&
      q("[data-cfle-v4-shabbat] .candlelighting",root) &&
      q("[data-cfle-v4-mailing] .subscribe",root)
    );
  }

  function syncWidgets(){
    var w;

    if(!isHomepage()){ return; }

    if(!ensureShell()){ return; }

    w=findWidgets();

    if(w.events){
      moveWidget(w.events,"[data-cfle-v4-events]");
      decorateEvents(w.events);
    }

    if(w.prayer){
      moveWidget(w.prayer,"[data-cfle-v4-prayer]");
      splitPrayerIntoBlocks(w.prayer);
    }

    if(w.shabbat){
      moveWidget(w.shabbat,"[data-cfle-v4-shabbat]");
      decorateShabbat(w.shabbat);
    }

    if(w.mailing){
      moveWidget(w.mailing,"[data-cfle-v4-mailing]");
      decorateMailing(w.mailing);
    }

    hideOldHomepageShell(root);

    if(allPrimaryWidgetsPlaced() && globalObserver){
      try{ globalObserver.disconnect(); }catch(e){}
      globalObserver=null;
    }
  }

  function scheduleSync(){
    window.clearTimeout(syncTimer);
    syncTimer=window.setTimeout(syncWidgets,0);
  }

  function start(){
    if(!isHomepage()){ return; }

    /*
     * Mount immediately; do not wait for every widget.
     */
    syncWidgets();

    /*
     * A few short retries cover ChabadOne modules that arrive after
     * DOMContentLoaded without keeping a permanent polling loop.
     */
    [50,150,300,600,1000,1600,2400].forEach(function(delay){
      window.setTimeout(syncWidgets,delay);
    });

    if(window.MutationObserver){
      globalObserver=new MutationObserver(scheduleSync);

      globalObserver.observe(d.documentElement,{
        childList:true,
        subtree:true
      });

      stopTimer=window.setTimeout(function(){
        if(globalObserver){
          try{ globalObserver.disconnect(); }catch(e){}
          globalObserver=null;
        }
      },12000);
    }
  }

  if(d.readyState==="loading"){
    d.addEventListener("DOMContentLoaded",start,false);
  }else{
    start();
  }
})();
