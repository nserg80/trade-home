function currencySlider() {
    var options = {
        gallery: "currency-slider",
        galleryList: "currency__list",
        galleryItems: "currency__item",
        fps: 20,
        pauseOnHover: false
    };
    

    var galleryList = document.getElementsByClassName(options.galleryList)[0];
    var gallery = document.getElementsByClassName(options.gallery)[0];
    var galleryItems = document.getElementsByClassName(options.galleryItems);
    var galleryWidth = (document.getElementsByClassName(options.gallery)[0].offsetWidth);
    var galleryItemWidth = (document.getElementsByClassName(options.galleryItems)[0].offsetWidth);
    var galleryAllItemsWidth = (galleryItemWidth) * galleryItems.length;
    var currentPosition = 0, fps = options.fps;
    
    console.log('galleryItemWidth', galleryItemWidth, galleryWidth, galleryAllItemsWidth );

    var timer = setInterval(anim, fps);

    // pause on hover
    if(options.pauseOnHover) {
        gallery.addEventListener("mouseenter", function() {
            clearInterval(timer);
        });
        gallery.addEventListener("mouseleave", function() {
            timer = setInterval(anim, fps);
        });
    }

    function anim() {
        currentPosition += 1;

        // prevent leaving
        if (currentPosition >= (galleryAllItemsWidth - galleryWidth)) {
            console.log("STOP -", currentPosition,">=", (galleryAllItemsWidth - galleryWidth));
            clearInterval(timer);
            return;
        }

        // replace items
        if (currentPosition >= galleryItemWidth) {
            var delEl = galleryList.removeChild(galleryItems[0]);
            galleryList.appendChild(delEl);
            currentPosition = 0;
        };

        galleryList.style.left = -currentPosition + 'px';
    };
};

currencySlider();