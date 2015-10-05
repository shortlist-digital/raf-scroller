module.exports = function(callback) {

    if (!document.addEventListener) throw new Error('addEventListener is not supported')

    var lastScrollY = 0,
        scrollHandler,
        rAF,
        doTick,
        isTicking = false,
        update,
        fallbackTimeoutDuration = 1000 / 60;

    scrollHandler = function() {
        lastScrollY = window.scrollY;
        return doTick();
    };

    doTick = function() {
        if (!isTicking) {
            rAF(update);
            return isTicking = true;
        }
    };

    update = function() {
        callback(lastScrollY);
        return isTicking = false;
    };

    window.addEventListener('scroll', scrollHandler, false);

    return rAF = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(timeout_callback) {
            return window.setTimeout(timeout_callback, fallbackTimeoutDuration);
        };
    })();
};
