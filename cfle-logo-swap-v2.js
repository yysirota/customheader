/*
 * Chabad of Fort Lee — sharp header logo swap
 * Uses the exact user-supplied transparent logo.
 */
(function(){
    "use strict";

    var logoUrl =
        "https://yysirota.github.io/customheader/cfle-logo-sharp-v2.png";

    function applySharpLogo(){
        var images =
            document.querySelectorAll(
                "#header_branding .site-logo-wrapper img"
            );

        for(var i=0;i<images.length;i++){
            images[i].removeAttribute("srcset");
            images[i].removeAttribute("sizes");

            if(images[i].getAttribute("src") !== logoUrl){
                images[i].setAttribute("src", logoUrl);
            }
        }
    }

    if(document.readyState === "loading"){
        document.addEventListener(
            "DOMContentLoaded",
            applySharpLogo
        );
    } else {
        applySharpLogo();
    }

    window.setTimeout(applySharpLogo, 400);
    window.setTimeout(applySharpLogo, 1200);
})();
