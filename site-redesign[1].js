/*
 * Chabad of Fort Lee — Site + Homepage Redesign
 * Additive layer: preserves existing custom-header.js and events.js functionality.
 */
(function(){
  "use strict";

  var d=document;
  var LOGO_URL="https://chabadfortlee.com/media/images/1388/kDzA13885475.png";
  var BUILDING_URL="https://chabadfortlee.com/media/images/1386/OcuJ13869899.png";
  var UPCOMING_URL="/templates/articlecco_cdo/aid/7437974/jewish/Upcoming-at-Chabad.htm";
  var TEMPLATE_HTML="<div id=\"cfle-home-v2\">\n\n  <!-- HERO -->\n\n  <section class=\"cfle-v2-hero\">\n\n    <svg class=\"cfle-v2-hero-arcs\"\n         viewBox=\"0 0 1440 700\"\n         preserveAspectRatio=\"none\"\n         aria-hidden=\"true\">\n\n      <path d=\"M440 190 C700 55 1060 55 1450 145\"></path>\n\n      <path d=\"M-20 510 C180 615 390 630 600 596\"></path>\n\n    </svg>\n\n\n    <div class=\"cfle-v2-hero-inner\">\n\n      <div class=\"cfle-v2-hero-copy\">\n\n        <div class=\"cfle-v2-eyebrow\">\n          Welcome to\n        </div>\n\n        <h1 class=\"cfle-v2-title\">\n\n          <span class=\"cfle-v2-title-dark\">\n            Chabad of\n          </span>\n\n          <span class=\"cfle-v2-title-gold\">\n            Fort Lee\n          </span>\n\n        </h1>\n\n      </div>\n\n\n      <div class=\"cfle-v2-building-wrap\">\n\n        <img\n          alt=\"Illustration of the Chabad of Fort Lee building\"\n          class=\"cfle-v2-building\"\n          data-cfle-v2-building\n        />\n\n      </div>\n\n    </div>\n\n\n    <!-- SAME CURVED BOTTOM ON DESKTOP + MOBILE -->\n\n    <svg class=\"cfle-v2-hero-curve\"\n         viewBox=\"0 0 1440 140\"\n         preserveAspectRatio=\"none\"\n         aria-hidden=\"true\">\n\n      <path\n        class=\"cfle-v2-curve-fill\"\n        d=\"\n          M0 84\n          C170 110 340 116 510 96\n          C735 68 900 18 1110 30\n          C1275 40 1375 73 1440 92\n          L1440 141\n          L0 141\n          Z\n        \">\n      </path>\n\n      <path\n        class=\"cfle-v2-curve-soft\"\n        d=\"\n          M0 72\n          C170 98 340 104 510 84\n          C735 56 900 6 1110 18\n          C1275 28 1375 61 1440 80\n        \">\n      </path>\n\n      <path\n        class=\"cfle-v2-curve-gold\"\n        d=\"\n          M0 84\n          C170 110 340 116 510 96\n          C735 68 900 18 1110 30\n          C1275 40 1375 73 1440 92\n        \">\n      </path>\n\n    </svg>\n\n  </section>\n\n\n  <!-- UPCOMING -->\n\n  <section class=\"cfle-v2-events\">\n\n    <h2 class=\"cfle-v2-section-title\">\n      Upcoming at Chabad\n    </h2>\n\n    <div\n      class=\"cfle-v2-events-grid\"\n      data-cfle-v2-events>\n    </div>\n\n    <div class=\"cfle-v2-events-more-wrap\">\n\n      <a\n        class=\"cfle-v2-events-more\"\n        data-cfle-v2-events-more\n        href=\"/templates/articlecco_cdo/aid/7437974/jewish/Upcoming-at-Chabad.htm\">\n\n        View All Upcoming Events\n        <span aria-hidden=\"true\">\u203a</span>\n\n      </a>\n\n    </div>\n\n  </section>\n\n\n  <!-- PRAYER + SHABBAT -->\n\n  <section class=\"cfle-v2-info\">\n\n    <div class=\"cfle-v2-info-inner\">\n\n\n      <!-- PRAYER -->\n\n      <div class=\"cfle-v2-prayer\">\n\n        <h2 class=\"cfle-v2-icon-heading\">\n\n          <svg viewBox=\"0 0 48 48\"\n               aria-hidden=\"true\">\n\n            <path d=\"\n              M24 12\n              C20 9 14 8 7 9\n              V35\n              C14 34 20 35 24 38\n              C28 35 34 34 41 35\n              V9\n              C34 8 28 9 24 12\n              Z\">\n            </path>\n\n            <path d=\"M24 12 V38\"></path>\n\n          </svg>\n\n          <span>Prayer Times</span>\n\n        </h2>\n\n\n        <div\n          class=\"cfle-v2-prayer-columns\"\n          data-cfle-v2-prayer>\n        </div>\n\n      </div>\n\n\n      <!-- SHABBAT -->\n\n      <div class=\"cfle-v2-shabbat\">\n\n        <h2 class=\"cfle-v2-icon-heading\">\n\n          <svg viewBox=\"0 0 48 48\"\n               aria-hidden=\"true\">\n\n            <rect\n              x=\"7\"\n              y=\"10\"\n              width=\"34\"\n              height=\"31\"\n              rx=\"3\">\n            </rect>\n\n            <path d=\"\n              M7 19 H41\n              M16 6 V14\n              M32 6 V14\n            \">\n            </path>\n\n            <path\n              stroke-width=\"2.7\"\n              d=\"\n                M15 25 H18\n                M22.5 25 H25.5\n                M30 25 H33\n                M15 31 H18\n                M22.5 31 H25.5\n                M30 31 H33\n              \">\n            </path>\n\n          </svg>\n\n          <span>Shabbat &amp; Holidays</span>\n\n        </h2>\n\n\n        <div\n          class=\"cfle-v2-shabbat-card\"\n          data-cfle-v2-shabbat>\n\n          <div class=\"cfle-v2-candle-heading\">\n\n            <svg viewBox=\"0 0 48 48\"\n                 aria-hidden=\"true\">\n\n              <path d=\"\n                M14 7\n                C17 10 17 13 14 15\n                C11 13 11 10 14 7\n\n                M34 7\n                C37 10 37 13 34 15\n                C31 13 31 10 34 7\n              \">\n              </path>\n\n              <path d=\"\n                M14 19 V38\n                M34 19 V38\n                M9 38 H19\n                M29 38 H39\n                M11 25 H17\n                M31 25 H37\n              \">\n              </path>\n\n            </svg>\n\n\n            <div>\n\n              <h3 class=\"cfle-v2-candle-title\">\n                Candle Lighting Times\n              </h3>\n\n              <p\n                class=\"cfle-v2-location\"\n                data-cfle-v2-location>\n                Fort Lee, NJ 07024\n              </p>\n\n            </div>\n\n          </div>\n\n\n          <div\n            class=\"cfle-v2-times\"\n            data-cfle-v2-times>\n          </div>\n\n\n          <!-- LAST CONTENT IN BEIGE CARD -->\n\n          <div class=\"cfle-v2-torah\">\n\n            <h3 class=\"cfle-v2-torah-title\">\n              Weekly Torah Portion\n            </h3>\n\n            <p\n              class=\"cfle-v2-torah-name\"\n              data-cfle-v2-parsha>\n            </p>\n\n          </div>\n\n          <div class=\"cfle-v2-holiday\" data-cfle-v2-holiday-wrap>\n            <h3 class=\"cfle-v2-holiday-title\">Upcoming Holiday</h3>\n            <a class=\"cfle-v2-holiday-name\" data-cfle-v2-holiday></a>\n            <p class=\"cfle-v2-holiday-date\" data-cfle-v2-holiday-date></p>\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </section>\n\n\n  <!-- DECORATIVE GOLD BOKEH BAND -->\n\n  <div\n    class=\"cfle-v2-band\"\n    aria-hidden=\"true\">\n\n    <svg\n      class=\"cfle-v2-band-top\"\n      viewBox=\"0 0 1440 100\"\n      preserveAspectRatio=\"none\">\n\n      <path\n        d=\"\n          M0 0\n          L1440 0\n          L1440 37\n          C1240 12 1050 3 835 26\n          C635 48 410 89 200 69\n          C105 59 46 47 0 57\n          Z\n        \"\n        fill=\"#fffdf8\">\n      </path>\n\n      <path\n        d=\"\n          M1440 37\n          C1240 12 1050 3 835 26\n          C635 48 410 89 200 69\n          C105 59 46 47 0 57\n        \"\n        fill=\"none\"\n        stroke=\"#c89536\"\n        stroke-width=\"1.3\">\n      </path>\n\n    </svg>\n\n\n    <svg\n      class=\"cfle-v2-band-bottom\"\n      viewBox=\"0 0 1440 120\"\n      preserveAspectRatio=\"none\">\n\n      <path\n        d=\"\n          M0 52\n          C205 92 430 103 710 80\n          C990 57 1205 29 1440 49\n          L1440 72\n          C1205 52 990 80 710 103\n          C430 126 205 115 0 75\n          Z\n        \"\n        fill=\"#f5e5bb\">\n      </path>\n\n      <path\n        d=\"\n          M0 52\n          C205 92 430 103 710 80\n          C990 57 1205 29 1440 49\n        \"\n        fill=\"none\"\n        stroke=\"#c89536\"\n        stroke-width=\"1.2\">\n      </path>\n\n      <path\n        d=\"\n          M0 75\n          C205 115 430 126 710 103\n          C990 80 1205 52 1440 72\n          L1440 121\n          L0 121\n          Z\n        \"\n        fill=\"#5b3d17\">\n      </path>\n\n    </svg>\n\n  </div>\n\n\n  <!-- MAILING LIST -->\n\n  <section class=\"cfle-v2-mailing\">\n\n    <h2 class=\"cfle-v2-mail-title\">\n\n      <svg viewBox=\"0 0 48 48\"\n           aria-hidden=\"true\">\n\n        <rect\n          x=\"5\"\n          y=\"10\"\n          width=\"38\"\n          height=\"28\"\n          rx=\"3\">\n        </rect>\n\n        <path d=\"M6 13 L24 28 L42 13\"></path>\n\n      </svg>\n\n      <span>\n        Join Our Mailing List\n      </span>\n\n    </h2>\n\n\n    <p class=\"cfle-v2-mail-sub\">\n      Stay connected with upcoming events, classes, and community updates.\n    </p>\n\n\n    <div\n      class=\"cfle-v2-mail-slot\"\n      data-cfle-v2-mail>\n    </div>\n\n  </section>\n\n</div>";

  function qs(sel,root){return (root||d).querySelector(sel);}
  function qsa(sel,root){return Array.prototype.slice.call((root||d).querySelectorAll(sel));}
  function txt(node){return node?String(node.textContent||node.innerText||"").replace(/\u00a0/g," ").replace(/\s+/g," ").trim():"";}
  function href(node){return node?node.getAttribute("href")||"":"";}
  function make(tag,cls,text){var el=d.createElement(tag); if(cls) el.className=cls; if(text!==undefined&&text!==null) el.appendChild(d.createTextNode(text)); return el;}
  function normalize(s){return String(s||"").replace(/\s+/g," ").trim().toLowerCase();}

  /* ==========================================================
     SITE-WIDE HEADER
     ========================================================== */

  function smallestCommonAncestor(nodes,limit){
    if(!nodes.length) return null;
    var n=nodes[0];
    while(n && n!==limit && n!==d.body){
      var ok=true;
      for(var i=1;i<nodes.length;i++){if(!n.contains(nodes[i])){ok=false;break;}}
      if(ok) return n;
      n=n.parentNode;
    }
    return null;
  }

  function findUtilityRow(header){
    var wanted={home:null,about:null,ask:null,contact:null};
    qsa("a[href]",header).forEach(function(a){
      var t=normalize(a.textContent||"");
      var h=String(a.getAttribute("href")||"").toLowerCase();
      if(!wanted.home && (t==="home" || h==="/" || /chabadfortlee\.com\/?$/.test(h))) wanted.home=a;
      if(!wanted.about && (t==="about" || h.indexOf("1106558")>-1)) wanted.about=a;
      if(!wanted.ask && (t.indexOf("ask the rabbi")>-1 || h.indexOf("asktherabbi")>-1)) wanted.ask=a;
      if(!wanted.contact && (t==="contact" || h.indexOf("tools/feedback")>-1)) wanted.contact=a;
    });
    var nodes=[wanted.home,wanted.about,wanted.ask,wanted.contact].filter(Boolean);
    if(nodes.length<3) return null;
    var common=smallestCommonAncestor(nodes,header);
    if(!common || common===header || qs(".site-logo-wrapper",common) || qs("#co_menu_container",common)) return null;
    return common;
  }

  function setupHeader(){
    var header=qs("#header");
    if(!header) return;
    if(header.className.indexOf("cfle-header-redesign")===-1) header.className+=" cfle-header-redesign";

    var logo=qs("#header_branding .site-logo-wrapper img",header)||qs(".site-logo-wrapper img",header);
    if(logo){
      logo.src=LOGO_URL;
      logo.alt="Chabad Fort Lee";
    }

    var utility=findUtilityRow(header);
    if(utility && utility.className.indexOf("cfle-desktop-utility-row")===-1){
      utility.className+=" cfle-desktop-utility-row";
    }
  }

  /* ==========================================================
     HOMEPAGE
     ========================================================== */

  var root=null;
  var nativeHome=null;
  var last={events:"",prayer:"",shabbat:""};

  function isHomepage(){
    var p=String(location.pathname||"/").toLowerCase().replace(/\/+$/g,"");
    return p===""||p==="/"||/\/(?:index|default)\.(?:html?|asp)$/.test(p);
  }

  function belongsToNew(node){
    if(!node) return false;
    if(root && root.contains(node)) return true;
    var header=qs("#header");
    return !!(header && header.contains(node));
  }

  function hideSource(node){
    if(!node) return;
    if(String(node.className).indexOf("cfle-v2-native-source")===-1) node.className+=" cfle-v2-native-source";
    node.setAttribute("aria-hidden","true");
  }

  function slot(name){return root?qs('[data-cfle-v2-'+name+']',root):null;}

  function mount(){
    root=qs("#cfle-home-v2");
    if(root) return true;
    nativeHome=qs(".hp-table")||qs(".hp_content_wrapper");
    if(!nativeHome||!nativeHome.parentNode) return false;
    var holder=make("div");
    holder.innerHTML=TEMPLATE_HTML;
    root=qs("#cfle-home-v2",holder);
    if(!root) return false;
    nativeHome.parentNode.insertBefore(root,nativeHome);
    hideSource(nativeHome);
    if(d.body.className.indexOf("cfle-home-v2-active")===-1) d.body.className+=" cfle-home-v2-active";
    var building=qs("[data-cfle-v2-building]",root);
    if(building) building.src=BUILDING_URL;
    var more=qs("[data-cfle-v2-events-more]",root);
    if(more) more.href=UPCOMING_URL;
    return true;
  }

  /* ---------------- EVENTS: consume current events.js output ---------------- */

  function findEventList(){
    var lists=qsa(".cfle-home-events-list");
    for(var i=0;i<lists.length;i++) if(!belongsToNew(lists[i])) return lists[i];
    return null;
  }

  function parseEvents(list){
    if(!list) return null;
    var out=[];
    qsa(".cfle-home-event",list).forEach(function(card){
      if(out.length>=4) return;
      var title=txt(qs(".cfle-home-event-title",card));
      if(!title) return;
      out.push({
        month:txt(qs(".cfle-home-date-month",card)),
        number:txt(qs(".cfle-home-date-day",card)),
        day:txt(qs(".cfle-home-date-weekday",card)),
        title:title,
        time:txt(qs(".cfle-home-event-time",card)),
        href:href(card)||href(qs("a",card)),
        featured:/(^|\s)cfle-home-event--featured(\s|$)/.test(card.className||"")
      });
    });
    return out.length?out:null;
  }

  function renderEvents(events){
    var target=slot("events");
    if(!target||!events) return;
    target.innerHTML="";
    target.setAttribute("data-count",String(events.length));
    events.forEach(function(ev){
      var card=make(ev.href?"a":"div","cfle-v2-event"+(ev.featured?" cfle-v2-event--featured":""));
      if(ev.href) card.href=ev.href;
      var date=make("span","cfle-v2-date");
      date.appendChild(make("span","cfle-v2-date-month",ev.month));
      date.appendChild(make("span","cfle-v2-date-number",ev.number));
      date.appendChild(make("span","cfle-v2-date-dayname",ev.day));
      var copy=make("span","cfle-v2-event-copy");
      if(ev.featured){
        var badge=make("span","cfle-v2-featured");
        badge.appendChild(make("span","cfle-v2-featured-star","★"));
        badge.appendChild(make("span","","Featured"));
        copy.appendChild(badge);
      }
      copy.appendChild(make("span","cfle-v2-event-name",ev.title));
      if(ev.time) copy.appendChild(make("span","cfle-v2-event-time",ev.time));
      var arrow=make("span","cfle-v2-event-arrow","›");
      arrow.setAttribute("aria-hidden","true");
      card.appendChild(date);
      card.appendChild(copy);
      card.appendChild(arrow);
      target.appendChild(card);
    });
  }

  /* ---------------- PRAYER TIMES: consume native ChabadOne widget ---------------- */

  function findPrayerSource(){
    var candidates=qsa(".chabad_updates");
    for(var i=0;i<candidates.length;i++){
      if(belongsToNew(candidates[i])) continue;
      var heading=txt(qs(".widget_header h5",candidates[i]));
      if(/prayer times/i.test(heading)||(/shacharit/i.test(txt(candidates[i]))&&/mincha\/maariv/i.test(txt(candidates[i])))) return candidates[i];
    }
    return null;
  }

  function parsePrayer(node){
    if(!node) return null;
    var box=qs(".bottom_padding",node)||qs(".widget_content",node)||node;
    var raw=String(box.innerText||box.textContent||"").replace(/\u00a0/g," ");
    var lines=raw.split(/\n+/).map(function(x){return x.replace(/\s+/g," ").trim();}).filter(Boolean);
    var groups=[],current=null;
    lines.forEach(function(line){
      if(/^(shacharit|mincha\/maariv)$/i.test(line)){
        current={title:line,rows:[]};
        groups.push(current);
        return;
      }
      var m=/^(.+?)\s*[-–—]\s*(.+)$/.exec(line);
      if(m&&current) current.rows.push([m[1].trim(),m[2].trim()]);
    });
    groups=groups.filter(function(g){return g.rows.length;}).slice(0,2);
    return groups.length?groups:null;
  }

  function renderPrayer(groups){
    var target=slot("prayer");
    if(!target||!groups) return;
    target.innerHTML="";
    groups.forEach(function(group){
      var wrap=make("div","cfle-v2-prayer-group");
      wrap.appendChild(make("h3","cfle-v2-prayer-name",group.title));
      var rows=make("div","cfle-v2-prayer-rows");
      group.rows.forEach(function(r){
        rows.appendChild(make("span","",r[0]));
        rows.appendChild(make("span","","-"));
        rows.appendChild(make("span","",r[1]));
      });
      wrap.appendChild(rows);
      target.appendChild(wrap);
    });
  }

  /* ---------------- SHABBAT/HOLIDAY: exact native widget structure ---------------- */

  function findShabbatSource(){
    var list=qsa(".widget-5.candlelighting, .candlelighting");
    for(var i=0;i<list.length;i++) if(!belongsToNew(list[i])) return list[i];
    return null;
  }

  function shortDate(text){
    var m=/(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\.?\s+(\d{1,2})/i.exec(text||"");
    return m?(m[1].slice(0,3)+" "+m[2]):String(text||"").trim();
  }

  function parseShabbat(node){
    if(!node) return null;
    var data={location:"Fort Lee, NJ 07024",rows:[],parsha:"",parshaHref:"",holiday:"",holidayHref:"",holidayDate:""};
    var loc=qs(".candlelighting_heading .section_subheading",node);
    if(loc) data.location=txt(loc)||data.location;

    qsa(".times_wrapper .medium_top_padding",node).forEach(function(row){
      var label=txt(qs(".when_to_light",row));
      var a=qs("a",row);
      var timeNode=qs(".bold.large",row);
      var time=txt(timeNode);
      var full=txt(a||row);
      var dateText=full;
      if(time) dateText=full.replace(time,"").replace(/^\s*[-–—]\s*/,"").trim();
      data.rows.push({date:shortDate(dateText),time:time,label:label,href:href(a)});
    });

    var parsha=qs(".parsha_content .bold.large a",node)||qs(".parsha_content .bold.large",node);
    if(parsha){data.parsha=txt(parsha);data.parshaHref=href(parsha);}

    var holiday=qs(".upcomingholiday_content .bold.large a",node)||qs(".upcomingholiday_content .bold.large",node);
    if(holiday){data.holiday=txt(holiday);data.holidayHref=href(holiday);}
    var hc=qs(".upcomingholiday_content",node);
    if(hc){
      var lines=String(hc.innerText||hc.textContent||"").split(/\n+/).map(function(x){return x.replace(/\s+/g," ").trim();}).filter(Boolean);
      for(var i=0;i<lines.length;i++){
        if(lines[i]!==data.holiday&&!/upcoming holiday/i.test(lines[i])){data.holidayDate=lines[i];break;}
      }
    }
    return (data.rows.length||data.parsha||data.holiday)?data:null;
  }

  function renderShabbat(data){
    if(!data) return;
    var times=slot("times");
    if(!times) return;
    times.innerHTML="";
    data.rows.forEach(function(item){
      var row=make(item.href?"a":"div","cfle-v2-time-row");
      if(item.href) row.href=item.href;
      row.appendChild(make("span","cfle-v2-time-date",item.date));
      row.appendChild(make("i","cfle-v2-divider"));
      row.appendChild(make("span","cfle-v2-time-value",item.time));
      row.appendChild(make("i","cfle-v2-divider"));
      row.appendChild(make("span","cfle-v2-time-label",item.label));
      times.appendChild(row);
    });

    var loc=slot("location");
    if(loc) loc.textContent=data.location;

    var parshaSlot=slot("parsha");
    if(parshaSlot){
      parshaSlot.innerHTML="";
      var p=make(data.parshaHref?"a":"span","",data.parsha);
      if(data.parshaHref) p.href=data.parshaHref;
      parshaSlot.appendChild(p);
    }

    var hw=slot("holiday-wrap"),hn=slot("holiday"),hd=slot("holiday-date");
    if(hw){
      if(data.holiday){
        hw.hidden=false;
        if(hn){
          hn.textContent=data.holiday;
          if(data.holidayHref) hn.href=data.holidayHref;
          else hn.removeAttribute("href");
        }
        if(hd) hd.textContent=data.holidayDate;
      }else{
        hw.hidden=true;
      }
    }
  }

  /* ---------------- MAILING LIST: move real form + response ---------------- */

  function findMailing(){
    var fc=qs(".hp_subscribe #formContainer")||qs(".subscribe #formContainer")||qs("#formContainer");
    if(!fc||belongsToNew(fc)) return null;
    var response=qs("#response");
    return {container:fc,response:response};
  }

  function moveMailing(obj){
    var target=slot("mail");
    if(!target||!obj||target.contains(obj.container)) return;
    target.appendChild(obj.container);
    if(obj.response) target.appendChild(obj.response);
    qsa('input[type="text"],input[type="email"]',obj.container).forEach(function(input){
      if(!input.getAttribute("aria-label")){
        input.setAttribute("aria-label",input.getAttribute("placeholder")||input.getAttribute("name")||"Subscription field");
      }
    });
  }

  function updateHomepage(){
    var events=parseEvents(findEventList());
    if(events){
      var ek=JSON.stringify(events);
      if(ek!==last.events){renderEvents(events);last.events=ek;}
    }

    var prayer=parsePrayer(findPrayerSource());
    if(prayer){
      var pk=JSON.stringify(prayer);
      if(pk!==last.prayer){renderPrayer(prayer);last.prayer=pk;}
    }

    var shabbat=parseShabbat(findShabbatSource());
    if(shabbat){
      var sk=JSON.stringify(shabbat);
      if(sk!==last.shabbat){renderShabbat(shabbat);last.shabbat=sk;}
    }

    var mail=findMailing();
    if(mail) moveMailing(mail);
  }

  function startHomepage(){
    if(!isHomepage()||!mount()) return;
    updateHomepage();

    var timer=null;
    function schedule(){
      if(timer) return;
      timer=setTimeout(function(){timer=null;updateHomepage();},80);
    }

    if(window.MutationObserver){
      var obs=new MutationObserver(schedule);
      obs.observe(d.body,{childList:true,subtree:true,characterData:true});
      setTimeout(function(){try{obs.disconnect();}catch(e){}},18000);
    }

    [250,700,1300,2400,4500,8000,14000].forEach(function(ms){setTimeout(updateHomepage,ms);});
  }

  function start(){
    setupHeader();
    startHomepage();
  }

  if(d.readyState==="loading") d.addEventListener("DOMContentLoaded",start,false);
  else start();

  window.addEventListener("resize",setupHeader,false);
})();
