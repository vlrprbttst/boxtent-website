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
        var elementPosition = $('nav').offset();
        console.log(elementPosition);


        $(window).scroll(function(){
            if($(window).scrollTop() > elementPosition.top){
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

}); //document ready
