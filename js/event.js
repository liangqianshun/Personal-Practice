var eventRender = (function () {
    function bind(curEle, eventType, eventFn) {
        if (document.addEventListener) {
            curEle.addEventListener(eventType, eventFn, false);
            return;
        }

        var tempFn = function () {
            eventFn.call(curEle);
        }
        tempFn.photo = eventFn;
        !curEle["myBind" + eventType] ? curEle["myBind" + eventType] = [] : void 0;
        var curAry = curEle["myBind" + eventType];
        for (var i = 0; i < curAry.length; i++) {
            if (curAry[i].photo == eventFn) {
                return;
            }
        }
        curAry.push(tempFn);
        curEle.attachEvent("on" + eventType, tempFn);
    }

    function unBind(curEle, eventType, eventFn) {
        if (document.removeEventListener) {
            curEle.removeEventListener(eventType, eventFn, false);
            return;
        }

        var tempFn = null, curAry = curEle["myBind" + eventType] || [];
        for (var i = 0; i < curAry.length; i++) {
            if (curAry[i].photo == eventFn) {
                tempFn = curAry[i];
                curAry.splice(i, 1);
                break;
            }
        }
        curEle.detachEvent("on" + eventType, tempFn);
    }

    function run(e) {
        e = e || window.event;
        var flag = e.target ? true : false;
        if (flag) {
            e.target = e.srcElement;
            e.pageX = e.clientX + win("scrollLeft");
            e.pageY = e.clientY + win("scrollTop");
            e.preventDefault = function () {
                e.returnValue = false;
            }
            e.stopPropagation = function () {
                e.cancelBubble = true;
            }
        }
        var curAry = this["myEvent" + e.type];
        for (var i = 0; i < curAry.length; i++) {
            var cur = curAry[i];
            typeof cur === "function" ? cur.call(this, e) : (curAry.splice(i, 1), i--);
        }
    }

    function on(curEle, eventType, eventFn) {
        !curEle["myEvent" + eventType] ? curEle["myEvent" + eventType] = [] : void 0;
        var curAry = curEle["myEvent" + eventType];
        for (var i = 0; i < curAry.length; i++) {
            if (curAry[i] == eventFn) {
                return;
            }
        }
        curAry.push(eventFn);
        bind(curEle, eventType, run);
    }

    function off(curEle, eventType, eventFn) {
        var curAry = curEle["myEvent" + eventType] || [];
        for (var i = 0; i < curAry.length; i++) {
            if (curAry[i] == eventFn) {
                curAry[i] = null;
                break;
            }
        }
    }

    function win(attr) {
        return document.documentElement[attr] || document.body[attr];
    }

    return {
        bind: bind,
        unbind: unBind,
        on: on,
        off: off
    };
})();
