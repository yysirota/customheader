/*
 * Chabad of Fort Lee — Custom Header JavaScript
 * Hosted from: yysirota/customheader
 * Sukkot homepage promo removed.
 */

$j(function(){
    $j(".chabad_updates .bottom_padding").each(function(){
        var html = $j(this).html();
        html = html.replace(/Shacharit/g, '<span class="prayer_heading">Shacharit</span>');
        html = html.replace(/Mincha\/Maariv/g, '<span class="prayer_heading">Mincha/Maariv</span>');
        $j(this).html(html);
    });
});

window.addEventListener("scroll", function(){
    if(window.scrollY > 5){
        if(document.body.className.indexOf("scrolled") === -1){
            document.body.className += " scrolled";
        }
    } else {
        document.body.className = document.body.className.replace(/\s?scrolled/g,'');
    }
});

(function(){

    var resizeTimer;

    function createMobileDonate(){

        var header;
        var donate;

        if(
            document.querySelector(
                ".mobile-header-donate"
            )
        ){
            return;
        }

        header =
            document.querySelector(
                ".branding-search"
            );

        if(!header){
            return;
        }

        donate =
            document.createElement("a");

        donate.href = "/4970020";
        donate.className =
            "mobile-header-donate";
        donate.innerHTML = "Donate";

        header.appendChild(donate);
    }

    function removeMobileDonate(){

        var donate =
            document.querySelector(
                ".mobile-header-donate"
            );

        if(donate && donate.parentNode){
            donate.parentNode.removeChild(
                donate
            );
        }
    }

    function updateMobileDonate(){

        if(window.innerWidth <= 1024){
            createMobileDonate();
        } else {
            removeMobileDonate();
        }
    }

    function startMobileDonate(){

        updateMobileDonate();

        window.addEventListener(
            "resize",
            function(){

                window.clearTimeout(
                    resizeTimer
                );

                resizeTimer =
                    window.setTimeout(
                        updateMobileDonate,
                        100
                    );
            }
        );
    }

    if(document.readyState === "loading"){

        document.addEventListener(
            "DOMContentLoaded",
            startMobileDonate
        );

    } else {

        startMobileDonate();
    }

})();

(function(){

    var pushkaBodyUrl =
        "https://i.ibb.co/fdS87w3N/" +
        "Gemini-Generated-Image-gz48hngz48hngz48-png-1.webp";

    var pushkaCoinUrl =
        "https://i.ibb.co/KxTcSB2N/cointhing.webp";

    var resizeTimer;
    var pushkaAssetsPrepared = false;

    function isPushkaDesktop(){
    return false;
}

    function isPushkaHomepage(){

        if(
            document.body &&
            document.body.classList.contains(
                "home"
            )
        ){
            return true;
        }

        return (
            window.location.pathname === "/" ||
            window.location.pathname ===
                "/index.html" ||
            window.location.pathname ===
                "/index.htm"
        );
    }

    function addPushkaHeadLink(
        id,
        rel,
        href,
        asValue,
        typeValue
    ){

        var link;
        var head;

        if(document.getElementById(id)){
            return;
        }

        head =
            document.getElementsByTagName(
                "head"
            )[0];

        if(!head){
            return;
        }

        link =
            document.createElement("link");

        link.id = id;
        link.rel = rel;
        link.href = href;

        if(asValue){
            link.setAttribute(
                "as",
                asValue
            );
        }

        if(typeValue){
            link.type = typeValue;
        }

        if(rel === "preconnect"){
            link.crossOrigin =
                "anonymous";
        }

        if(rel === "preload"){
            link.setAttribute(
                "fetchpriority",
                "high"
            );
        }

        head.appendChild(link);
    }

    function preparePushkaAssets(){

        if(
            pushkaAssetsPrepared ||
            !isPushkaDesktop() ||
            !isPushkaHomepage()
        ){
            return;
        }

        pushkaAssetsPrepared = true;

        addPushkaHeadLink(
            "cfle-pushka-preconnect",
            "preconnect",
            "https://i.ibb.co",
            "",
            ""
        );

        addPushkaHeadLink(
            "cfle-pushka-body-preload",
            "preload",
            pushkaBodyUrl,
            "image",
            "image/webp"
        );

        addPushkaHeadLink(
            "cfle-pushka-coin-preload",
            "preload",
            pushkaCoinUrl,
            "image",
            "image/webp"
        );
    }

    function createDesktopHomepagePushka(){

        var pushka;
        var coin;
        var image;

        if(
            !isPushkaDesktop() ||
            !isPushkaHomepage() ||
            document.querySelector(
                ".floating-pushka"
            )
        ){
            return;
        }

        preparePushkaAssets();

        pushka =
            document.createElement("a");

        pushka.href = "/4970020";
        pushka.className =
            "floating-pushka";

        pushka.setAttribute(
            "aria-label",
            "Give Tzedakah (Charity)"
        );

        coin =
            document.createElement("img");

        coin.className = "pushka-coin";
        coin.alt = "";
        coin.setAttribute(
            "loading",
            "eager"
        );
        coin.setAttribute(
            "fetchpriority",
            "high"
        );
        coin.setAttribute(
            "decoding",
            "async"
        );
        coin.src = pushkaCoinUrl;

        image =
            document.createElement("img");

        image.className =
            "floating-pushka-body";
        image.alt =
            "Chabad of Fort Lee Pushka";
        image.setAttribute(
            "loading",
            "eager"
        );
        image.setAttribute(
            "fetchpriority",
            "high"
        );
        image.setAttribute(
            "decoding",
            "async"
        );
        image.src = pushkaBodyUrl;

        pushka.appendChild(coin);
        pushka.appendChild(image);
        document.body.appendChild(pushka);
    }

    function removeDesktopHomepagePushka(){

        var pushka =
            document.querySelector(
                ".floating-pushka"
            );

        if(pushka && pushka.parentNode){
            pushka.parentNode.removeChild(
                pushka
            );
        }
    }

    function updateDesktopHomepagePushka(){

        if(
            isPushkaDesktop() &&
            isPushkaHomepage()
        ){
            createDesktopHomepagePushka();
        } else {
            removeDesktopHomepagePushka();
        }
    }

    function startDesktopHomepagePushka(){

        updateDesktopHomepagePushka();

        window.addEventListener(
            "resize",
            function(){

                window.clearTimeout(
                    resizeTimer
                );

                resizeTimer =
                    window.setTimeout(
                        updateDesktopHomepagePushka,
                        100
                    );
            }
        );
    }

    /* Preload only on a desktop homepage. */
    preparePushkaAssets();

    if(document.readyState === "loading"){

        document.addEventListener(
            "DOMContentLoaded",
            startDesktopHomepagePushka
        );

    } else {

        startDesktopHomepagePushka();
    }

})();

