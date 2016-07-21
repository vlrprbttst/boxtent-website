/*********************
SMART RESIZE FUNCTION
**********************/

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

// smooth scroll

$('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 20
            }, 1000);
            return false;
        }
    }
});

// active link on nav

$(function(){
	'use strict';

	function ScrollSpy(element, options) {
		var process  = $.proxy(this.process, this);

		this.$body          = $('body');
		this.$scrollElement = $(window);
		this.options        = $.extend({}, ScrollSpy.DEFAULTS, options);
		this.target         = '.nav';
		this.$target        = $(this.target);
		this.offsets        = [];
		this.targets        = [];
		this.activeTarget   = null;
		this.scrollHeight   = 0;

		this.$scrollElement.on('scroll.bs.scrollspy', process);
		this.refresh();
		this.process();
	}

	ScrollSpy.DEFAULTS = {
		offset: 100
	};

	ScrollSpy.prototype.getScrollHeight = function () {
		return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
	};

	ScrollSpy.prototype.refresh = function () {
		this.offsets = [];
		this.targets = [];
		this.scrollHeight = this.getScrollHeight();

		var self     = this;

		this.$body
			.find(this.target + ' a')
			.map(function () {
				var $el   = $(this);
				var href  = $el.data('target') || $el.attr('href');
				var $href = /^#./.test(href) && $('[id="' + href.replace('#', '') + '"]');

				return ($href && $href.length && [[$href.offset().top, href]]) || null;
			})
			.sort(function (a, b) { return a[0] - b[0]; })
			.each(function () {
				self.offsets.push(this[0]);
				self.targets.push(this[1]);
			});
	};

	ScrollSpy.prototype.process = function () {
		var elScrollTop  = this.$scrollElement.scrollTop();
		var scrollTop    = elScrollTop + this.options.offset;
		var scrollHeight = this.getScrollHeight();
		var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height();
		var offsets      = this.offsets;
		var targets      = this.targets;
		var activeTarget = this.activeTarget;
		var i;

		if (this.scrollHeight != scrollHeight) {
			this.refresh();
		}

		this.$target.css('top', Math.min(130, Math.max(0, 130 - elScrollTop)));

		if (scrollTop >= maxScroll) {
			return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
		}

		if (activeTarget && scrollTop <= offsets[0]) {
			return activeTarget != (i = targets[0]) && this.activate(i);
		}

		for (i = offsets.length; i--;) {
			if (activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1])) {
				this.activate(targets[i]);
			}
		}
	};

	ScrollSpy.prototype.activate = function (target) {
		this.activeTarget = target;

		$(this.target).find('a').removeClass('active');

		var selector = this.target + ' a[data-target="' + target + '"],' + this.target + ' a[href="' + target + '"]';

		$(selector).addClass('active');
	};

	$.fn.scrollspy = function (option) {
		return this.each(function () {
			var $this   = $(this);
			var data    = $this.data('bs.scrollspy');
			var options = typeof option == 'object' && option;

			if (!data) {
				$this.data('bs.scrollspy', (data = new ScrollSpy(this, options)));
			}
			if (typeof option == 'string') {
				data[option]();
			}
		});
	};

	$(window).scrollspy();
});

//fit text
$(".background-component").fitText(4, {
    minFontSize: '12px',
    maxFontSize: '30px'
});

// async google font loading

WebFont.load({
    google: {
        families: ['Bangers', 'Comfortaa', 'Source Code Pro:300', 'Source Sans Pro:400,700']
    }
});

var stylesheet = loadCSS("css/main.css");
onloadCSS(stylesheet, function() {

    //header eq height
    bgSize();
    stickyNav();
    $('.header > div').addClass("headerHeight").removeClass("headerHeight").matchHeight();

}); // stylesheet has loaded

/*********************
RESIZE FUNCTIONS
**********************/

$(window).smartresize(function() {
    bgSize();
    stickyNav();
    $('.header > div').matchHeight();
});


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
(function() {
    var d = document,
        s = d.createElement('script');

    s.src = '//boxtent.disqus.com/embed.js';

    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();
