/* ============================================================
   CHABAD OF FORT LEE — HOMEPAGE EVENT TITLE FITTER V5
   Purpose: keep long homepage event titles left-aligned and at no
   more than two visible lines. Shrinks only when actually needed.
   Does not alter event data, links, dates, sorting, or rendering.
   ============================================================ */
(function(){
    "use strict";

    var resizeTimer = null;
    var observer = null;

    function isHomepage(){
        return !!(
            document.body &&
            document.body.classList.contains("home")
        );
    }

    function isDesktop(){
        return window.innerWidth >= 1025;
    }

    function clearFit(title){
        title.classList.remove(
            "cfle-home-title-fit-1",
            "cfle-home-title-fit-2"
        );
    }

    /*
     * Measure an unclamped invisible copy at the exact rendered width.
     * This is more reliable than trusting scrollHeight on a line-clamped
     * element and lets us shrink ONLY titles that would exceed two lines.
     */
    function needsMoreThanTwoLines(title){
        var clone;
        var computed;
        var lineHeight;
        var width;
        var tooTall;

        computed = window.getComputedStyle(title);
        lineHeight = parseFloat(computed.lineHeight);
        width = title.getBoundingClientRect().width;

        if(!width || !lineHeight){
            return false;
        }

        clone = title.cloneNode(true);
        clone.removeAttribute("id");
        clone.setAttribute("aria-hidden", "true");

        clone.style.setProperty("position", "absolute", "important");
        clone.style.setProperty("left", "-99999px", "important");
        clone.style.setProperty("top", "0", "important");
        clone.style.setProperty("visibility", "hidden", "important");
        clone.style.setProperty("pointer-events", "none", "important");
        clone.style.setProperty("display", "block", "important");
        clone.style.setProperty("width", width + "px", "important");
        clone.style.setProperty("height", "auto", "important");
        clone.style.setProperty("max-height", "none", "important");
        clone.style.setProperty("overflow", "visible", "important");
        clone.style.setProperty("white-space", "normal", "important");
        clone.style.setProperty("-webkit-line-clamp", "unset", "important");
        clone.style.setProperty("-webkit-box-orient", "initial", "important");

        document.body.appendChild(clone);
        tooTall = clone.scrollHeight > (lineHeight * 2) + 1;
        document.body.removeChild(clone);

        return tooTall;
    }

    function fitOne(title){
        clearFit(title);

        if(!isDesktop()){
            return;
        }

        /* Base 21px size whenever it fits in two lines. */
        if(!needsMoreThanTwoLines(title)){
            return;
        }

        title.classList.add("cfle-home-title-fit-1");
        void title.offsetHeight;

        if(!needsMoreThanTwoLines(title)){
            return;
        }

        title.classList.remove("cfle-home-title-fit-1");
        title.classList.add("cfle-home-title-fit-2");
    }

    function fitAll(){
        var titles;
        var i;

        if(!isHomepage()){
            return;
        }

        titles = document.querySelectorAll(
            ".cfle-home-events-list .cfle-home-event-title"
        );

        for(i = 0; i < titles.length; i++){
            fitOne(titles[i]);
        }
    }

    function scheduleFit(){
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function(){
            window.requestAnimationFrame(fitAll);
        }, 70);
    }

    function start(){
        if(!isHomepage()){
            return;
        }

        scheduleFit();

        if(window.MutationObserver){
            observer = new MutationObserver(scheduleFit);
            observer.observe(document.body, {
                childList:true,
                subtree:true
            });
        }

        window.addEventListener("resize", scheduleFit);
        window.addEventListener("load", scheduleFit);
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }
})();