(function(){

    var resizeTimer;

    function removeMobileMenuLinks(){

        var existingLinks = document.getElementById("custom-mobile-menu-links");

        if(existingLinks && existingLinks.parentNode){
            existingLinks.parentNode.removeChild(existingLinks);
        }
    }

    function installMobileMenuLinks(){

        if(window.innerWidth > 1024){
            removeMobileMenuLinks();
            return;
        }

        var drawerWrapper = document.getElementById("co_menu_container_wrapper");

        if(!drawerWrapper){
            return;
        }

        var existingLinks = document.getElementById("custom-mobile-menu-links");

        if(existingLinks && existingLinks.parentNode === drawerWrapper){
            return;
        }

        removeMobileMenuLinks();

        var linksWrapper = document.createElement("div");
        linksWrapper.id = "custom-mobile-menu-links";
        linksWrapper.className = "custom-mobile-menu-links";

        var aboutLink = document.createElement("a");
        aboutLink.href = "/1106558";
        aboutLink.appendChild(document.createTextNode("About"));

        var searchLink = document.createElement("a");
        searchLink.href = "/search";
        searchLink.appendChild(document.createTextNode("Search"));

        var contactLink = document.createElement("a");
        contactLink.href = "/tools/feedback.asp";
        contactLink.appendChild(document.createTextNode("Contact"));

        linksWrapper.appendChild(aboutLink);
        linksWrapper.appendChild(searchLink);
        linksWrapper.appendChild(contactLink);

        drawerWrapper.appendChild(linksWrapper);
    }

    function updateMobileMenuLinks(){

        if(window.innerWidth <= 1024){
            installMobileMenuLinks();
        } else {
            removeMobileMenuLinks();
        }
    }

    function startMobileMenuLinks(){

        updateMobileMenuLinks();

        if(window.MutationObserver){

            var menuObserver = new MutationObserver(function(){

                if(window.innerWidth <= 1024 &&
                   !document.getElementById("custom-mobile-menu-links")){
                    installMobileMenuLinks();
                }

            });

            menuObserver.observe(document.body, {
                childList:true,
                subtree:true
            });
        }

        window.addEventListener("resize", function(){

            window.clearTimeout(resizeTimer);

            resizeTimer = window.setTimeout(function(){
                updateMobileMenuLinks();
            }, 100);

        });
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", startMobileMenuLinks);
    } else {
        startMobileMenuLinks();
    }

})();

