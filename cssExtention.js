(function (window, screen) {

    var csse = {}

    var clearWhiteSpaces = function (val) {

        return val.replace(/\s/g, '');
    }

    var parseStyleProp = function (style, prop) {

        var match = style.match(new RegExp(prop + "\\:(.*?)\\|(-?\\d+)(%|px)"));

        if (!match > 0) {
            return null;
        }

        return {
            selector: match[1],
            value: match[2],
            measurement: match[3]
        }
    }

    var parseHeight = function ($el, style) {

        var props = parseStyleProp(style, 'height');

        if (!props) {
            return;
        }

        var targetHeight;

        if (props.measurement == '%') {

            if (props.selector == 'screen') {
                targetHeight = screen.height;
            } else if (props.selector == 'window') {
                targetHeight = window.innerHeight;
            }

            targetHeight = targetHeight || $(props.selector).height();
            var percentage = props.value / 100;

            $el.height(targetHeight * percentage);
        }
    }

    var parseWidth = function ($el, style) {

        var props = parseStyleProp(style, 'width');

        if (!props) {
            return;
        }

        var targetHeight;

        if (props.measurement == '%') {

            if (props.selector == 'screen') {
                targetHeight = screen.width;
            } else if (props.selector == 'window') {
                targetHeight = window.innerWidth;
            }

            targetHeight = targetHeight || $(props.selector).width();
            var percentage = props.value / 100;

            $el.width(targetHeight * percentage);
        }
    }

    var parseOuterHeight = function ($el, style) {

        var props = parseStyleProp(style, 'outerHeight');

        if (!props) {
            return;
        }

        props.selector = props.selector == 'window' ? window : props.selector;

        if (props.selector == 'screen') {
            console.warn('screen has no outerHeight');
            return;
        }

        if (props.measurement == '%') {

            var targetWidth = $(props.selector).outerHeight();
            var percentage = props.value / 100;

            $el.height(targetWidth * percentage);
        }
    }

    var parseOuterWidth = function ($el, style) {

        var props = parseStyleProp(style, 'outerWidth');

        if (!props) {
            return;
        }

        props.selector = props.selector == 'window' ? window : props.selector;

        if (props.selector == 'screen') {
            console.warn('screen has no outerWidth');
            return;
        }

        if (props.measurement == '%') {

            var targetWidth = $(props.selector).outerWidth();
            var percentage = props.value / 100;

            $el.width(targetWidth * percentage);
        }
    }

    csse.bootstrap = function (root) {
		
		var $selector;
		
		if(typeof(root) == 'string'){
			$selector = $(root + " [csse-style]");
		} else if(typeof(root) == 'object'){
			$selector = root;
		} else {
			$selector = $("[csse-style]")
		}

        $selector.each(function () {
            var $el = $(this);
            var csseStyle = clearWhiteSpaces($el.attr('csse-style'));

            parseHeight($el, csseStyle);
            parseWidth($el, csseStyle);

            parseOuterHeight($el, csseStyle);
            parseOuterWidth($el, csseStyle);
        });
    }

    window.csse = csse;


})(window, screen);
