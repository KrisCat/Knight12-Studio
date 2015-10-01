(function() {
    var btnId = '__gotop';
    var isIE = !!window.ActiveXObject && /msie (\d)/i.test(navigator.userAgent) ? RegExp['$1'] : false;

    function $() {
        return document.getElementById(arguments[0]);
    }

    function getScrollTop() {
        return ('pageYOffset' in window) ? window.pageYOffset
            : document.compatMode === "BackCompat"
            && document.body.scrollTop
            || document.documentElement.scrollTop ;
    }

    function bindEvent(event, func) {
        if (window.addEventListener) {
            window.addEventListener(event, func, false);
        } else if (window.attachEvent) {
            window.attachEvent('on' + event, func);
        }
    }

    bindEvent('load',
        function() {
            var css = 'background-color: rgba(0, 0, 0, .2);display: inline-block;font-family: "Ionicons";color: rgba(255, 255, 255, .92);font-size: 22px;height: 40px;width: 40px;line-height: 40px;overflow: hidden;text-align: center;margin-right: 6px;text-shadow: 0 1px 1px rgba(0, 0, 0, .3);position:fixed;right:30px;bottom:60px;cursor:pointer;display:none;';

            if (isIE && isIE < 7) {
                css += '_position:absolute;_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-30-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)))';
                var style = document.createStyleSheet();
                style.cssText = '*html{background-image:url(about:blank);background-attachment:fixed;}';
            }

            var html = '<div style="margin-top:-1px;"><i class="fa fa-angle-up" style="transform:scale(1.2);-webkit-transform:scale(1.2);"></i></div>';
            var el = document.createElement('DIV');
            el.id = btnId;
            el.style.cssText = css;
            el.innerHTML = html;
            document.body.appendChild(el);

            el.onclick = function() {
                (function() {
                    var top = getScrollTop();
                    if (top > 0) {
                        window.scrollTo(0, top / 1.2)
                        setTimeout(arguments.callee, 10);
                    }
                })();
            };

//            el.onmouseover = function() {
//                $(btnId).firstChild.style.backgroundColor = '#1fb495';
//            };

//            el.onmouseout = function() {
//                $(btnId).firstChild.style.backgroundColor = 'rgba(0, 0, 0, .2)';
//            };
        }
    );

    bindEvent('scroll',
        function() {
            var top = getScrollTop(), display = 'none';

            if (top > 0) {
                display = 'block';
            }

            $(btnId).style.display = display;
        });
})();