(function(){

    var savedScrollPosition = 0;
    var pageIsLocked = false;

    function lockPageScroll(){

        if(pageIsLocked || window.innerWidth > 1024){
            return;
        }

        savedScrollPosition = window.pageYOffset ||
                              document.documentElement.scrollTop ||
                              document.body.scrollTop ||
                              0;

        document.body.style.top = "-" + savedScrollPosition + "px";
        document.body.classList.add("mobile-menu-scroll-locked");
        pageIsLocked = true;
    }

    function unlockPageScroll(){

        if(!pageIsLocked){
            return;
        }

        document.body.classList.remove("mobile-menu-scroll-locked");
        document.body.style.top = "";
        pageIsLocked = false;

        window.scrollTo(0, savedScrollPosition);
    }

    function updatePageScrollLock(){

        if(window.innerWidth <= 1024 &&
           document.body.classList.contains("menu-open")){
            lockPageScroll();
        } else {
            unlockPageScroll();
        }
    }

    function startPageScrollLock(){

        updatePageScrollLock();

        if(window.MutationObserver){

            var bodyClassObserver = new MutationObserver(function(){
                updatePageScrollLock();
            });

            bodyClassObserver.observe(document.body, {
                attributes:true,
                attributeFilter:["class"]
            });
        }

        window.addEventListener("resize", function(){
            updatePageScrollLock();
        });
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", startPageScrollLock);
    } else {
        startPageScrollLock();
    }

})();

document.addEventListener("click", function(event){
    var menuOpen = document.body.classList.contains("menu-open");
    if(!menuOpen){
        return;
    }
    var drawer = document.querySelector(".site-nav-wrapper");
    var menuButton = document.querySelector(".js-mobile-menu-open");
    if(drawer && !drawer.contains(event.target) && (!menuButton || !menuButton.contains(event.target))){
        event.preventDefault();
        event.stopPropagation();
        var closeButton = document.querySelector(".js-mobile-menu-close");
        if(closeButton){
            closeButton.click();
        }
    }
}, true);

(function(){

    var alertUrl =
        "https://www.chabadfortlee.com/templates/" +
        "articlecco_cdo/aid/7438042/" +
        "jewish/Tisha-BAv-Services.htm";

    var expirationTime =
        new Date(
            "2026-07-24T00:00:00-04:00"
        ).getTime();

    var resizeTimer;

    function createTishaBavAlert(){

        var alert;
        var content;
        var title;
        var text;
        var arrow;

        alert =
            document.createElement("a");

        alert.id =
            "tisha-bav-prayer-alert";

        alert.href =
            alertUrl;

        alert.setAttribute(
            "aria-label",
            "View the updated Tisha B'Av " +
            "services and prayer times"
        );

        content =
            document.createElement("span");

        content.className =
            "tisha-bav-alert-content";

        title =
            document.createElement("span");

        title.className =
            "tisha-bav-alert-title";

        title.appendChild(
            document.createTextNode(
                "Tisha B'Av Schedule"
            )
        );

        text =
            document.createElement("span");

        text.className =
            "tisha-bav-alert-text";

        text.appendChild(
            document.createTextNode(
                "View updated services and " +
                "prayer times for Tisha B'Av"
            )
        );

        arrow =
            document.createElement("span");

        arrow.className =
            "tisha-bav-alert-arrow";

        arrow.setAttribute(
            "aria-hidden",
            "true"
        );

        arrow.appendChild(
            document.createTextNode(
                "\u2192"
            )
        );

        content.appendChild(title);
        content.appendChild(text);

        alert.appendChild(content);
        alert.appendChild(arrow);

        return alert;
    }

    function placeTishaBavAlert(){

        var alert;
        var prayerBlock;
        var promoSlider;
        var mobileMode;

        if(
            new Date().getTime() >=
            expirationTime
        ){
            return true;
        }

        if(
            !document.body ||
            document.body.className
                .indexOf("home") === -1
        ){
            return true;
        }

        alert =
            document.getElementById(
                "tisha-bav-prayer-alert"
            );

        if(!alert){

            alert =
                createTishaBavAlert();
        }

        mobileMode =
            window.innerWidth <= 700;

        if(mobileMode){

            promoSlider =
                document.querySelector(
                    ".hp-table " +
                    ".hp-row-first " +
                    ".promo_slider"
                );

            if(!promoSlider){
                return false;
            }

            alert.className =
                "tisha-bav-mobile-location";

            if(alert.parentNode !== promoSlider){

                promoSlider.appendChild(
                    alert
                );
            }

            return true;
        }

        prayerBlock =
            (function(){

                var blocks =
                    document.querySelectorAll(
                        ".chabad_updates"
                    );

                var blockIndex;
                var blockText;

                for(
                    blockIndex = 0;
                    blockIndex < blocks.length;
                    blockIndex++
                ){

                    blockText =
                        String(
                            blocks[blockIndex].textContent ||
                            blocks[blockIndex].innerText ||
                            ""
                        );

                    if(
                        blockText.indexOf(
                            "Shacharit"
                        ) > -1 &&
                        blockText.indexOf(
                            "Mincha/Maariv"
                        ) > -1
                    ){

                        return blocks[blockIndex];
                    }
                }

                return null;

            })();

        if(!prayerBlock){
            return false;
        }

        alert.className = "";

        if(alert.parentNode !== prayerBlock){

            prayerBlock.insertBefore(
                alert,
                prayerBlock.firstChild
            );
        }

        return true;
    }

    function beginTishaBavAlert(){

        var attempts = 0;
        var timer;

        if(!placeTishaBavAlert()){

            timer =
                window.setInterval(function(){

                    attempts++;

                    if(
                        placeTishaBavAlert() ||
                        attempts >= 40
                    ){
                        window.clearInterval(
                            timer
                        );
                    }

                },300);
        }

        window.addEventListener(
            "resize",
            function(){

                window.clearTimeout(
                    resizeTimer
                );

                resizeTimer =
                    window.setTimeout(
                        function(){

                            placeTishaBavAlert();

                        },
                        150
                    );
            }
        );
    }

    if(
        document.readyState ===
        "loading"
    ){

        document.addEventListener(
            "DOMContentLoaded",
            beginTishaBavAlert
        );

    } else {

        beginTishaBavAlert();
    }

})();

