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
        $(".background-component").css("height", (wHeight / 10) * 7);
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

    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 20
          }, 1000);
          return false;
        }
      }
    });

    //active link on nav
    $(document).on("scroll", onScroll);

    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        var navLinks = $('nav a');

        $('nav a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                //$('nav a').removeClass("active"); !??!!?
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

// analytics
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-80497857-1', 'auto');
ga('send', 'pageview');

//disqus
(function() {  // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');

    s.src = '//boxtent.disqus.com/embed.js';

    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();
