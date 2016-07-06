(function($, sr) {
    var debounce = function(func, threshold, execAsap) {
            var timeout;

            return function debounced() {
                var obj = this,
                    args = arguments;

                function delayed() {
                    if (!execAsap)
                        func.apply(obj, args);
                    timeout = null;
                };

                if (timeout)
                    clearTimeout(timeout);
                else if (execAsap)
                    func.apply(obj, args);

                timeout = setTimeout(delayed, threshold || 100);
            };
        }
        // smartresize
    jQuery.fn[sr] = function(fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };

})(jQuery, 'smartresize');

$(document).ready(function() {

    /*********************
    GLOBAL FUNCTIONS
    **********************/

    //bg size
    function bgSize() {
        var wHeight = $(window).innerHeight();
        $(".background-component").css("height", (wHeight / 10) * 6);
    }

    // sticky nav

    function stickyNav() {

        var headerHeight = $('header').outerHeight();
        var containerPT = $(".container").css('paddingTop').replace(/[^-\d\.]/g, '');
        var totalSpace = (parseInt(headerHeight) + parseInt(containerPT));

        $(window).scroll(function(){
            if($(window).scrollTop() >= totalSpace){
                $('nav').addClass("sticky");
            } else {
                $('nav').removeClass("sticky");
            }
        });
    }

    //animated scroll
    $('nav a').on('click', function(e) {
        e.preventDefault();
        var scrollAnchor = $(this).attr('data-scroll'),
            scrollPoint = $('section[data-anchor="' + scrollAnchor + '"]').offset().top - 20;

        $('body,html').animate({
            scrollTop: scrollPoint
        }, 500);

        return false;
    });


    //fit text
    $(".background-component").fitText(4, {
        minFontSize: '12px',
        maxFontSize: '30px'
    });

    //header eq height
    $('.header > div').matchHeight();
    bgSize();
    stickyNav();

    /*********************
    RESIZE FUNCTIONS
    **********************/
    $(window).smartresize(function() {
        bgSize();
        stickyNav();
    });

    WebFont.load({
        google: {
            families: ['Bangers', 'Comfortaa','Source Code Pro:300','Source Sans Pro:400,700']
        }
    });

}); //document ready
