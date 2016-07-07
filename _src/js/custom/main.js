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

        $(window).scroll(function() {
            if ($(window).scrollTop() >= totalSpace) {
                $('nav').addClass("sticky");
            } else {
                $('nav').removeClass("sticky");
            }
        });
    }

    //smoothscroll
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function() {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 20
        }, 500, 'swing', function() {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    //active link on nav
    $(document).on("scroll", onScroll);
    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('nav a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('nav a').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
    }

    //fit text
    $(".background-component").fitText(4, {
        minFontSize: '12px',
        maxFontSize: '30px'
    });

    //async google font loading

    WebFont.load({
        google: {
            families: ['Bangers', 'Comfortaa', 'Source Code Pro:300', 'Source Sans Pro:400,700']
        }
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


}); //document ready