(function(){

    var observerStarted = false;
    var fallbackTimer = null;

    function findPendingHomepageWidget(){

        var widgets =
            document.querySelectorAll(
                ".chabad_updates"
            );

        var index;
        var text;

        for(index = 0; index < widgets.length; index++){

            text = String(
                widgets[index].textContent ||
                widgets[index].innerText ||
                ""
            );

            if(text.indexOf("CFLE_PAGE_EVENTS") > -1){
                return widgets[index];
            }
        }

        return null;
    }

    function hidePendingHomepageMarker(){

        var widget =
            findPendingHomepageWidget();

        if(!widget){
            return;
        }

        widget.style.visibility =
            "hidden";

        if(
            widget.className.indexOf(
                "cfle-home-events-pending"
            ) === -1
        ){

            widget.className +=
                " cfle-home-events-pending";
        }
    }

    function showSafeLoadingFallback(){

        var widget =
            findPendingHomepageWidget();

        if(!widget){
            return;
        }

        if(
            widget.className.indexOf(
                "cfle-home-events-widget"
            ) === -1
        ){

            widget.className +=
                " cfle-home-events-widget";
        }

        widget.className =
            widget.className.replace(
                /\s*cfle-home-events-pending/g,
                ""
            );

        widget.innerHTML =
            '<div class="cfle-home-events-shell">' +
                '<h2 class="cfle-home-events-heading">' +
                    'Upcoming at Chabad' +
                '</h2>' +
                '<div class="cfle-home-events-list">' +
                    '<div class="cfle-home-events-empty">' +
                        'Loading upcoming programs…' +
                    '</div>' +
                '</div>' +
                '<a class="cfle-home-events-more" ' +
                   'href="/templates/articlecco_cdo/aid/7437974/jewish/Upcoming-at-Chabad.htm">' +
                    'View More' +
                '</a>' +
            '</div>';

        widget.style.visibility =
            "visible";
    }

    function beginHomepageMarkerGuard(){

        hidePendingHomepageMarker();

        if(
            !observerStarted &&
            window.MutationObserver &&
            document.body
        ){

            observerStarted = true;

            var markerObserver =
                new MutationObserver(function(){

                    hidePendingHomepageMarker();
                });

            markerObserver.observe(
                document.body,
                {
                    childList:true,
                    subtree:true
                }
            );
        }

        window.clearTimeout(
            fallbackTimer
        );

        fallbackTimer =
            window.setTimeout(
                showSafeLoadingFallback,
                2800
            );
    }

    if(document.readyState === "loading"){

        document.addEventListener(
            "DOMContentLoaded",
            beginHomepageMarkerGuard
        );

    } else {

        beginHomepageMarkerGuard();
    }

})();
