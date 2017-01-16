(function(k,f){"function"===typeof define&&define.amd?define(f):"object"===typeof exports?module.exports=f():k.Blazy=f()})(this,function(){function k(b){var c=b._util;c.elements=v(b.options.selector);c.count=c.elements.length;c.destroyed&&(c.destroyed=!1,b.options.container&&h(b.options.container,function(a){l(a,"scroll",c.validateT)}),l(window,"resize",c.saveViewportOffsetT),l(window,"resize",c.validateT),l(window,"scroll",c.validateT));f(b)}function f(b){for(var c=b._util,a=0;a<c.count;a++){var d=c.elements[a],g=d.getBoundingClientRect();if(g.right>=e.left&&g.bottom>=e.top&&g.left<=e.right&&g.top<=e.bottom||n(d,b.options.successClass))b.load(d),c.elements.splice(a,1),c.count--,a--}0===c.count&&b.destroy()}function q(b,c,a){if(!n(b,a.successClass)&&(c||a.loadInvisible||0<b.offsetWidth&&0<b.offsetHeight))if(c=b.getAttribute(p)||b.getAttribute(a.src)){c=c.split(a.separator);var d=c[r&&1<c.length?1:0],g="img"===b.nodeName.toLowerCase();h(a.breakpoints,function(a){b.removeAttribute(a.src)});b.removeAttribute(a.src);g||void 0===b.src?(c=new Image,c.onerror=function(){a.error&&a.error(b,"invalid");b.className=b.className+" "+a.errorClass},c.onload=function(){g?b.src=d:b.style.backgroundImage='url("'+d+'")';b.className=b.className+" "+a.successClass;a.success&&a.success(b)},c.src=d):(b.src=d,b.className=b.className+" "+a.successClass)}else a.error&&a.error(b,"missing"),n(b,a.errorClass)||(b.className=b.className+" "+a.errorClass)}function n(b,c){return-1!==(" "+b.className+" ").indexOf(" "+c+" ")}function v(b){var c=[];b=document.querySelectorAll(b);for(var a=b.length;a--;c.unshift(b[a]));return c}function t(b){e.bottom=(window.innerHeight||document.documentElement.clientHeight)+b;e.right=(window.innerWidth||document.documentElement.clientWidth)+b}function l(b,c,a){b.attachEvent?b.attachEvent&&b.attachEvent("on"+c,a):b.addEventListener(c,a,!1)}function m(b,c,a){b.detachEvent?b.detachEvent&&b.detachEvent("on"+c,a):b.removeEventListener(c,a,!1)}function h(b,c){if(b&&c)for(var a=b.length,d=0;d<a&&!1!==c(b[d],d);d++);}function u(b,c,a){var d=0;return function(){var g=+new Date;g-d<c||(d=g,b.apply(a,arguments))}}var p,e,r;return function(b){if(!document.querySelectorAll){var c=document.createStyleSheet();document.querySelectorAll=function(a,b,d,e,f){f=document.all;b=[];a=a.replace(/\[for\b/gi,"[htmlFor").split(",");for(d=a.length;d--;){c.addRule(a[d],"k:v");for(e=f.length;e--;)f[e].currentStyle.k&&b.push(f[e]);c.removeRule(0)}return b}}var a=this,d=a._util={};d.elements=[];d.destroyed=!0;a.options=b||{};a.options.error=a.options.error||!1;a.options.offset=a.options.offset||100;a.options.success=a.options.success||!1;a.options.selector=a.options.selector||".b-lazy";a.options.separator=a.options.separator||"|";a.options.container=a.options.container?document.querySelectorAll(a.options.container):!1;a.options.errorClass=a.options.errorClass||"b-error";a.options.breakpoints=a.options.breakpoints||!1;a.options.loadInvisible=a.options.loadInvisible||!1;a.options.successClass=a.options.successClass||"b-loaded";a.options.validateDelay=a.options.validateDelay||25;a.options.saveViewportOffsetDelay=a.options.saveViewportOffsetDelay||50;a.options.src=p=a.options.src||"data-src";r=1<window.devicePixelRatio;e={};e.top=0-a.options.offset;e.left=0-a.options.offset;a.revalidate=function(){k(this)};a.load=function(a,b){var c=this.options;void 0===a.length?q(a,b,c):h(a,function(a){q(a,b,c)})};a.destroy=function(){var a=this._util;this.options.container&&h(this.options.container,function(b){m(b,"scroll",a.validateT)});m(window,"scroll",a.validateT);m(window,"resize",a.validateT);m(window,"resize",a.saveViewportOffsetT);a.count=0;a.elements.length=0;a.destroyed=!0};d.validateT=u(function(){f(a)},a.options.validateDelay,a);d.saveViewportOffsetT=u(function(){t(a.options.offset)},a.options.saveViewportOffsetDelay,a);t(a.options.offset);h(a.options.breakpoints,function(a){if(a.width>=window.screen.width)return p=a.src,!1});k(a)}});
(function() {
    // Lazy load images
    var bLazy = new Blazy();

    // Optimized scroll event
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if(running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle('scroll', 'optimizedScroll');
})();

window.addEventListener('optimizedScroll', function() {
    var scrollPos = window.scrollY || window.scollTop || document.getElementsByTagName('html')[0].scrollTop;
    var menu      = document.getElementsByClassName('menu-wrapper')[0];
    var menuItems = menu.getElementsByTagName('a');
    var intro     = document.getElementById('intro');
    var rocket    = document.getElementsByClassName('rocket')[0].children[0];
    var skills    = document.getElementById('skills');

    // Show/hide menu
    if (scrollPos + 1 > intro.offsetHeight) {
        menu.className = 'menu-wrapper menu-visible';
    } else {
        rocket.style.bottom = scrollPos + 'px';
        menu.className = 'menu-wrapper';
    }

    // Set active menu item
    for (var i = 0; i < menuItems.length; i++) {
        var target       = document.getElementById(menuItems[i].hash.substring(1));
        var targetTop    = target.offsetTop;
        var targetBottom = targetTop + target.offsetHeight;

        if (scrollPos + 2 > targetTop && scrollPos + 2 < targetBottom) {
            menuItems[i].className = 'active';
        } else {
            menuItems[i].className = '';
        }
    }
});
