/* ============================================================
   CHABAD OF FORT LEE — HOMEPAGE EVENTS DESKTOP CONTROLLER V6
   DESKTOP ONLY. MOBILE IS RESTORED/LEFT UNTOUCHED.

   This deliberately uses inline !important for the OUTER layout,
   because the existing events.css contains several historical
   !important desktop layout rules. This makes 1/2/3/4/5/6
   deterministic even in a fresh incognito session.
   ============================================================ */
(function(){
    "use strict";

    var BREAKPOINT = 1025;
    var SIDE_GUTTER = 36;
    var MAX_LIST_WIDTH = 1520;
    var GAP = 18;
    var resizeTimer = null;
    var mutationTimer = null;
    var observer = null;

    function isHomepage(){
        return !!(
            document.body &&
            document.body.classList.contains("home")
        );
    }

    function isDesktop(){
        return window.innerWidth >= BREAKPOINT;
    }

    function important(el, prop, value){
        if(el){
            el.style.setProperty(prop, value, "important");
        }
    }

    function clearImportant(el, props){
        var i;
        if(!el){ return; }
        for(i=0;i<props.length;i++){
            el.style.removeProperty(props[i]);
        }
    }

    function realCards(list){
        return Array.prototype.slice.call(
            list.querySelectorAll(":scope > .cfle-home-event")
        );
    }

    function clearTitleFit(title){
        title.classList.remove(
            "cfle-v6-title-fit-1",
            "cfle-v6-title-fit-2",
            "cfle-v6-title-fit-3"
        );
    }

    function naturalTitleHeight(title){
        var clone;
        var width;
        var height;

        width = title.getBoundingClientRect().width;
        if(!width){
            return 0;
        }

        clone = title.cloneNode(true);
        clone.removeAttribute("id");
        clone.setAttribute("aria-hidden","true");

        clone.style.setProperty("position","absolute","important");
        clone.style.setProperty("left","-99999px","important");
        clone.style.setProperty("top","0","important");
        clone.style.setProperty("visibility","hidden","important");
        clone.style.setProperty("pointer-events","none","important");
        clone.style.setProperty("display","block","important");
        clone.style.setProperty("width",width+"px","important");
        clone.style.setProperty("height","auto","important");
        clone.style.setProperty("max-height","none","important");
        clone.style.setProperty("overflow","visible","important");
        clone.style.setProperty("white-space","normal","important");
        clone.style.setProperty("-webkit-line-clamp","unset","important");
        clone.style.setProperty("-webkit-box-orient","initial","important");

        document.body.appendChild(clone);
        height = clone.getBoundingClientRect().height;
        document.body.removeChild(clone);

        return height;
    }

    function titleNeedsThirdLine(title){
        var cs = window.getComputedStyle(title);
        var lineHeight = parseFloat(cs.lineHeight);
        var height;

        if(!lineHeight){
            return false;
        }

        height = naturalTitleHeight(title);
        return height > (lineHeight * 2.15);
    }

    function fitTitle(title){
        clearTitleFit(title);

        if(!titleNeedsThirdLine(title)){
            return;
        }

        title.classList.add("cfle-v6-title-fit-1");
        if(!titleNeedsThirdLine(title)){
            return;
        }

        title.classList.remove("cfle-v6-title-fit-1");
        title.classList.add("cfle-v6-title-fit-2");
        if(!titleNeedsThirdLine(title)){
            return;
        }

        title.classList.remove("cfle-v6-title-fit-2");
        title.classList.add("cfle-v6-title-fit-3");
    }

    function ensureFeaturedPill(card){
        var content;
        var pill;

        if(!card.classList.contains("cfle-home-event--featured")){
            pill = card.querySelector(".cfle-v6-featured-pill");
            if(pill && pill.parentNode){
                pill.parentNode.removeChild(pill);
            }
            return;
        }

        content = card.querySelector(".cfle-home-event-content");
        if(!content){
            return;
        }

        pill = content.querySelector(".cfle-v6-featured-pill");
        if(!pill){
            pill = document.createElement("span");
            pill.className = "cfle-v6-featured-pill";
            pill.textContent = "FEATURED";
            content.insertBefore(pill, content.firstChild);
        }
    }

    function setArrowState(card, hide){
        var arrows = card.querySelectorAll(".cfle-home-event-arrow");
        var i;

        for(i=0;i<arrows.length;i++){
            if(hide){
                important(arrows[i],"display","none");
                important(arrows[i],"visibility","hidden");
                important(arrows[i],"opacity","0");
            }else{
                arrows[i].style.removeProperty("display");
                arrows[i].style.removeProperty("visibility");
                arrows[i].style.removeProperty("opacity");
            }
        }
    }

    function clearDesktopLayout(){
        var list = document.querySelector(".cfle-home-events-list");
        var cards;
        var i;
        var pill;
        var title;

        document.body.classList.remove("cfle-v6-events-desktop");

        if(!list){
            return;
        }

        clearImportant(list,[
            "display","flex-flow","align-items","justify-content",
            "align-content","column-gap","row-gap","width","max-width",
            "min-width","margin-left","margin-right","position","left",
            "right","transform","box-sizing","overflow"
        ]);

        cards = realCards(list);

        for(i=0;i<cards.length;i++){
            clearImportant(cards[i],[
                "flex","flex-basis","width","max-width","min-width"
            ]);

            setArrowState(cards[i],false);

            pill = cards[i].querySelector(".cfle-v6-featured-pill");
            if(pill && pill.parentNode){
                pill.parentNode.removeChild(pill);
            }

            title = cards[i].querySelector(".cfle-home-event-title");
            if(title){
                clearTitleFit(title);
            }
        }
    }

    function applyDesktopLayout(){
        var list;
        var cards;
        var count;
        var targetWidth;
        var cardWidth;
        var desiredLeft;
        var rect;
        var correction;
        var i;
        var title;

        if(!isHomepage()){
            return;
        }

        if(!isDesktop()){
            clearDesktopLayout();
            return;
        }

        list = document.querySelector(
            ".chabad_updates.cfle-home-events-widget .cfle-home-events-list"
        );

        if(!list){
            return;
        }

        cards = realCards(list);
        count = cards.length;

        if(!count){
            return;
        }

        document.body.classList.add("cfle-v6-events-desktop");

        /*
         * Use almost the full viewport, but keep a clean 36px gutter.
         * Cap at 1520px on very large screens.
         */
        targetWidth = Math.min(
            MAX_LIST_WIDTH,
            Math.max(0, window.innerWidth - (SIDE_GUTTER * 2))
        );

        /*
         * Normal card width = one third of the available row.
         * Exactly four events = two equal cards per row.
         */
        if(count === 4){
            cardWidth = (targetWidth - GAP) / 2;
        }else{
            cardWidth = (targetWidth - (GAP * 2)) / 3;
        }

        important(list,"display","flex");
        important(list,"flex-flow","row wrap");
        important(list,"align-items","stretch");
        important(list,"justify-content","center");
        important(list,"align-content","flex-start");
        important(list,"column-gap",GAP+"px");
        important(list,"row-gap",GAP+"px");
        important(list,"box-sizing","border-box");
        important(list,"overflow","visible");

        important(list,"width",targetWidth+"px");
        important(list,"max-width",targetWidth+"px");
        important(list,"min-width",targetWidth+"px");
        important(list,"margin-left","0");
        important(list,"margin-right","0");
        important(list,"position","relative");
        important(list,"left","0");
        important(list,"right","auto");
        important(list,"transform","none");

        /*
         * Center the entire list in the VIEWPORT, not merely inside
         * ChabadOne's narrower legacy module/container.
         */
        rect = list.getBoundingClientRect();
        desiredLeft = (window.innerWidth - targetWidth) / 2;
        correction = desiredLeft - rect.left;

        important(
            list,
            "transform",
            "translate3d("+correction+"px,0,0)"
        );

        for(i=0;i<cards.length;i++){
            important(cards[i],"flex","0 0 "+cardWidth+"px");
            important(cards[i],"flex-basis",cardWidth+"px");
            important(cards[i],"width",cardWidth+"px");
            important(cards[i],"max-width",cardWidth+"px");
            important(cards[i],"min-width",cardWidth+"px");

            setArrowState(cards[i],true);
            ensureFeaturedPill(cards[i]);
        }

        /*
         * Fit titles only AFTER final card widths are known.
         * Short titles remain at the full 27px size.
         */
        window.requestAnimationFrame(function(){
            var j;
            for(j=0;j<cards.length;j++){
                title = cards[j].querySelector(".cfle-home-event-title");
                if(title){
                    fitTitle(title);
                }
            }
        });
    }

    function schedule(){
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function(){
            window.requestAnimationFrame(applyDesktopLayout);
        },60);
    }

    function start(){
        if(!isHomepage()){
            return;
        }

        schedule();

        window.setTimeout(schedule,250);
        window.setTimeout(schedule,900);
        window.setTimeout(schedule,1800);

        window.addEventListener("resize",schedule);
        window.addEventListener("pageshow",schedule);
        window.addEventListener("load",schedule);

        if(window.MutationObserver){
            observer = new MutationObserver(function(){
                window.clearTimeout(mutationTimer);
                mutationTimer = window.setTimeout(schedule,40);
            });

            observer.observe(document.body,{
                childList:true,
                subtree:true
            });
        }
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded",start);
    }else{
        start();
    }
})();
