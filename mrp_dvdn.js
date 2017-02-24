var $jscomp = {
    scope: {
    }
};
$jscomp.defineProperty = 'function' == typeof Object.defineProperties ? Object.defineProperty : function (e, f, x) {
    if (x.get || x.set) throw new TypeError('ES3 does not support getters and setters.');
    e != Array.prototype && e != Object.prototype && (e[f] = x.value)
};
$jscomp.getGlobal = function (e) {
    return 'undefined' != typeof window && window === e ? e : 'undefined' != typeof global ? global : e
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = 'jscomp_symbol_';
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {
    };
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (e) {
    return $jscomp.SYMBOL_PREFIX + (e || '') + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var e = $jscomp.global.Symbol.iterator;
    e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol('iterator'));
    'function' != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function () {
    }
};
$jscomp.arrayIterator = function (e) {
    var f = 0;
    return $jscomp.iteratorPrototype(function () {
        return f < e.length ? {
            done: !1,
            value: e[f++]
        }
        : {
            done: !0
        }
    })
};
$jscomp.iteratorPrototype = function (e) {
    $jscomp.initSymbolIterator();
    e = {
        next: e
    };
    e[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return e
};
$jscomp.array = $jscomp.array || {
};
$jscomp.iteratorFromArray = function (e, f) {
    $jscomp.initSymbolIterator();
    e instanceof String && (e += '');
    var x = 0,
    l = {
        next: function () {
            if (x < e.length) {
                var V = x++;
                return {
                    value: f(V, e[V]),
                    done: !1
                }
            }
            l.next = function () {
                return {
                    done: !0,
                    value: void 0
                }
            };
            return l.next()
        }
    };
    l[Symbol.iterator] = function () {
        return l
    };
    return l
};
$jscomp.polyfill = function (e, f, x, l) {
    if (f) {
        x = $jscomp.global;
        e = e.split('.');
        for (l = 0; l < e.length - 1; l++) {
            var V = e[l];
            V in x || (x[V] = {
            });
            x = x[V]
        }
        e = e[e.length - 1];
        l = x[e];
        f = f(l);
        f != l && null != f && $jscomp.defineProperty(x, e, {
            configurable: !0,
            writable: !0,
            value: f
        })
    }
};
$jscomp.polyfill('Array.prototype.keys', function (e) {
    return e ? e : function () {
        return $jscomp.iteratorFromArray(this, function (e) {
            return e
        })
    }
}, 'es6-impl', 'es3');
(function (e, f, x) {
    function l(a, b) {
        function c() {
        }
        c.prototype = a;
        var h = new c,
        y;
        for (y in b) h[y] = b[y];
            b.toString !== Object.prototype.toString && (h.toString = b.toString);
        return h
    }
    function V(a) {
        return a instanceof Array ? function () {
            return q.iter(a)
        }
        : 'function' == typeof a.iterator ? u(a, a.iterator)  : a.iterator
    }
    function u(a, b) {
        if (null == b) return null;
        null == b.__id__ && (b.__id__ = ab++);
        var c;
        null == a.hx__closures__ ? a.hx__closures__ = {
        }
        : c = a.hx__closures__[b.__id__];
        null == c && (c = function () {
            return c.method.apply(c.scope, arguments)
        }, c.scope = a, c.method = b, a.hx__closures__[b.__id__] = c);
        return c
    }
    f.muses = f.muses || {
    };
    var F = function () {
        return z.__string_rec(this, '')
    },
    M = function (a, b) {
        b = b.split('u').join('');
        this.r = new RegExp(a, b)
    };
    M.__name__ = !0;
    M.prototype = {
        r: null,
        match: function (a) {
            this.r.global && (this.r.lastIndex = 0);
            this.r.m = this.r.exec(a);
            this.r.s = a;
            return null != this.r.m
        },
        matched: function (a) {
            if (null != this.r.m && 0 <= a && a < this.r.m.length) return this.r.m[a];
            throw new m('EReg::matched');
        },
        __class__: M
    };
    var q = function () {
    };
    q.__name__ = !0;
    q.cca = function (a, b) {
        var c = a.charCodeAt(b);
        if (c == c) return c
    };
q.substr = function (a, b, c) {
    if (null != b && 0 != b && null != c && 0 > c) return '';
    null == c && (c = a.length);
    0 > b ? (b = a.length + b, 0 > b && (b = 0))  : 0 > c && (c = a.length + c - b);
    return a.substr(b, c)
};
q.indexOf = function (a, b, c) {
    var h = a.length;
    0 > c && (c += h, 0 > c && (c = 0));
    for (; c < h; ) {
        if (a[c] === b) return c;
        c++
    }
    return - 1
};
q.remove = function (a, b) {
    var c = q.indexOf(a, b, 0);
    if ( - 1 == c) return !1;
    a.splice(c, 1);
    return !0
};
q.iter = function (a) {
    return {
        cur: 0,
        arr: a,
        hasNext: function () {
            return this.cur < this.arr.length
        },
        next: function () {
            return this.arr[this.cur++]
        }
    }
};
var K = function () {
};
K.__name__ = !0;
K.exists = function (a, b) {
    for (var c = V(a) (); c.hasNext(); ) {
        var h = c.next();
        if (b(h)) return !0
    }
return !1
};
var aa = function () {
    this.length = 0
};
aa.__name__ = !0;
aa.prototype = {
    h: null,
    length: null,
    iterator: function () {
        return new Ka(this.h)
    },
    __class__: aa
};
var Ka = function (a) {
    this.head = a;
    this.val = null
};
Ka.__name__ = !0;
Ka.prototype = {
    head: null,
    val: null,
    hasNext: function () {
        return null != this.head
    },
    next: function () {
        this.val = this.head[0];
        this.head = this.head[1];
        return this.val
    },
    __class__: Ka
};
var d = f.MRP = function () {
};
d.__name__ = !0;
d.setElementId = function (a) {
    d.elementId = a
};
d.setObjectId = function (a) {
    d.objectId = a
};
d.play = function () {
    d.jsInstances.exists(d.objectId) && d.jsInstances.get(d.objectId).playAudio();
    d.flashInstances.exists(d.objectId) && d.flashInstances.get(d.objectId).playSound()
};
d.stop = function () {
    d.jsInstances.exists(d.objectId) && d.jsInstances.get(d.objectId).stopAudio(!1);
    d.flashInstances.exists(d.objectId) && d.flashInstances.get(d.objectId).stopSound()
};
d.setVolume = function (a) {
    d.jsInstances.exists(d.objectId) && d.jsInstances.get(d.objectId).setVolume(a / 100);
    d.flashInstances.exists(d.objectId) && d.flashInstances.get(d.objectId).setVolume(a / 100)
};
d.showInfo = function (a) {
    d.jsInstances.exists(d.objectId) && d.jsInstances.get(d.objectId).ui.showInfo(a);
    d.flashInstances.exists(d.objectId) && d.flashInstances.get(d.objectId).showInfo(a)
};
d.setTitle = function (a) {
    d.jsInstances.exists(d.objectId) && d.jsInstances.get(d.objectId).ui.setTitle(a);
    d.flashInstances.exists(d.objectId) && d.flashInstances.get(d.objectId).setTitle(a)
};
d.setUrl = function (a) {
    d.jsInstances.exists(d.objectId) && d.jsInstances.get(d.objectId).setUrl(a);
    d.flashInstances.exists(d.objectId) && d.flashInstances.get(d.objectId).setUrl(a)
};
d.setMetadataMode = function (a) {
    d.jsInstances.exists(d.objectId) && d.jsInstances.get(d.objectId).setMetadataMode(a);
    d.flashInstances.exists(d.objectId) && d.flashInstances.get(d.objectId).setMetadataMode(a)
};
d.setFallbackUrl = function (a) {
    d.jsInstances.exists(d.objectId) && d.jsInstances.get(d.objectId).setFallbackUrl(a);
    d.flashInstances.exists(d.objectId) && d.flashInstances.get(d.objectId).setFallbackUrl(a)
};
d.setCallbackFunction = function (a) {
    musesCallback = a
};
d.getScriptBaseHREF = function () {
    return '//hosted.muses.org'
};
d.getSkin = function (a, b) {
    return - 1 != a.indexOf('/') || b && ('original' == a || 'tiny' == a) ? a : d.getScriptBaseHREF() + '/muses-' + a + '.xml'
};
d.createMusesStyleReset = function () {
    if (null == mrpStyleReset) {
        var a;
        a = window.document.createElement('style');
        var b = window.document.createTextNode('.musesStyleReset,.musesStyleReset DIV,.musesStyleReset IMG,.musesStyleReset SPAN { animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:transparent;background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;bottom:auto;box-shadow:none;box-sizing:content-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;content:normal;counter-increment:none;counter-reset:none;cursor:default;direction:ltr;display:block;empty-cells:show;float:none;font:normal;font-family:inherit;font-size:12px;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;left:auto;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;max-height:none !important;max-width:none !important;min-height:0;min-width:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;position:static;right:auto;tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;top:auto;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;width:auto;word-spacing:normal;z-index:auto;-o-user-select:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;}');
        a.appendChild(b);
        window.document.head.appendChild(a);
        mrpStyleReset = a
    }
};
d.browserSupportsCodec = function (a) {
    return 'ogg' != a && 'aac' != a && 'mp3' != a ? !0 : mrpBrowserCompat[a]
};
d.isIE = function () {
    return mrpBrowserCompat.isIE
};
d.insert = function (a) {
    if (1 == a.forceFlash) return d.flashInsert(a);
    if (0 < d.isIE() && 11 > d.isIE()) e.log('MusesRadioPlayer will use Flash Version here since you have Internet Explorer ' + d.isIE() + ' (wich is older than IE 11).'),
        d.flashInsert(a);
    else if (0 < d.isIE() && 11 <= d.isIE() && 'aac' == a.codec && FlashDetect.versionAtLeast(10, 1)) e.log('MusesRadioPlayer will use Flash Version here since you have Internet Explorer ' + d.isIE() + ' (wich claims to support AAC but it doesn\'t support it right).'),
        d.flashInsert(a);
    else {
        if (1 == a.forceHTML5 || d.browserSupportsCodec(a.codec)) return d.jsInsert(a);
        FlashDetect.versionAtLeast(10, 1) ? (e.log('MusesRadioPlayer will use Flash Version here since your browser does not support ' + a.codec + ' codec!'), d.flashInsert(a))  : (e.log('MusesRadioPlayer will not work here, since your browser does not support ' +
            a.codec + ' codec and you don\'t have flash plugin installed!'), d.jsInsert(a))
    }
};
d.getMusesPlayerCounter = function () {
    return musesPlayerCounter++
};
d.jsInsert = function (a) {
    null == a.elementId && null != d.elementId && (a.elementId = d.elementId);
    null == a.id && (a.id = d.objectId);
    d.createMusesStyleReset();
    var b = 'MusesRadioPlayer-HTML5-player-' + d.getMusesPlayerCounter(),
    c = '<div id="' + b + '" class="musesStyleReset" style="overflow:hidden; width:' + a.width + 'px;height:' + a.height + 'px;"></div>';
    null == a.elementId ? window.document.write(c)  :
    window.document.getElementById(a.elementId).innerHTML = c;
    null != a.callbackFunction && d.setCallbackFunction(a.callbackFunction);
    a.elementId = b;
    a.skin = d.getSkin(a.skin, !1);
    b = new G(a);
    d.jsInstances.set(a.id, b)
};
d.flashInsert = function (a) {
    null == a.elementId && null != d.elementId && (a.elementId = d.elementId);
    null == a.id && (a.id = d.objectId);
    null == a.wmode && (a.wmode = 'window');
    var b = 'url=' + a.url,
    b = b + ('&lang=' + (null != a.lang ? a.lang : 'auto')),
    b = b + ('&codec=' + a.codec),
    b = b + '&tracking=true' + ('&volume=' + (null != a.volume ? a.volume :
        100));
    null != a.introurl && (b += '&introurl=' + a.introurl);
    null != a.autoplay && (b += '&autoplay=' + (a.autoplay ? 'true' : 'false'));
    null != a.jsevents && (b += '&jsevents=' + (a.jsevents ? 'true' : 'false'));
    null != a.buffering && (b += '&buffering=' + a.buffering);
    null != a.metadataMode && (b += '&querymetadata=' + a.metadataMode, null != a.metadataProxy && (b += '&metadataproxy=' + a.metadataProxy), null != a.metadataInterval && (b += '&interval=' + a.metadataInterval));
    null != a.reconnectTime && (b += '&reconnecttime=' + a.reconnectTime);
    null != a.fallbackUrl && (b +=
        '&fallback=' + a.fallbackUrl);
    var b = b + ('&skin=' + d.getSkin(a.skin, !0)),
    b = b + ('&title=' + a.title),
    b = b + ('&welcome=' + a.welcome),
    c = d.getScriptBaseHREF() + '/muses-hosted.swf',
    h = 'width="' + a.width + '" height="' + a.height + '" ';
    null != a.bgcolor && (h += 'bgcolor="' + a.bgcolor + '" ');
    var y = '<object id="' + a.id + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' + h + '>',
    y = y + ('<param name="movie" value="' + c + '" />') + ('<param name="flashvars" value="' + b + '" />') + ('<param name="wmode" value="' + a.wmode + '" />'),
    y = y + '<param name="allowScriptAccess" value="always" />',
    y = y + '<param name="scale" value="noscale" />';
    null != a.bgcolor && (y += '<param name="bgcolor" value="' + a.bgcolor + '" />');
    y += '<embed name="' + a.id + '" src="' + c + '" flashvars="' + b + '" scale="noscale" wmode="' + a.wmode + '" ' + h + ' allowScriptAccess="always" type="application/x-shockwave-flash" />';
    y += '</object>';
    null != a.callbackFunction && d.setCallbackFunction(a.callbackFunction);
    null == a.elementId ? window.document.write(y)  : window.document.getElementById(a.elementId).innerHTML = y;
    b = null;
    eval('instance = document.' + d.objectId +
        ';');
    null == b && (b = document.getElementById(d.objectId));
    d.flashInstances.set(a.id, b)
};
d.main = function () {
    d.getScriptBaseHREF()
};
Math.__name__ = !0;
var I = function () {
};
I.__name__ = !0;
I.field = function (a, b) {
    try {
        return a[b]
    } catch (c) {
        return c instanceof m && (c = c.val),
        null
    }
};
I.setField = function (a, b, c) {
    a[b] = c
};
I.isFunction = function (a) {
    return 'function' == typeof a && !(a.__name__ || a.__ename__)
};
var J = function () {
};
J.__name__ = !0;
J.string = function (a) {
    return z.__string_rec(a, '')
};
J.parseInt = function (a) {
    var b = parseInt(a, 10);
    0 != b || 120 != q.cca(a, 1) && 88 != q.cca(a, 1) || (b = parseInt(a));
    return isNaN(b) ? null : b
};
var O = function () {
    this.b = ''
};
O.__name__ = !0;
O.prototype = {
    b: null,
    add: function (a) {
        this.b += J.string(a)
    },
    addSub: function (a, b, c) {
        this.b = null == c ? this.b + q.substr(a, b, null)  : this.b + q.substr(a, b, c)
    },
    __class__: O
};
var w = function () {
};
w.__name__ = !0;
w.urlEncode = function (a) {
    return encodeURIComponent(a)
};
w.isSpace = function (a, b) {
    var c = q.cca(a, b);
    return 8 < c && 14 > c || 32 == c
};
w.ltrim = function (a) {
    for (var b = a.length, c = 0; c < b && w.isSpace(a, c); ) c++;
        return 0 < c ? q.substr(a, c, b - c)  : a
};
w.rtrim = function (a) {
    for (var b = a.length, c = 0; c < b && w.isSpace(a, b - c - 1); ) c++;
        return 0 < c ? q.substr(a, 0, b - c)  : a
};
w.trim = function (a) {
    return w.ltrim(w.rtrim(a))
};
w.replace = function (a, b, c) {
    return a.split(b).join(c)
};
w.fastCodeAt = function (a, b) {
    return a.charCodeAt(b)
};
var La = function () {
};
La.__name__ = !0;
La.getInstanceFields = function (a) {
    var b = [
    ],
    c;
    for (c in a.prototype) b.push(c);
        q.remove(b, '__class__');
    q.remove(b, '__properties__');
    return b
};
var g = function (a) {
    this.nodeType = a;
    this.children = [
    ];
    this.attributeMap = new n
};
g.__name__ = !0;
g.parse = function (a) {
    return P.parse(a)
};
g.createElement = function (a) {
    var b = new g(g.Element);
    if (b.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + b.nodeType);
    b.nodeName = a;
    return b
};
g.createPCData = function (a) {
    var b = new g(g.PCData);
    if (b.nodeType == g.Document || b.nodeType == g.Element) throw new m('Bad node type, unexpected ' + b.nodeType);
    b.nodeValue = a;
    return b
};
g.createCData = function (a) {
    var b = new g(g.CData);
    if (b.nodeType == g.Document || b.nodeType ==
        g.Element) throw new m('Bad node type, unexpected ' + b.nodeType);
        b.nodeValue = a;
    return b
};
g.createComment = function (a) {
    var b = new g(g.Comment);
    if (b.nodeType == g.Document || b.nodeType == g.Element) throw new m('Bad node type, unexpected ' + b.nodeType);
    b.nodeValue = a;
    return b
};
g.createDocType = function (a) {
    var b = new g(g.DocType);
    if (b.nodeType == g.Document || b.nodeType == g.Element) throw new m('Bad node type, unexpected ' + b.nodeType);
    b.nodeValue = a;
    return b
};
g.createProcessingInstruction = function (a) {
    var b = new g(g.ProcessingInstruction);
    if (b.nodeType == g.Document || b.nodeType == g.Element) throw new m('Bad node type, unexpected ' + b.nodeType);
    b.nodeValue = a;
    return b
};
g.createDocument = function () {
    return new g(g.Document)
};
g.prototype = {
    nodeType: null,
    nodeName: null,
    nodeValue: null,
    parent: null,
    children: null,
    attributeMap: null,
    get_nodeValue: function () {
        if (this.nodeType == g.Document || this.nodeType == g.Element) throw new m('Bad node type, unexpected ' + this.nodeType);
        return this.nodeValue
    },
    get: function (a) {
        if (this.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' +
            this.nodeType);
            return this.attributeMap.get(a)
    },
    set: function (a, b) {
        if (this.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + this.nodeType);
        this.attributeMap.set(a, b)
    },
    exists: function (a) {
        if (this.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + this.nodeType);
        return this.attributeMap.exists(a)
    },
    attributes: function () {
        if (this.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + this.nodeType);
        return this.attributeMap.keys()
    },
    elements: function () {
        if (this.nodeType != g.Document && this.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + this.nodeType);
        for (var a = [
            ], b = 0, c = this.children; b < c.length; ) {
            var h = c[b];
        ++b;
        h.nodeType == g.Element && a.push(h)
    }
    return q.iter(a)
},
elementsNamed: function (a) {
    if (this.nodeType != g.Document && this.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + this.nodeType);
    for (var b = [
        ], c = 0, h = this.children; c < h.length; ) {
        var y = h[c];
    ++c;
    var d;
    if (d = y.nodeType == g.Element) {
        if (y.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + y.nodeType);
        d = y.nodeName == a
    }
    d && b.push(y)
}
return q.iter(b)
},
firstChild: function () {
    if (this.nodeType != g.Document && this.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + this.nodeType);
    return this.children[0]
},
firstElement: function () {
    if (this.nodeType != g.Document && this.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' +
        this.nodeType);
        for (var a = 0, b = this.children; a < b.length; ) {
            var c = b[a];
            ++a;
            if (c.nodeType == g.Element) return c
        }
    return null
},
addChild: function (a) {
    if (this.nodeType != g.Document && this.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + this.nodeType);
    null != a.parent && a.parent.removeChild(a);
    this.children.push(a);
    a.parent = this
},
removeChild: function (a) {
    if (this.nodeType != g.Document && this.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' +
        this.nodeType);
        return q.remove(this.children, a) ? (a.parent = null, !0)  : !1
},
__class__: g
};
var Q = function (a) {
    null == a && (a = !1);
    this.sitespeedSampleRate = 1;
    this.endPointPath = '/__utm.gif';
    this.endPointHost = 'www.google-analytics.com';
    this.urlScheme = 'http';
    this.requestTimeout = 1;
    this.sendOnShutdown = this.fireAndForget = !1;
    this.errorSeverity = 2;
    this.setUrlScheme('http' + (a ? 's' : ''))
};
Q.__name__ = !0;
Q.prototype = {
    errorSeverity: null,
    sendOnShutdown: null,
    fireAndForget: null,
    loggingCallback: null,
    requestTimeout: null,
    urlScheme: null,
    endPointHost: null,
    endPointPath: null,
    sitespeedSampleRate: null,
    getErrorSeverity: function () {
        return this.errorSeverity
    },
    setErrorSeverity: function (a) {
        this.errorSeverity = a
    },
    getSendOnShutdown: function () {
        return this.sendOnShutdown
    },
    setSendOnShutdown: function (a) {
        this.sendOnShutdown = a
    },
    getFireAndForget: function () {
        return this.fireAndForget
    },
    setFireAndForget: function (a) {
        this.fireAndForget = a
    },
    getLoggingCallback: function () {
        return this.loggingCallback
    },
    setLoggingCallback: function (a) {
        this.loggingCallback = a
    },
    getRequestTimeout: function () {
        return this.requestTimeout
    },
    setRequestTimeout: function (a) {
        this.requestTimeout = a
    },
    getUrlScheme: function () {
        return this.urlScheme
    },
    setUrlScheme: function (a) {
        return this.urlScheme = a
    },
    getEndPointHost: function () {
        return this.endPointHost
    },
    setEndPointHost: function (a) {
        this.endPointHost = a
    },
    getEndPointPath: function () {
        return this.endPointPath
    },
    setEndPointPath: function (a) {
        this.endPointPath = a
    },
    getSitespeedSampleRate: function () {
        return this.sitespeedSampleRate
    },
    setSitespeedSampleRate: function (a) {
        0 > a || 100 < a ? A._raiseError('For consistency with ga.js, sample rates must be specified as a number between 0 and 100.', 'config.setSitespeedSampleRate')  : this.sitespeedSampleRate = a
    },
    __class__: Q
};
var R = function (a) {
    this.date = null == a ? Math.round((new Date).getTime()) + '' : a
};
R.__name__ = !0;
R.prototype = {
    date: null,
    toString: function () {
        return this.date
    },
    __class__: R
};
var Ma = function (a, b, c, h, d) {
    null == d && (d = !1);
    null == h && (h = 0);
    this.noninteraction = !1;
    null != a && this.setCategory(a);
    null != b && this.setAction(b);
    null != c && this.setLabel(c);
    this.setValue(h);
    this.setNoninteraction(d)
};
Ma.__name__ = !0;
Ma.prototype = {
    category: null,
    action: null,
    label: null,
    value: null,
    noninteraction: null,
    validate: function () {
        null != this.category && null != this.action || A._raiseError('Events need at least to have a category and action defined.', 'Event.validate')
    },
    getCategory: function () {
        return this.category
    },
    setCategory: function (a) {
        this.category = a
    },
    getAction: function () {
        return this.action
    },
    setAction: function (a) {
        this.action = a
    },
    getLabel: function () {
        return this.label
    },
    setLabel: function (a) {
        this.label = a
    },
    getValue: function () {
        return this.value
    },
    setValue: function (a) {
        this.value = a
    },
    getNoninteraction: function () {
        return this.noninteraction
    },
    setNoninteraction: function (a) {
        this.noninteraction = a
    },
    __class__: Ma
};
var ha = function (a) {
    this.setPath(a)
};
ha.__name__ = !0;
ha.prototype = {
    path: null,
    title: null,
    charset: null,
    referrer: null,
    loadTime: null,
    setPath: function (a) {
        null != a && '/' != a.charAt(0) && A._raiseError('The page path should always start with a slash ("/").', 'Page.setPath');
        this.path = a
    },
    getPath: function () {
        return this.path
    },
    setTitle: function (a) {
        this.title = a
    },
    getTitle: function () {
        return this.title
    },
    setCharset: function (a) {
        this.charset = a
    },
    getCharset: function () {
        return this.charset
    },
    setReferrer: function (a) {
        this.referrer = a
    },
    getReferrer: function () {
        return this.referrer
    },
    setLoadTime: function (a) {
        this.loadTime = a
    },
    getLoadTime: function () {
        return this.loadTime
    },
    __class__: ha
};
var Na = function () {
    this.setSessionId(this.generateSessionId());
    this.setTrackCount(0);
    this.setStartTime(new R)
};
Na.__name__ = !0;
Na.prototype = {
    sessionId: null,
    trackCount: null,
    startTime: null,
    fromUtmb: function (a) {
        a = a.split('.');
        if (4 != a.length) return A._raiseError('The given "__utmb" cookie value is invalid.', 'Session.fromUtmb'),
            this;
        this.setTrackCount(B.parseInt(a[1], 0));
        this.setStartTime(new R(a[3]));
        return this
    },
    generateSessionId: function () {
        return B.generate32bitRandom()
    },
    getSessionId: function () {
        return this.sessionId
    },
    setSessionId: function (a) {
        this.sessionId = a
    },
    getTrackCount: function () {
        return this.trackCount
    },
    setTrackCount: function (a) {
        this.trackCount = a
    },
    increaseTrackCount: function (a) {
        null == a && (a = 1);
        this.trackCount += a
    },
    getStartTime: function () {
        return this.startTime
    },
    setStartTime: function (a) {
        this.startTime = a
    },
    __class__: Na
};
var t = function () {
};
t.__name__ = !0;
t.init = function (a, b, c) {
    null == c && (c = !1);
    null == t.accountId && (t.accountId = a, t.domainName = b, t.tracker = new A(a, b, new Q(c)), t.cache = new n, t.session = new Na, t.loadVisitor())
};
t.trackPageview = function (a, b) {
    var c = 'page:' + a;
    if (!t.cache.exists(c)) {
        var h = new ha(a);
        null != b && h.setTitle(b);
        h = new ia(h, null);
        t.cache.set(c, h)
    }
    t.track(c)
};
t.trackEvent = function (a, b, c, h) {
    null == h && (h = 0);
    var d = 'event:' + a + '/' + b + '/' + c + ':' + h;
    t.cache.exists(d) || (a = new ia(null, new Ma(a, b, c, h)), t.cache.set(d, a));
    t.track(d)
};
t.track = function (a) {
    t.paused || (t.cache.get(a).track(t.tracker, t.visitor, t.session), t.persistVisitor())
};
t.pause = function () {
    t.paused = !0
};
t.resume = function () {
    t.paused = !1
};
t.loadVisitor = function () {
    t.visitor = new Oa;
    t.visitor.setUserAgent('-not-set- [haxe]');
    t.visitor.setScreenResolution('1024x768');
    t.visitor.setLocale('en_US');
    t.visitor.getUniqueId();
    t.visitor.addSession(t.session);
    t.persistVisitor()
};
t.persistVisitor = function () {
};
var ia = function (a, b) {
    this.page = a;
    this.event = b
};
ia.__name__ = !0;
ia.prototype = {
    event: null,
    page: null,
    track: function (a, b, c) {
        null != this.page && a.trackPageview(this.page, c, b);
        null != this.event && a.trackEvent(this.event, c, b)
    },
    __class__: ia
};
var A = function (a, b, c) {
    this.allowHash = !0;
    this.customVariables = [
    ];
    A.setConfig(null != c ? c : new Q);
    this.setAccountId(a);
    this.setDomainName(b)
};
A.__name__ = !0;
A.getConfig = function () {
    return A.config
};
A.setConfig = function (a) {
    A.config = a
};
A._raiseError = function (a, b) {
    a = b + '(): ' + a;
    switch (null != A.config ? A.config.getErrorSeverity()  : 0) {
        case 1:
        e.log(a);
        break;
        case 2:
        throw new m(a);
    }
};
A.prototype = {
    accountId: null,
    domainName: null,
    allowHash: null,
    customVariables: null,
    campaign: null,
    setAccountId: function (a) {
        (new M('^(UA|MO)-[0-9]*-[0-9]*$', '')).match(a) || A._raiseError('"' + a + '" is not a valid Google Analytics account ID.', 'Tracker.setAccountId');
        this.accountId = a
    },
    getAccountId: function () {
        return this.accountId
    },
    setDomainName: function (a) {
        this.domainName = a
    },
    getDomainName: function () {
        return this.domainName
    },
    setAllowHash: function (a) {
        this.allowHash = a
    },
    getAllowHash: function () {
        return this.allowHash
    },
    addCustomVariable: function (a) {
        a.validate();
        this.customVariables[a.getIndex()] = a
    },
    getCustomVariables: function () {
        return this.customVariables
    },
    removeCustomVariable: function (a) {
        q.remove(this.customVariables, this.customVariables[a])
    },
    setCampaign: function (a) {
        null != a && a.validate();
        this.campaign = a
    },
    getCampaign: function () {
        return this.campaign
    },
    trackPageview: function (a, b, c) {
        var h = new W(A.config);
        h.setPage(a);
        h.setSession(b);
        h.setVisitor(c);
        h.setTracker(this);
        h.send()
    },
    trackEvent: function (a, b, c) {
        a.validate();
        var h = new ba(A.config);
        h.setEvent(a);
        h.setSession(b);
        h.setVisitor(c);
        h.setTracker(this);
        h.send()
    },
    trackTransaction: function (a, b, c) {
        a.validate();
        var h = new ja(A.config);
        h.setTransaction(a);
        h.setSession(b);
        h.setVisitor(c);
        h.setTracker(this);
        h.send();
        for (a = a.getItems().iterator(); a.hasNext(); ) {
            h = a.next();
            h.validate();
            var d = new ka(A.config);
            d.setItem(h);
            d.setSession(b);
            d.setVisitor(c);
            d.setTracker(this);
            d.send()
        }
    },
    trackSocial: function (a, b, c, h) {
        var d = new la(A.config);
        d.setSocialInteraction(a);
        d.setPage(b);
        d.setSession(c);
        d.setVisitor(h);
        d.setTracker(this);
        d.send()
    },
    __class__: A
};
var Oa = function () {
    var a = new R;
    this.uniqueId = 0;
    this.setFirstVisitTime(a);
    this.setPreviousVisitTime(a);
    this.setCurrentVisitTime(a);
    this.setVisitCount(1)
};
Oa.__name__ = !0;
Oa.prototype = {
    uniqueId: null,
    firstVisitTime: null,
    previousVisitTime: null,
    currentVisitTime: null,
    visitCount: null,
    ipAddress: null,
    userAgent: null,
    locale: null,
    flashVersion: null,
    javaEnabled: null,
    screenColorDepth: null,
    screenResolution: null,
    fromUtma: function (a) {
        a = a.split('.');
        if (6 != a.length) return A._raiseError('The given "__utma" cookie value is invalid.', 'Visitor.fromUtma'),
            this;
        this.setUniqueId(B.parseInt(a[1], 0));
        this.setFirstVisitTime(new R(a[2]));
        this.setPreviousVisitTime(new R(a[3]));
        this.setCurrentVisitTime(new R(a[4]));
        this.setVisitCount(B.parseInt(a[5], 0));
        return this
    },
    generateHash: function () {
        return B.generateHash(this.userAgent + this.screenResolution + this.screenColorDepth)
    },
    generateUniqueId: function () {
        return (B.generate32bitRandom() ^ this.generateHash()) & 2147483647
    },
    setUniqueId: function (a) {
        (0 > a || 2147483647 < a) && A._raiseError('Visitor unique ID has to be a 32-bit integer between 0 and 2147483647.', 'Visitor.setUniqueId');
        this.uniqueId = a
    },
    getUniqueId: function () {
        0 == this.uniqueId && (this.uniqueId = this.generateUniqueId());
        return this.uniqueId
    },
    addSession: function (a) {
        a = a.getStartTime();
        a != this.currentVisitTime && (this.previousVisitTime = this.currentVisitTime, this.currentVisitTime = a, ++this.visitCount)
    },
    setFirstVisitTime: function (a) {
        this.firstVisitTime = a
    },
    getFirstVisitTime: function () {
        return this.firstVisitTime
    },
    setPreviousVisitTime: function (a) {
        this.previousVisitTime = a
    },
    getPreviousVisitTime: function () {
        return this.previousVisitTime
    },
    setCurrentVisitTime: function (a) {
        this.currentVisitTime = a
    },
    getCurrentVisitTime: function () {
        return this.currentVisitTime
    },
    setVisitCount: function (a) {
        this.visitCount = a
    },
    getVisitCount: function () {
        return this.visitCount
    },
    setIpAddress: function (a) {
        this.ipAddress = a
    },
    getIpAddress: function () {
        return this.ipAddress
    },
    setUserAgent: function (a) {
        this.userAgent = a
    },
    getUserAgent: function () {
        return this.userAgent
    },
    setLocale: function (a) {
        this.locale = a
    },
    getLocale: function () {
        return this.locale
    },
    setFlashVersion: function (a) {
        this.flashVersion = a
    },
    getFlashVersion: function () {
        return this.flashVersion
    },
    setJavaEnabled: function (a) {
        this.javaEnabled = a
    },
    getJavaEnabled: function () {
        return this.javaEnabled
    },
    setScreenColorDepth: function (a) {
        this.screenColorDepth = a
    },
    getScreenColorDepth: function () {
        return this.screenColorDepth
    },
    setScreenResolution: function (a) {
        this.screenResolution = a
    },
    getScreenResolution: function () {
        return this.screenResolution
    },
    __class__: Oa
};
var ca = function () {
    this.utmwv = '5.2.5';
    this.utmr = this.utmcs = this.utmfl = this.utmje = '0'
};
ca.__name__ = !0;
ca.prototype = {
    utmwv: null,
    utmac: null,
    utmhn: null,
    utmvid: null,
    utmt: null,
    utms: null,
    utmn: null,
    utmcc: null,
    utme: null,
    utmni: null,
    utmu: null,
    utmp: null,
    utmdt: null,
    utmcs: null,
    utmr: null,
    utmip: null,
    utmul: null,
    utmfl: null,
    utmje: null,
    utmsc: null,
    utmsr: null,
    __utma: null,
    utmhid: null,
    __utmb: null,
    __utmc: null,
    utmipc: null,
    utmipn: null,
    utmipr: null,
    utmiqt: null,
    utmiva: null,
    utmtid: null,
    utmtst: null,
    utmtto: null,
    utmttx: null,
    utmtsp: null,
    utmtci: null,
    utmtrg: null,
    utmtco: null,
    utmcn: null,
    utmcr: null,
    utmcid: null,
    utmcsr: null,
    utmgclid: null,
    utmdclid: null,
    utmccn: null,
    utmcmd: null,
    utmctr: null,
    utmcct: null,
    utmcvr: null,
    __utmz: null,
    utmsn: null,
    utmsa: null,
    utmsid: null,
    __utmx: null,
    __utmv: null,
    toHashTable: function () {
        for (var a = new n, b = 0, c = La.getInstanceFields(ca); b < c.length; ) {
            var h = c[b];
            ++b;
            if ('_' != h.charAt(0) && !I.isFunction(I.field(this, h))) {
                var d = I.field(this, h);
                null != E[h] ? a.setReserved(h, d)  : a.h[h] = d
            }
        }
        return a
    },
    toQueryString: function () {
        for (var a = '', b = 0, c = La.getInstanceFields(ca); b < c.length; ) {
            var h = c[b];
            ++b;
            '_' == h.charAt(0) || I.isFunction(I.field(this, h)) || null == I.field(this, h) || 'null' == I.field(this, h) || (a += h + '=' + w.replace(J.string(I.field(this, h)) + '', '&', '%26') + '&')
        }
        return a
    },
    __class__: ca
};
var B = function () {
};
B.__name__ = !0;
B.encodeUriComponent = function (a) {
    return B.convertToUriComponentEncoding(w.urlEncode(a))
};
B.stringReplaceArray = function (a, b, c) {
    for (var h = 0, d = b.length; h < d; ) {
        var g = h++;
        null != b[g] && (a = w.replace(a + ' ', b[g], c[g]))
    }
    return w.trim(a)
};
B.parseInt = function (a, b) {
    return null == a ? b : J.parseInt(a)
};
B.convertToUriComponentEncoding = function (a) {
    return B.stringReplaceArray(a, '!*\'() +'.split(''), '%21 %2A %27 %28 %29 %20 %20'.split(' '))
};
B.generate32bitRandom = function () {
    return Math.round(2147483647 * Math.random())
};
B.generateHash = function (a) {
    var b = 1,
    c;
    if (null != a && '' != a) for (var b = 0, h = a.length - 1; 0 <= h; ) c = q.cca(a, h),
    b = (b << 6 & 268435455) + c + (c << 14),
    c = b & 266338304,
    0 != c && (b ^= c >> 21),
    h--;
    return b
};
var S = function () {
    this.projectData = new n;
    this.KEY = 'k';
    this.VALUE = 'v';
    this.SET = [
    'k',
    'v'
    ];
    this.DELIM_BEGIN = '(';
    this.DELIM_END = ')';
    this.DELIM_SET = '*';
    this.DELIM_NUM_VALUE = '!';
    this.MINIMUM = 1;
    this.ESCAPE_CHAR_MAP = new n;
    this.ESCAPE_CHAR_MAP.set('\'', '\'0');
    this.ESCAPE_CHAR_MAP.set(')', '\'1');
    this.ESCAPE_CHAR_MAP.set('*', '\'2');
    this.ESCAPE_CHAR_MAP.set('!', '\'3')
};
S.__name__ = !0;
S.prototype = {
    projectData: null,
    KEY: null,
    VALUE: null,
    SET: null,
    DELIM_BEGIN: null,
    DELIM_END: null,
    DELIM_SET: null,
    DELIM_NUM_VALUE: null,
    ESCAPE_CHAR_MAP: null,
    MINIMUM: null,
    hasProject: function (a) {
        return this.projectData.exists(a)
    },
    setKey: function (a, b, c) {
        this.setInternal(a, this.KEY, b, c)
    },
    getKey: function (a, b) {
        return this.getInternal(a, this.KEY, b)
    },
    clearKey: function (a) {
        this.clearInternal(a, this.KEY)
    },
    setValue: function (a, b, c) {
        this.setInternal(a, this.VALUE, b, c)
    },
    getValue: function (a, b) {
        return this.getInternal(a, this.VALUE, b)
    },
    clearValue: function (a) {
        this.clearInternal(a, this.VALUE)
    },
    setInternal: function (a, b, c, h) {
        if (!this.projectData.exists(a)) {
            var d = new n;
            this.projectData.set(a, d)
        }
        a = this.projectData.get(a);
        (null != E[b] ? a.existsReserved(b)  :
            a.h.hasOwnProperty(b)) || (d = [
            ], null != E[b] ? a.setReserved(b, d)  : a.h[b] = d);
            (null != E[b] ? a.getReserved(b)  : a.h[b]) [c] = h
        },
        getInternal: function (a, b, c) {
            if (!this.projectData.exists(a)) return null;
            a = this.projectData.get(a);
            if (null != E[b] ? !a.existsReserved(b)  : !a.h.hasOwnProperty(b)) return null;
            b = null != E[b] ? a.getReserved(b)  : a.h[b];
            return null == b[c] ? null : b[c]
        },
        clearInternal: function (a, b) {
            var c;
            if (c = this.projectData.exists(a)) c = this.projectData.get(a).exists(b);
            c && this.projectData.get(a).remove(b)
        },
        escapeExtensibleValue: function (a) {
            for (var b = '', c = 0, h = a.length; c < h; ) var d = c++,
                d = a.charAt(d),
            b = this.ESCAPE_CHAR_MAP.exists(d) ? b + this.ESCAPE_CHAR_MAP.get(d)  : b + d;
            return b
        },
        SORT_NUMERIC: function (a, b) {
            return a == b ? 0 : a > b ? 1 : - 1
        },
        renderDataType: function (a) {
            for (var b = [
                ], c = 0, h = 0, d = a.length; h < d; ) {
                var g = h++,
            e = a[g];
            if (null != e) {
                var f = '';
                g != this.MINIMUM && g - 1 != c && (f += g, f += this.DELIM_NUM_VALUE);
                f += this.escapeExtensibleValue(e);
                b.push(f)
            }
            c = g
        }
        return this.DELIM_BEGIN + b.join(this.DELIM_SET) + this.DELIM_END
    },
    renderProject: function (a) {
        for (var b = '', c = !1, h = 0, d = this.SET.length; h <
            d; ) {
            var g = h++;
        a.exists(this.SET[g]) ? (c && (b += this.SET[g]), b += this.renderDataType(a.get(this.SET[g])), c = !1)  : c = !0
    }
    return b
},
renderUrlString: function () {
    for (var a = '', b = this.projectData.keys(); b.hasNext(); ) var c = b.next(),
        a = a + (c + this.renderProject(this.projectData.get(c)));
    return a
},
__class__: S
};
var v = function (a) {
    this.setConfig(null != a ? a : new Q)
};
v.__name__ = !0;
v.onError = function (a) {
};
v.prototype = {
    type: null,
    config: null,
    userAgent: null,
    tracker: null,
    visitor: null,
    session: null,
    getConfig: function () {
        return this.config
    },
    setConfig: function (a) {
        this.config = a
    },
    setUserAgent: function (a) {
        this.userAgent = a
    },
    getTracker: function () {
        return this.tracker
    },
    setTracker: function (a) {
        this.tracker = a
    },
    getVisitor: function () {
        return this.visitor
    },
    setVisitor: function (a) {
        this.visitor = a
    },
    getSession: function () {
        return this.session
    },
    setSession: function (a) {
        this.session = a
    },
    increaseTrackCount: function () {
        this.session.increaseTrackCount();
        500 < this.session.getTrackCount() && A._raiseError('Google Analytics does not guarantee to process more than 500 requests per session.', 'Request.buildHttpRequest');
        null != this.tracker.getCampaign() && this.tracker.getCampaign().increaseResponseCount()
    },
    send: function () {
        if (null != this.config.getEndPointHost()) {
            var a = this.buildParameters();
            null != this.visitor && (this.setUserAgent(this.visitor.getUserAgent()), a.utmvid = this.visitor.getUniqueId());
            a = B.convertToUriComponentEncoding(a.toQueryString());
            a = this.config.getUrlScheme() + '://' + this.config.getEndPointHost() + this.config.getEndPointPath() + '?' + a;
            this.increaseTrackCount();
            (new Image).src = a
        }
    },
    getType: function () {
        return null
    },
    buildParameters: function () {
        var a = new ca;
        a.utmac = this.tracker.getAccountId();
        a.utmhn = this.tracker.getDomainName();
        a.utmt = '' + this.getType();
        a.utmn = B.generate32bitRandom();
        a.utmip = this.visitor.getIpAddress();
        a.utmhid = this.session.getSessionId();
        a.utms = this.session.getTrackCount();
        a = this.buildVisitorParameters(a);
        a = this.buildCustomVariablesParameter(a);
        a = this.buildCampaignParameters(a);
        return a = this.buildCookieParameters(a)
    },
    buildVisitorParameters: function (a) {
        null != this.visitor.getLocale() && (a.utmul = w.replace(this.visitor.getLocale(), '_', '-').toLowerCase());
        null != this.visitor.getFlashVersion() && (a.utmfl = this.visitor.getFlashVersion());
        this.visitor.getJavaEnabled() ? a.utmje = '1' : a.utmje = '0';
        null != this.visitor.getScreenColorDepth() && (a.utmsc = this.visitor.getScreenColorDepth() + '-bit');
        a.utmsr = this.visitor.getScreenResolution();
        return a
    },
    buildCustomVariablesParameter: function (a) {
        var b = this.tracker.getCustomVariables();
        if (null == b) return a;
        5 < b.length && A._raiseError('The sum of all custom variables cannot exceed 5 in any given request.', 'Request.buildCustomVariablesParameter');
        var c = new S,
        h,
        d;
        c.clearKey('8');
        c.clearKey('9');
        c.clearKey('11');
        for (var g = 0; g < b.length; ) {
            var e = b[g];
            ++g;
            h = B.encodeUriComponent(e.getName());
            d = B.encodeUriComponent(e.getValue());
            c.setKey('8', e.getIndex(), h);
            c.setKey('9', e.getIndex(), d);
            3 != e.getScope() && c.setKey('11', e.getIndex(), e.getScope())
        }
        b = c.renderUrlString();
        null != b && (a.utme = null == a.utme ? b : a.utme + b);
        return a
    },
    buildCookieParameters: function (a) {
        var b = this.generateDomainHash();
        a.__utma = b + '.';
        a.__utma += this.visitor.getUniqueId() +
        '.';
        a.__utma += this.visitor.getFirstVisitTime().toString() + '.';
        a.__utma += this.visitor.getPreviousVisitTime().toString() + '.';
        a.__utma += this.visitor.getCurrentVisitTime().toString() + '.';
        a.__utma += this.visitor.getVisitCount();
        a.__utmb = b + '.';
        a.__utmb += this.session.getTrackCount() + '.';
        a.__utmb += '10.';
        a.__utmb += this.session.getStartTime().toString();
        a.__utmc = b;
        b = '__utma=' + a.__utma + ';';
        null != a.__utmz && (b += '+__utmz=' + a.__utmz + ';');
        null != a.__utmv && (b += '+__utmv=' + a.__utmv + ';');
        a.utmcc = b;
        return a
    },
    buildCampaignParameters: function (a) {
        var b = this.tracker.getCampaign();
        if (null == b) return a;
        a.__utmz = this.generateDomainHash() + '.';
        a.__utmz += b.getCreationTime().toString() + '.';
        a.__utmz += this.visitor.getVisitCount() + '.';
        a.__utmz += b.getResponseCount() + '.';
        b = 'utmcid=' + b.getId() + '|utmcsr=' + b.getSource() + '|utmgclid=' + b.getGClickId() + '|utmdclid=' + b.getDClickId() + '|utmccn=' + b.getName() + '|utmcmd=' + b.getMedium() + '|utmctr=' + b.getTerm() + '|utmcct=' + b.getContent();
        a.__utmz += w.replace(w.replace(b, '+', '%20'), ' ', '%20');
        return a
    },
    generateDomainHash: function () {
        var a = 1;
        this.tracker.getAllowHash() && (a = B.generateHash(this.tracker.getDomainName()));
        return a
    },
    __class__: v
};
var ba = function (a) {
    v.call(this, a)
};
ba.__name__ = !0;
ba.__super__ = v;
ba.prototype = l(v.prototype, {
    event: null,
    getType: function () {
        return 'event'
    },
    buildParameters: function () {
        var a = v.prototype.buildParameters.call(this),
        b = new S;
        b.clearKey('5');
        b.clearValue('5');
        b.setKey('5', 1, this.event.getCategory());
        b.setKey('5', 2, this.event.getAction());
        null != this.event.getLabel() && b.setKey('5', 3, this.event.getLabel());
        0 != this.event.getValue() && b.setValue('5', 1, this.event.getValue());
        b = b.renderUrlString();
        null != b && (a.utme = null == a.utme ? b : a.utme + b);
        this.event.getNoninteraction() && (a.utmni = 1);
        return a
    },
    getEvent: function () {
        return this.event
    },
    setEvent: function (a) {
        this.event = a
    },
    __class__: ba
});
var ka = function (a) {
    v.call(this, a)
};
ka.__name__ = !0;
ka.__super__ = v;
ka.prototype = l(v.prototype, {
    item: null,
    getType: function () {
        return 'item'
    },
    buildParameters: function () {
        var a = v.prototype.buildParameters.call(this);
        a.utmtid = this.item.getOrderId();
        a.utmipc = this.item.getSku();
        a.utmipn = this.item.getName();
        a.utmiva = this.item.getVariation();
        a.utmipr = this.item.getPrice();
        a.utmiqt = this.item.getQuantity();
        return a
    },
    buildVisitorParameters: function (a) {
        return a
    },
    buildCustomVariablesParameter: function (a) {
        return a
    },
    getItem: function () {
        return this.item
    },
    setItem: function (a) {
        this.item = a
    },
    __class__: ka
});
var W = function (a) {
    v.call(this, a)
};
W.__name__ = !0;
W.__super__ = v;
W.prototype = l(v.prototype, {
    page: null,
    getType: function () {
        return null
    },
    buildParameters: function () {
        var a = v.prototype.buildParameters.call(this);
        a.utmp = this.page.getPath();
        a.utmdt = this.page.getTitle();
        null != this.page.getCharset() && (a.utmcs = this.page.getCharset());
        null != this.page.getReferrer() && (a.utmr = this.page.getReferrer());
        0 != this.page.getLoadTime() && a.utmn % 100 < this.config.getSitespeedSampleRate() && (a.utme = null == a.utme ? '0' : a.utme + 0);
        return a
    },
    getPage: function () {
        return this.page
    },
    setPage: function (a) {
        this.page = a
    },
    __class__: W
});
var la = function (a) {
    v.call(this, a)
};
la.__name__ = !0;
la.__super__ = W;
la.prototype = l(W.prototype, {
    socialInteraction: null,
    getType: function () {
        return 'social'
    },
    buildParameters: function () {
        var a = W.prototype.buildParameters.call(this);
        a.utmsn = this.socialInteraction.getNetwork();
        a.utmsa = this.socialInteraction.getAction();
        a.utmsid = this.socialInteraction.getTarget();
        null == a.utmsid && (a.utmsid = this.page.getPath());
        return a
    },
    getSocialInteraction: function () {
        return this.socialInteraction
    },
    setSocialInteraction: function (a) {
        this.socialInteraction = a
    },
    __class__: la
});
var ja = function (a) {
    v.call(this, a)
};
ja.__name__ = !0;
ja.__super__ = v;
ja.prototype = l(v.prototype, {
    transaction: null,
    getType: function () {
        return 'tran'
    },
    buildParameters: function () {
        var a = v.prototype.buildParameters.call(this);
        a.utmtid = this.transaction.getOrderId();
        a.utmtst = this.transaction.getAffiliation();
        a.utmtto = this.transaction.getTotal();
        a.utmttx = this.transaction.getTax();
        a.utmtsp = this.transaction.getShipping();
        a.utmtci = this.transaction.getCity();
        a.utmtrg = this.transaction.getRegion();
        a.utmtco = this.transaction.getCountry();
        return a
    },
    buildVisitorParameters: function (a) {
        return a
    },
    buildCustomVariablesParameter: function (a) {
        return a
    },
    getTransaction: function () {
        return this.transaction
    },
    setTransaction: function (a) {
        this.transaction = a
    },
    __class__: ja
});
var Pa = function () {
};
Pa.__name__ = !0;
Pa.prototype = {
    exists: null,
    remove: null,
    iterator: null,
    __class__: Pa
};
var X = function (a) {
    this.url = a;
    this.headers = new aa;
    this.params = new aa;
    this.async = !0
};
X.__name__ = !0;
X.requestUrl = function (a) {
    a = new X(a);
    a.async = !1;
    var b = null;
    a.onData = function (a) {
        b = a
    };
    a.onError = function (a) {
        throw new m(a);
    };
    a.request(!1);
    return b
};
X.prototype = {
    url: null,
    responseData: null,
    async: null,
    postData: null,
    headers: null,
    params: null,
    req: null,
    request: function (a) {
        var b = this;
        b.responseData = null;
        var c = this.req = Ua.createXMLHttpRequest(),
        h = function (a) {
            if (4 == c.readyState) {
                var d;
                try {
                    d = c.status
                } catch (Va) {
                    Va instanceof m && (Va = Va.val),
                    d = null
                }
                null != d && (a = window.location.protocol.toLowerCase(), (new M('^(?:about|app|app-storage|.+-extension|file|res|widget):$', '')).match(a) && (d = null != c.responseText ?
                    200 : 404));
                void 0 == d && (d = null);
                if (null != d) b.onStatus(d);
                if (null != d && 200 <= d && 400 > d) b.req = null,
                    b.onData(b.responseData = c.responseText);
                else if (null == d) b.req = null,
                    b.onError('Failed to connect or resolve host');
                else switch (d) {
                    case 12029:
                    b.req = null;
                    b.onError('Failed to connect to host');
                    break;
                    case 12007:
                    b.req = null;
                    b.onError('Unknown host');
                    break;
                    default:
                    b.req = null,
                    b.responseData = c.responseText,
                    b.onError('Http Error #' + c.status)
                }
            }
        };
        this.async && (c.onreadystatechange = h);
        var d = this.postData;
        if (null != d) a = !0;
        else for (var g = this.params.h, e = null; null != g; ) e = g[0],
        g = g[1],
        d = null == d ? '' : d + '&',
        d += encodeURIComponent(e.param) + '=' + encodeURIComponent(e.value);
        try {
            if (a) c.open('POST', this.url, this.async);
            else if (null != d) {
                var f = 1 >= this.url.split('?').length;
                c.open('GET', this.url + (f ? '?' : '&') + d, this.async);
                d = null
            } else c.open('GET', this.url, this.async)
        } catch (p) {
            p instanceof m && (p = p.val);
            b.req = null;
            this.onError(p.toString());
            return
        }
        !K.exists(this.headers, function (a) {
            return 'Content-Type' == a.header
        }) && a && null == this.postData && c.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        a = this.headers.h;
        for (g = null; null != a; ) g = a[0],
            a = a[1],
        c.setRequestHeader(g.header, g.value);
        c.send(d);
        this.async || h(null)
    },
    onData: function (a) {
    },
    onError: function (a) {
    },
    onStatus: function (a) {
    },
    __class__: X
};
var Qa = function (a, b) {
    this.high = a;
    this.low = b
};
Qa.__name__ = !0;
Qa.prototype = {
    high: null,
    low: null,
    __class__: Qa
};
var N = function (a) {
    var b = this;
    this.id = setInterval(function () {
        b.run()
    }, a)
};
N.__name__ = !0;
N.delay = function (a, b) {
    var c = new N(b);
    c.run = function () {
        c.stop();
        a()
    };
    return c
};
N.prototype = {
    id: null,
    stop: function () {
        null != this.id && (clearInterval(this.id), this.id = null)
    },
    run: function () {
    },
    __class__: N
};
var Ra = function (a, b) {
    this.map = a;
    this.keys = b;
    this.index = 0;
    this.count = b.length
};
Ra.__name__ = !0;
Ra.prototype = {
    map: null,
    keys: null,
    index: null,
    count: null,
    hasNext: function () {
        return this.index < this.count
    },
    next: function () {
        return this.map.get(this.keys[this.index++])
    },
    __class__: Ra
};
var n = function () {
    this.h = {
    }
};
n.__name__ = !0;
n.__interfaces__ = [
Pa
];
n.prototype = {
    h: null,
    rh: null,
    set: function (a, b) {
        null != E[a] ? this.setReserved(a, b)  : this.h[a] = b
    },
    get: function (a) {
        return null != E[a] ? this.getReserved(a)  : this.h[a]
    },
    exists: function (a) {
        return null != E[a] ? this.existsReserved(a)  : this.h.hasOwnProperty(a)
    },
    setReserved: function (a, b) {
        null == this.rh && (this.rh = {
        });
        this.rh['$' + a] = b
    },
    getReserved: function (a) {
        return null == this.rh ? null : this.rh['$' + a]
    },
    existsReserved: function (a) {
        return null == this.rh ? !1 : this.rh.hasOwnProperty('$' + a)
    },
    remove: function (a) {
        if (null != E[a]) {
            a = '$' + a;
            if (null ==
                this.rh || !this.rh.hasOwnProperty(a)) return !1;
                delete this.rh[a]
        } else {
            if (!this.h.hasOwnProperty(a)) return !1;
            delete this.h[a]
        }
        return !0
    },
    keys: function () {
        var a = this.arrayKeys();
        return q.iter(a)
    },
    arrayKeys: function () {
        var a = [
        ],
        b;
        for (b in this.h) this.h.hasOwnProperty(b) && a.push(b);
            if (null != this.rh) for (b in this.rh) 36 == b.charCodeAt(0) && a.push(b.substr(1));
        return a
    },
    iterator: function () {
        return new Ra(this, this.arrayKeys())
    },
    __class__: n
};
var H = {
    __ename__: !0,
    __constructs__: [
    'Blocked',
    'Overflow',
    'OutsideBounds',
    'Custom'
    ],
    Blocked: [
    'Blocked',
    0
    ]
};
H.Blocked.toString = F;
H.Blocked.__enum__ = H;
H.Overflow = [
'Overflow',
1
];
H.Overflow.toString = F;
H.Overflow.__enum__ = H;
H.OutsideBounds = [
'OutsideBounds',
2
];
H.OutsideBounds.toString = F;
H.OutsideBounds.__enum__ = H;
H.Custom = function (a) {
    a = [
    'Custom',
    3,
    a
    ];
    a.__enum__ = H;
    a.toString = F;
    return a
};
var P = function () {
};
P.__name__ = !0;
P.parse = function (a, b) {
    null == b && (b = !1);
    var c = g.createDocument();
    P.doParse(a, b, 0, c);
    return c
};
P.doParse = function (a, b, c, d) {
    null == c && (c = 0);
    for (var h = null, e = 1, f = 1, l = null, p = 0, r = 0, t = 0, k = a.charCodeAt(c), n = new O, u = 1, v = - 1; k == k; ) {
        switch (e) {
            case 0:
            switch (k) {
                case 10:
                case 13:
                case 9:
                case 32:
                break;
                default:
                e = f;
                continue
            }
            break;
            case 1:
            switch (k) {
                case 60:
                e = 0;
                f = 2;
                break;
                default:
                p = c;
                e = 13;
                continue
            }
            break;
            case 13:
            60 == k ? (n.addSub(a, p, c - p), f = g.createPCData(n.b), n = new O, d.addChild(f), r++, e = 0, f = 2)  : 38 == k && (n.addSub(a, p, c - p), e = 18, u = 13, p = c + 1);
            break;
            case 17:
            93 == k && 93 == a.charCodeAt(c + 1) && 62 == a.charCodeAt(c + 2) && (k = g.createCData(q.substr(a, p, c - p)), d.addChild(k), r++, c += 2, e = 1);
            break;
            case 2:
            switch (k) {
                case 33:
                if (91 ==
                    a.charCodeAt(c + 1)) {
                    c += 2;
                if ('CDATA[' != q.substr(a, c, 6).toUpperCase()) throw new m('Expected <![CDATA[');
                c += 5;
                e = 17
            } else if (68 == a.charCodeAt(c + 1) || 100 == a.charCodeAt(c + 1)) {
                if ('OCTYPE' != q.substr(a, c + 2, 6).toUpperCase()) throw new m('Expected <!DOCTYPE');
                c += 8;
                e = 16
            } else {
                if (45 != a.charCodeAt(c + 1) || 45 != a.charCodeAt(c + 2)) throw new m('Expected <!--');
                c += 2;
                e = 15
            }
            p = c + 1;
            break;
            case 63:
            e = 14;
            p = c;
            break;
            case 47:
            if (null == d) throw new m('Expected node name');
            p = c + 1;
            e = 0;
            f = 10;
            break;
            default:
            e = 3;
            p = c;
            continue
        }
        break;
        case 3:
        if (!(97 <=
            k && 122 >= k || 65 <= k && 90 >= k || 48 <= k && 57 >= k || 58 == k || 46 == k || 95 == k || 45 == k)) {
            if (c == p) throw new m('Expected node name');
        h = g.createElement(q.substr(a, p, c - p));
        d.addChild(h);
        r++;
        e = 0;
        f = 4;
        continue
    }
    break;
    case 4:
    switch (k) {
        case 47:
        e = 11;
        break;
        case 62:
        e = 9;
        break;
        default:
        e = 5;
        p = c;
        continue
    }
    break;
    case 5:
    if (!(97 <= k && 122 >= k || 65 <= k && 90 >= k || 48 <= k && 57 >= k || 58 == k || 46 == k || 95 == k || 45 == k)) {
        if (p == c) throw new m('Expected attribute name');
        l = q.substr(a, p, c - p);
        if (h.exists(l)) throw new m('Duplicate attribute');
        e = 0;
        f = 6;
        continue
    }
    break;
    case 6:
    switch (k) {
        case 61:
        e = 0;
        f = 7;
        break;
        default:
        throw new m('Expected =');
    }
    break;
    case 7:
    switch (k) {
        case 34:
        case 39:
        n = new O;
        e = 8;
        p = c + 1;
        v = k;
        break;
        default:
        throw new m('Expected "');
    }
    break;
    case 8:
    switch (k) {
        case 38:
        n.addSub(a, p, c - p);
        e = 18;
        u = 8;
        p = c + 1;
        break;
        case 62:
        if (b) throw new m('Invalid unescaped ' + String.fromCharCode(k) + ' in attribute value');
        k == v && (n.addSub(a, p, c - p), f = n.b, n = new O, h.set(l, f), e = 0, f = 4);
        break;
        case 60:
        if (b) throw new m('Invalid unescaped ' + String.fromCharCode(k) + ' in attribute value');
        k == v && (n.addSub(a, p, c - p), f = n.b, n = new O, h.set(l, f), e = 0, f = 4);
        break;
        default:
        k == v && (n.addSub(a, p, c - p), f = n.b, n = new O, h.set(l, f), e = 0, f = 4)
    }
    break;
    case 9:
    p = c = P.doParse(a, b, c, h);
    e = 1;
    break;
    case 11:
    switch (k) {
        case 62:
        e = 1;
        break;
        default:
        throw new m('Expected >');
    }
    break;
    case 12:
    switch (k) {
        case 62:
        return 0 == r && d.addChild(g.createPCData('')),
        c;
        default:
        throw new m('Expected >');
    }
    case 10:
    if (!(97 <= k && 122 >= k || 65 <= k && 90 >= k || 48 <= k && 57 >= k || 58 == k || 46 == k || 95 == k || 45 == k)) {
        if (p == c) throw new m('Expected node name');
        f = q.substr(a, p, c - p);
        if (d.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' +
            d.nodeType);
            if (f != d.nodeName) {
                c = m;
                if (d.nodeType != g.Element) throw 'Bad node type, expected Element but found ' + d.nodeType;
                throw new c('Expected </' + d.nodeName + '>');
            }
            e = 0;
            f = 12;
            continue
        }
        break;
        case 15:
        45 == k && 45 == a.charCodeAt(c + 1) && 62 == a.charCodeAt(c + 2) && (k = g.createComment(q.substr(a, p, c - p)), d.addChild(k), r++, c += 2, e = 1);
        break;
        case 16:
        91 == k ? t++ : 93 == k ? t-- : 62 == k && 0 == t && (k = g.createDocType(q.substr(a, p, c - p)), d.addChild(k), r++, e = 1);
        break;
        case 14:
        63 == k && 62 == a.charCodeAt(c + 1) && (c++, k = q.substr(a, p + 1, c - p - 2), k = g.createProcessingInstruction(k), d.addChild(k), r++, e = 1);
        break;
        case 18:
        if (59 == k) {
            p = q.substr(a, p, c - p);
            if (35 == p.charCodeAt(0)) p = 120 == p.charCodeAt(1) ? J.parseInt('0' + q.substr(p, 1, p.length - 1))  : J.parseInt(q.substr(p, 1, p.length - 1)),
                n.b += String.fromCharCode(p);
            else if (P.escapes.exists(p)) n.add(P.escapes.get(p));
            else {
                if (b) throw new m('Undefined entity: ' + p);
                n.b += J.string('&' + p + ';')
            }
            p = c + 1;
            e = u
        } else if (!(97 <= k && 122 >= k || 65 <= k && 90 >= k || 48 <= k && 57 >= k || 58 == k || 46 == k || 95 == k || 45 == k) && 35 != k) {
            if (b) throw new m('Invalid character in entity: ' + String.fromCharCode(k));
            n.b += '&';
            n.addSub(a, p, c - p);
            c--;
            p = c + 1;
            e = u
        }
    }
    k = w.fastCodeAt(a, ++c)
}
1 == e && (p = c, e = 13);
if (13 == e) {
    if (c != p || 0 == r) n.addSub(a, p, c - p),
        a = g.createPCData(n.b),
    d.addChild(a);
    return c
}
if (!b && 18 == e && 13 == u) return n.b += '&',
    n.addSub(a, p, c - p),
a = g.createPCData(n.b),
d.addChild(a),
c;
throw new m('Unexpected end');
};
var m = function (a) {
    Error.call(this);
    this.val = a;
    this.message = String(a);
    Error.captureStackTrace && Error.captureStackTrace(this, m)
};
m.__name__ = !0;
m.__super__ = Error;
m.prototype = l(Error.prototype, {
    val: null,
    __class__: m
});
var z = function () {
};
z.__name__ = !0;
z.getClass = function (a) {
    if (a instanceof Array && null == a.__enum__) return Array;
    var b = a.__class__;
    if (null != b) return b;
    a = z.__nativeClassName(a);
    return null != a ? z.__resolveNativeClass(a)  : null
};
z.__string_rec = function (a, b) {
    if (null == a) return 'null';
    if (5 <= b.length) return '<...>';
    var c = typeof a;
    'function' == c && (a.__name__ || a.__ename__) && (c = 'object');
    switch (c) {
        case 'object':
        if (a instanceof Array) {
            if (a.__enum__) {
                if (2 == a.length) return a[0];
                c = a[0] + '(';
                b += '\t';
                for (var d = 2, e = a.length; d <
                    e; ) var g = d++,
                    c = 2 != g ? c + (',' + z.__string_rec(a[g], b))  : c + z.__string_rec(a[g], b);
                return c + ')'
            }
            c = a.length;
            d = '[';
            b += '\t';
            for (e = 0; e < c; ) g = e++,
                d += (0 < g ? ',' : '') + z.__string_rec(a[g], b);
            return d + ']'
        }
        try {
            d = a.toString
        } catch (Ta) {
            return Ta instanceof m && (Ta = Ta.val),
            '???'
        }
        if (null != d && d != Object.toString && 'function' == typeof d && (c = a.toString(), '[object Object]' != c)) return c;
        c = null;
        d = '{\n';
        b += '\t';
        e = null != a.hasOwnProperty;
        for (c in a) e && !a.hasOwnProperty(c) || 'prototype' == c || '__class__' == c || '__super__' == c || '__interfaces__' ==
            c || '__properties__' == c || (2 != d.length && (d += ', \n'), d += b + c + ' : ' + z.__string_rec(a[c], b));
        b = b.substring(1);
        return d + ('\n' + b + '}');
        case 'function':
        return '<function>';
        case 'string':
        return a;
        default:
        return String(a)
    }
};
z.__interfLoop = function (a, b) {
    if (null == a) return !1;
    if (a == b) return !0;
    var c = a.__interfaces__;
    if (null != c) for (var d = 0, e = c.length; d < e; ) {
        var g = d++,
        g = c[g];
        if (g == b || z.__interfLoop(g, b)) return !0
    }
return z.__interfLoop(a.__super__, b)
};
z.__instanceof = function (a, b) {
    if (null == b) return !1;
    switch (b) {
        case bb:
        return (a | 0) === a;
        case Ya:
        return 'number' == typeof a;
        case Za:
        return 'boolean' == typeof a;
        case String:
        return 'string' == typeof a;
        case Array:
        return a instanceof Array && null == a.__enum__;
        case cb:
        return !0;
        default:
        if (null != a) if ('function' == typeof b) {
            if (a instanceof b || z.__interfLoop(z.getClass(a), b)) return !0
        } else {
            if ('object' == typeof b && z.__isNativeObj(b) && a instanceof b) return !0
        } else return !1;
    return b == db && null != a.__name__ || b == eb && null != a.__ename__ ? !0 : a.__enum__ == b
}
};
z.__nativeClassName = function (a) {
    a = z.__toStr.call(a).slice(8, - 1);
    return 'Object' == a || 'Function' == a || 'Math' == a || 'JSON' == a ? null : a
};
z.__isNativeObj = function (a) {
    return null != z.__nativeClassName(a)
};
z.__resolveNativeClass = function (a) {
    return x[a]
};
var Ua = function () {
};
Ua.__name__ = !0;
Ua.createXMLHttpRequest = function () {
    if ('undefined' != typeof XMLHttpRequest) return new XMLHttpRequest;
    if ('undefined' != typeof ActiveXObject) return new ActiveXObject('Microsoft.XMLHTTP');
    throw new m('Unable to create XMLHttpRequest object.');
};
var L = function (a) {
    if (a instanceof Array && null ==
        a.__enum__) this.a = a,
        this.byteLength = a.length;
    else {
        this.a = [
        ];
        for (var b = 0; b < a; ) {
            var c = b++;
            this.a[c] = 0
        }
        this.byteLength = a
    }
};
L.__name__ = !0;
L.sliceImpl = function (a, b) {
    var c = new $a(this, a, null == b ? null : b - a),
    d = new Wa(c.byteLength);
    (new $a(d)).set(c);
    return d
};
L.prototype = {
    byteLength: null,
    a: null,
    slice: function (a, b) {
        return new L(this.a.slice(a, b))
    },
    __class__: L
};
var T = function () {
};
T.__name__ = !0;
T._new = function (a, b, c) {
    if ('number' == typeof a) {
        c = [
        ];
        for (b = 0; b < a; ) {
            var d = b++;
            c[d] = 0
        }
        c.byteLength = c.length;
        c.byteOffset = 0;
        c.buffer = new L(c)
    } else if (z.__instanceof(a, L)) null == b && (b = 0),
    null == c && (c = a.byteLength - b),
    c = 0 == b ? a.a : a.a.slice(b, b + c),
    c.byteLength = c.length,
    c.byteOffset = b,
    c.buffer = a;
    else if (a instanceof Array && null == a.__enum__) c = a.slice(),
        c.byteLength = c.length,
    c.byteOffset = 0,
    c.buffer = new L(c);
    else throw new m('TODO ' + J.string(a));
    c.subarray = T._subarray;
    c.set = T._set;
    return c
};
T._set = function (a, b) {
    if (z.__instanceof(a.buffer, L)) {
        if (a.byteLength + b > this.byteLength) throw new m('set() outside of range');
        for (var c = 0, d = a.byteLength; c < d; ) {
            var e = c++;
            this[e + b] = a[e]
        }
    } else if (a instanceof Array && null == a.__enum__) {
        if (a.length + b > this.byteLength) throw new m('set() outside of range');
        c = 0;
        for (d = a.length; c < d; ) e = c++,
            this[e + b] = a[e]
    } else throw new m('TODO');
};
T._subarray = function (a, b) {
    var c = T._new(this.slice(a, b));
    c.byteOffset = a;
    return c
};
var ma = function () {
    this.title = this.artist = this.album = this.genre = this.comment = this.encoder = this.year = ''
};
ma.__name__ = !0;
ma.prototype = {
    title: null,
    artist: null,
    album: null,
    genre: null,
    comment: null,
    encoder: null,
    year: null,
    set: function (a, b) {
        switch (a.toLowerCase()) {
            case 'title':
            this.title = b;
            break;
            case 'artist':
            this.artist = b;
            break;
            case 'album':
            this.album = b;
            break;
            case 'genre':
            this.genre = b;
            break;
            case 'encoder':
            this.encoder = b;
            break;
            case 'year':
            this.year = b
        }
    },
    getJson: function () {
        return '{"title":"' + w.replace(this.title, '"', '\'') + '","artist":"' + w.replace(this.artist, '"', '\'') + '","album":"' + w.replace(this.album, '"', '\'') + '","genre":"' + w.replace(this.genre, '"', '\'') + '","comment":"' + w.replace(this.comment, '"', '\'') + '","encoder":"' + w.replace(this.encoder, '"', '\'') + '","year":"' + w.replace(this.year, '"', '\'') + '"}'
    },
    __class__: ma
};
var r = function () {
};
r.__name__ = !0;
r.createContainerDiv = function () {
    if (null == r.container && (r.container = window.document.getElementById('musesContextMenuContainer'), r.titleDiv = window.document.getElementById('musesContextMenuTitleDiv'), r.aboutDiv = window.document.getElementById('musesContextMenuAboutDiv'), r.versionDiv = window.document.getElementById('musesContextMenuVersionDiv'), null == r.container)) {
        var a;
        a = window.document.createElement('style');
        var b = window.document.createTextNode('DIV#musesContextMenuContainer{margin:0;padding:0;z-index:2147483647;text-align:left;width:auto;height:auto;background-color:#fff;border: solid #dedede 1px;position:absolute;cursor:default;display:none;font-family:Arial;color:#000;font-size:12px;border-radius:3px;}DIV#musesContextMenuTitleDiv{margin:0;padding:5px;font-weight:bold;color:#b5b5b5;border-bottom:solid #dedede 1px}DIV#musesContextMenuAboutDiv{margin:0;padding:5px;font-weight:bold;}DIV#musesContextMenuAboutDiv:hover{text-decorations:underline;cursor:pointer;background-color:#eee;}DIV#musesContextMenuAboutDiv A {text-decoration:none;color:#555}DIV#musesContextMenuVersionDiv{margin:0;padding:0px 5px 5px 5px;font-size:11px;}');
        a.appendChild(b);
        r.container = window.document.createElement('div');
        r.titleDiv = window.document.createElement('div');
        r.aboutDiv = window.document.createElement('div');
        r.versionDiv = window.document.createElement('div');
        r.container.classList.add('musesStyleReset');
        r.container.id = 'musesContextMenuContainer';
        r.titleDiv.id = 'musesContextMenuTitleDiv';
        r.aboutDiv.id = 'musesContextMenuAboutDiv';
        r.versionDiv.id = 'musesContextMenuVersionDiv';
        r.container.appendChild(r.titleDiv);
        r.container.appendChild(r.aboutDiv);
        r.container.appendChild(r.versionDiv);
        window.document.head.appendChild(a);
        window.document.body.appendChild(r.container)
    }
};
r.prepare = function (a) {
    r.createContainerDiv();
    r.versionDiv.style.textAlign = a.getTextAlign();
    r.aboutDiv.style.textAlign = a.getTextAlign();
    r.versionDiv.innerHTML = a.getText('version') + ' 2.1 (html5)';
    r.aboutDiv.innerHTML = '<a href=\'https://www.muses.org/\' target=\'_blank\'>' + a.getText('about') + '</a>'
};
r.hide = function (a) {
    r.displaying && (r.container.style.display = 'none', window.document.removeEventListener('click', r.hide), r.displaying = !1)
};
r.display = function (a, b, c, d) {
    r.prepare(d);
    r.displaying || (r.container.style.display = 'block', window.document.addEventListener('click', r.hide), r.displaying = !0);
    r.container.style.left = a - 3 + 'px';
    r.container.style.top = b - 3 + 'px';
    r.titleDiv.style.textAlign = d.getTextAlign();
    r.titleDiv.innerHTML = c
};
var Sa = function (a, b) {
    this.timer = null;
    this.player = a;
    null != b.metadataMode && (this.metadataMode = b.metadataMode);
    this.interval = null != b.metadataInterval ? b.metadataInterval : 20;
    null != b.metadataProxy && (this.proxy = b.metadataProxy);
    '' == this.proxy && (this.proxy = null)
};
Sa.__name__ = !0;
Sa.prototype = {
    player: null,
    ui: null,
    interval: null,
    proxy: null,
    metadataMode: null,
    mUrl: null,
    timer: null,
    stop: function () {
        null != this.timer && (this.timer.stop(), this.timer = null)
    },
    begin: function () {
        'icecast' != this.metadataMode && 'streamtheworld' != this.metadataMode && 'shoutcast' != this.metadataMode || null != this.timer || (this.timer = new N(1000 * this.interval), this.timer.run = u(this, this.loop), this.loop())
    },
    loop: function () {
        console.log("metadataMode : "+this.metadataMode);
        if (this.player.isPlaying()) {
            var a;
            switch (this.metadataMode) {
                case 'icecast':
                a = this.player.getCurrentUrl().split('?') [0] + '.xspf';
                break;
                case 'streamtheworld':
                a = this.mUrl + '&' + (new Date).getTime();
                break;
                case 'shoutcast':
                a = this.player.getCurrentUrl();
                var b = this.player.getCurrentUrl().indexOf('/', 9);
                a = q.substr(a, 0, b) + '/7.html';
                break;
                default:
                a = null
            }
            null != this.proxy && (a = this.proxy + '?url=' + w.replace(a, ':', '%3A'));
            this.loadMetadata(a)
        } else this.stop()
    },
    loadMetadata: function (a) {
        a = new X(a);
        a.onError = u(this, this.onError);
        switch (this.metadataMode) {
            case 'icecast':
            a.onData = u(this, this.loadIcecastEvent);
            break;
            case 'streamtheworld':
            a.onData = u(this, this.loadStreamTheWorldEvent);
            break;
            case 'shoutcast':
            a.onData = u(this, this.loadShoutcastEvent);
            break;
            default:
            a.onData = null
        }
        a.request(!1)
    },
    onError: function (a) {
        e.log('Metadata Error: ' + a)
    },
    loadStreamTheWorldEvent: function (a) {
        a = g.parse(a).firstChild();
        if (a.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + a.nodeType);
        if ('nowplaying-info-list' == a.nodeName.toLowerCase()) for (a = a.elementsNamed('nowplaying-info'); a.hasNext(); ) {
            var b = a.next();
            a = new ma;
            for (b = b.elementsNamed('property'); b.hasNext(); ) {
                var c = b.next();
                if ('cue_title' == c.get('name')) {
                    var d = a;
                    if (c.nodeType != g.Document && c.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + c.nodeType);
                    d.title = c.children[0].get_nodeValue()
                }
                if ('track_artist_name' == c.get('name')) {
                    d = a;
                    if (c.nodeType != g.Document && c.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + c.nodeType);
                    d.artist = c.children[0].get_nodeValue()
                }
                if ('cue_time_start' ==
                    c.get('name')) {
                    d = a;
                if (c.nodeType != g.Document && c.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + c.nodeType);
                d.comment = c.children[0].get_nodeValue()
            }
        }
        this.player.ui.setMetadata(a);
        break
    }
},
loadShoutcastEvent: function (a) {
    if (null != a && '' != a) {
        a = w.replace(a, '<html>', '');
        a = w.replace(a, '</html>', '');
        a = w.replace(a, '<body>', '');
        a = w.replace(a, '</body>', '');
        a = a.split(',');
        for (var b = a[6], c = 7, d = a.length; c < d; ) var e = c++,
            b = b + (',' + a[e]);
        null != b && '' != b && this.player.ui.setMetadataFromString(w.trim(b))
    }
},
loadIcecastEvent: function (a) {
    if (null != a && '' != a) {
        var b = g.parse(a).firstElement(),
        c = a = null;
        if (b.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + b.nodeType);
        if ('playlist' == b.nodeName.toLowerCase()) {
            for (b = b.elements(); b.hasNext(); ) {
                var d = b.next();
                if (d.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + d.nodeType);
                if ('tracklist' == d.nodeName.toLowerCase()) for (d = d.elements(); d.hasNext(); ) {
                    var e = d.next();
                    if (e.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' +
                        e.nodeType);
                        if ('track' == e.nodeName.toLowerCase()) for (e = e.elements(); e.hasNext(); ) {
                            var f = e.next();
                            if (f.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + f.nodeType);
                            if ('title' == f.nodeName.toLowerCase()) {
                                if (f.nodeType != g.Document && f.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + f.nodeType);
                                a = f.children[0].get_nodeValue()
                            } else {
                                var l;
                                if (l = null == c) {
                                    if (f.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + f.nodeType);
                                    l = 'creator' == f.nodeName.toLowerCase()
                                }
                                if (l) {
                                    if (f.nodeType != g.Document && f.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + f.nodeType);
                                    c = f.children[0].get_nodeValue()
                                } else {
                                    if (f.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + f.nodeType);
                                    if ('artist' == f.nodeName.toLowerCase()) {
                                        if (f.nodeType != g.Document && f.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + f.nodeType);
                                        c = f.children[0].get_nodeValue()
                                    }
                                }
                            }
                        }
                    }
                }
                if (null !=
                    a || null != c) null == c ? this.player.ui.setMetadataFromString(a)  : (b = new ma, b.title = a, b.artist = c, this.player.ui.setMetadata(b))
            }
    }
},
__class__: Sa
};
var G = f.muses.Muses = function (a) {
    this.metadataLoader = null;
    this.activated = !1;
    this.lastMessage = null;
    this.lastVolume = 1;
    this.src = this.name = null;
    this.progress = 0;
    this.lastAudioName = null;
    this.playURL = '';
    this.mustWaitForBuffer = !1;
    this.playTimeout = this.bufferingTimeout = this.requestedBuffering = 0;
    this.desiredStatus = 'stop';
    this.audio = this.lastAudioStatus = this.lastAudioSrc = null;
    this.src = a.url;
    this.name = a.title;
    this.audio = new Audio;
    this.ui = new C(this, a);
    null != a.buffering && (this.requestedBuffering = a.buffering);
    this.mustWaitForBuffer = 0 < this.requestedBuffering;
    this.metadataLoader = new Sa(this, a);
    a.autoplay && (this.audio.addEventListener('play', u(this, this.activate)), this.playAudio(!1))
};
G.__name__ = !0;
G.initTimer = function (a) {
    - 1 == q.indexOf(G.instances, a, 0) && G.instances.push(a);
    null == G.statusTimer && (G.statusTimer = new N(500), G.statusTimer.run = function () {
        for (var a = 0, c = G.instances; a <
            c.length; ) {
            var d = c[a];
        ++a;
        try {
            d.checkAudioStatus()
        } catch (y) {
            if (y instanceof m && (y = y.val), z.__instanceof(y, String)) e.log('Error: ' + y);
            else throw y;
        }
    }
})
};
G.prototype = {
    audio: null,
    lastAudioStatus: null,
    lastAudioSrc: null,
    desiredStatus: null,
    playTimeout: null,
    bufferingTimeout: null,
    requestedBuffering: null,
    mustWaitForBuffer: null,
    playURL: null,
    lastAudioName: null,
    progress: null,
    src: null,
    name: null,
    lastVolume: null,
    lastMessage: null,
    activated: null,
    metadataLoader: null,
    ui: null,
    activate: function () {
        this.activated || (this.activated = !0, G.initTimer(this), this.metadataLoader.begin(), this.mustWaitForBuffer = 0 < this.requestedBuffering)
    },
    setUrl: function (a) {
        this.src = a;
    },
    setMetadataMode: function (a) {
        this.metadataLoader.metadataMode = a;
        this.metadataLoader.loop();
    },
    setFallbackUrl: function (a) {
        e.log('Alert! setFallbackUrl not yet implemented on HTML5 version...')
    },
    isPlaying: function () {
        return 'play' == this.desiredStatus
    },
    getCurrentUrl: function () {
        return this.src
    },
    playAudio: function (a) {
        null == a && (a = !0);
        a && this.activate();
        this.stopAudio(!1);
        this.playURL = this.src;
        this.desiredStatus = 'play';
        this.playTimeout = 7200;
        this.bufferingTimeout = this.requestedBuffering +
        40;
        a = '?';
        1 < this.src.split('?').length && (a = '&');
        this.audio.src = this.src + a + (new Date).getTime();
        this.lastAudioSrc = this.src;
        this.lastAudioName = this.name;
        this.lastAudioStatus = null;
        this.audio.autoplay = !0;
        this.setVolume(this.lastVolume, !0);
        this.audio.play();
        this.activated && (this.ui.setPlaying(), this.metadataLoader.begin(), this.mustWaitForBuffer = 0 < this.requestedBuffering);
        this.mustWaitForBuffer && (this.audio.volume = 0, 0 < this.audio.volume && (this.mustWaitForBuffer = !1));
        U.track(this.src, this.name, this.ui, !0)
    },
    stopAudio: function (a) {
        this.desiredStatus = 'stop';
        null != this.audio && (this.audio.pause(), this.audio.src = '');
        a && (this.lastAudioStatus = 4, this.metadataLoader.stop())
    },
    retryAudio: function (a) {
        null == a && (a = 5000);
        var b = this;
        - 1 != this.lastAudioStatus && (this.lastAudioStatus = - 1, N.delay(function () {
            - 1 == b.lastAudioStatus && b.playAudio()
        }, a))
    },
    setVolume: function (a, b) {
        null == b && (b = !1);
        this.lastVolume = a;
        this.mustWaitForBuffer || (this.audio.volume = a, this.lastVolume = this.audio.volume);
        null != this.ui && this.ui.setVolume(this.lastVolume, b)
    },
    checkAudioStatus: function () {
        var a;
        a = null;
        if (null != this.audio) {
            a = this.audio.networkState;
            J.string(this.audio.error);
            if (2 == a || 1 == a) a = 2;
            if (null != this.audio.error || 4 == this.lastAudioStatus) a = 3;
            this.mustWaitForBuffer && 0 < this.audio.currentTime && (2 == a && (a = 1), this.audio.currentTime >= this.requestedBuffering && (this.audio.volume = this.lastVolume, this.mustWaitForBuffer = !1, this.audio.currentTime = 0))
        }
        0 == a ? (a = 'Error al conectar', this.lastMessage != a && this.ui.setError())  : - 1 == a ? a = 'retry...' : null == a ? a = 'init' : 1 == a ? (this.bufferingTimeout--, 0 == this.bufferingTimeout && this.retryAudio(), a = 'Buffering... ' + Math.round(this.bufferingTimeout / 2), this.lastMessage != a && this.ui.setBuffering())  : 2 == a ? (this.playTimeout--, 0 == this.playTimeout && this.retryAudio(5), a = 'Playing... ', this.lastMessage != a && this.ui.setPlaying())  : 4 == a || 3 == a ? 'play' == this.desiredStatus ? (a = 'Error de red', this.retryAudio(), this.lastMessage != a && this.ui.setError())  : (a = 'Stopped.', this.lastMessage != a && this.ui.setStopped())  : (a = 'ERROR: ' + a, e.log(a));
        this.lastMessage = a
    },
    __class__: G
};
var U = function () {
};
U.__name__ = !0;
U.track = function (a, b, c, d) {
    U.enabled && (null == U.tracked && (U.tracked = new n, t.init('UA-12297597-1', 'hosted.musesradioplayer.com', !0)), d && U.tracked.get(a) || (t.trackPageview('/tracker/track.php?version=2.1 (html5)&url=' + a + '&player=HTML5&skin=' + c.skin, 'Muses - HTML5 Tracking [Radio: ' + b + ']'), U.tracked.set(a, !0)))
};
var C = f.muses.UI = function (a, b) {
    this.toggleBuffer = !1;
    this.lastMetadata = this.lastMetadataJson = null;
    this.skinFolder = this.baseURL = this.skinDomain = '';
    this.togglePlayStopEnabled = this.lastToggleValue = !1;
    this.mainDiv = this.playButton = this.stopButton = this.volumeControl = this.bg = this.statusText = this.artistText = this.songTitleText = this.statusLed = null;
    this.skin = '';
    var c = this;
    this.title = b.title;
    this.skin = b.skin;
    this.reportEvents = null == b.jsevents ? !1 : b.jsevents;
    this.muses = a;
    this.language = Xa.factory(b.lang);
    r.prepare(this.language);
    this.mainDiv = window.document.getElementById(b.elementId);
    this.mainDiv.style.position = 'relative';
    this.mainDiv.addEventListener('contextmenu', u(this, this.showContextMenu));
    this.statusText = new Y(this);
    this.artistText = new Y(this);
    this.songTitleText = new Y(this);
    this.statusLed = new na(this);
    this.volumeControl = new oa(this, this.muses);
    this.volumeControl.setVolume(b.volume / 100, !0);
    this.playButton = new da(this, 'play');
    this.stopButton = new da(this, 'stop');
    this.loadSkin(this.skin);
    this.statusLed.configured && this.mainDiv.appendChild(this.statusLed.container);
    this.statusText.configured && this.mainDiv.appendChild(this.statusText.container);
    this.artistText.configured && this.mainDiv.appendChild(this.artistText.container);
    this.songTitleText.configured && this.mainDiv.appendChild(this.songTitleText.container);
    this.volumeControl.configured && this.mainDiv.appendChild(this.volumeControl.container);
    this.mainDiv.appendChild(this.playButton.container);
    this.mainDiv.appendChild(this.stopButton.container);
    this.stopButton.container.onclick = function (a) {
        c.muses.stopAudio(!0)
    };
    this.playButton.container.onclick = function (a) {
        c.muses.playAudio()
    };
    this.showInfo(b.welcome)
};
C.__name__ = !0;
C.parseInt = function (a, b) {
    return null == a ? b : J.parseInt(a)
};
C.prototype = {
    skin: null,
    mainDiv: null,
    playButton: null,
    stopButton: null,
    volumeControl: null,
    bg: null,
    statusText: null,
    artistText: null,
    songTitleText: null,
    statusLed: null,
    togglePlayStopEnabled: null,
    lastToggleValue: null,
    skinFolder: null,
    baseURL: null,
    skinDomain: null,
    title: null,
    titleTimer: null,
    muses: null,
    reportEvents: null,
    lastMetadata: null,
    lastMetadataJson: null,
    language: null,
    XmlToLower: function (a) {
        for (var b = a.attributes(); b.hasNext(); ) {
            var c = b.next();
            a.set(c.toLowerCase(), a.get(c))
        }
    },
    enablePlayStopToggle: function () {
        this.togglePlayStopEnabled = !0;
        this.togglePlayStop(this.lastToggleValue)
    },
    togglePlayStop: function (a) {
        this.lastToggleValue = a;
        this.togglePlayStopEnabled && (this.playButton.setVisible(!a), this.stopButton.setVisible(a))
    },
    makeAbsolute: function (a) {
        return - 1 != a.indexOf('://') ? a : '/' == a.charAt(0) ? this.skinDomain + a : this.baseURL + a
    },
    getDomainName: function (a) {
        a += '/';
        var b = a.indexOf('://');
        if ( - 1 == b) return '';
        b = a.indexOf('/', b + 3);
        return q.substr(a, 0, b)
    },
    getDirName: function (a) {
        var b = a.lastIndexOf('/');
        return - 1 == b ? '' : q.substr(a, 0, b + 1)
    },
    loadSkin: function (a) {
        var b = X.requestUrl(a);
        this.baseURL = this.getDirName(a);
        this.skinDomain = this.getDomainName(a);
        var c;
        for (a = g.parse(b).elements(); a.hasNext(); ) {
            b = a.next();
            if (b.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + b.nodeType);
            if (c = 'ffmp3-skin' != b.nodeName.toLowerCase()) {
                if (b.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + b.nodeType);
                c = 'muses-skin' !=
                b.nodeName.toLowerCase()
            }
            if (c) break;
            this.XmlToLower(b);
            null == b.get('folder') ? this.skinFolder = '' : this.skinFolder = b.get('folder');
            (c = null == b.get('toggleplaystop') ? !1 : 'true' == b.get('toggleplaystop')) && this.enablePlayStopToggle();
            0 < this.skinFolder.length && '/' != this.skinFolder.charAt(this.skinFolder.length - 1) && (this.skinFolder += '/');
            this.skinFolder = this.makeAbsolute(this.skinFolder);
            for (b = b.elements(); b.hasNext(); ) {
                c = b.next();
                this.XmlToLower(c);
                if (c.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' +
                    c.nodeType);
                    switch (c.nodeName.toLowerCase()) {
                        case 'bg':
                        this.configureBG(c);
                        break;
                        case 'play':
                        this.playButton.configure(c);
                        break;
                        case 'stop':
                        this.stopButton.configure(c);
                        break;
                        case 'text':
                        this.statusText.configureText(c, this.language.getTextAlign());
                        break;
                        case 'status':
                        this.statusLed.configure(c);
                        break;
                        case 'volume':
                        this.volumeControl.configure(c);
                        break;
                        case 'artist':
                        this.artistText.configureText(c, this.language.getTextAlign());
                        break;
                        case 'songtitle':
                        this.songTitleText.configureText(c, this.language.getTextAlign())
                    }
                }
            }
        },
        loadImage: function (a, b) {
            a.src = this.skinFolder + b
        },
        configureBG: function (a) {
            this.bg = new Image;
            this.loadImage(this.bg, a.get('image'));
            this.bg.style.position = 'absolute';
            this.bg.style.left = C.parseInt(a.get('x'), 0) + 'px';
            this.bg.style.top = C.parseInt(a.get('y'), 0) + 'px';
            this.mainDiv.appendChild(this.bg)
        },
        configureButton: function (a, b) {
            a.src = this.skinFolder + b.get('image');
            a.style.position = 'absolute';
            a.style.left = C.parseInt(b.get('x'), 0) + 'px';
            a.style.top = C.parseInt(b.get('y'), 0) + 'px'
        },
        callback: function (a, b) {
            null ==
            b && (b = '0');
            this.reportEvents && musesCallback(a, b)
        },
        setStatus: function (a) {
            this.showInfo(this.language.getText(a));
            this.callback(a)
        },
        setPlaying: function () {
            this.setStatus('play');
            this.statusLed.on();
            this.togglePlayStop(!0)
        },
        setStopped: function () {
            this.setStatus('stop');
            this.statusLed.off();
            this.togglePlayStop(!1);
            this.artistText.setText('');
            this.songTitleText.setText('');
            this.lastMetadata = this.lastMetadataJson = null
        },
        toggleBuffer: null,
        setBuffering: function () {
            this.callback('buffering');
            this.toggleBuffer ?
            this.showInfo('●')  : this.showInfo('○');
            this.toggleBuffer = !this.toggleBuffer;
            this.statusLed.on();
            this.togglePlayStop(!0)
        },
        setError: function () {
            this.setStatus('ioError');
            this.statusLed.off()
        },
        setVolume: function (a, b) {
            this.volumeControl.setVolume(a, b);
            b || this.showInfo(this.language.getText('volume') + ': ' + Math.round(100 * a) + '%');
            this.callback('volume', '' + Math.round(100 * a))
        },
        setMetadataFromString: function (a) {
            if (this.muses.isPlaying() && this.lastMetadata != a) {
                var b = a.indexOf(' - ', 0);
                - 1 != b ? (this.artistText.setText(q.substr(a, 0, b)), this.songTitleText.setText(q.substr(a, b + 3, null)))  : (this.artistText.setText(''), this.songTitleText.setText(a));
                this.lastMetadata = a;
                this.callback('metadata', a)
            }
        },
        setMetadata: function (a) {
            if (this.muses.isPlaying()) {
                var b = a.artist + ' - ' + a.title;
                this.lastMetadata != b && (this.lastMetadata = b, this.callback('metadata', b));
                b = a.getJson();
                this.lastMetadataJson != b && (this.lastMetadataJson = b, this.artistText.setText(a.artist), this.songTitleText.setText(a.title), this.callback('metadata-json', '[' + b + ']'))
            }
        },
        showInfo: function (a, b) {
            null == b && (b = !0);
            null == a ? this.restoreTitle()  : (null != this.titleTimer && this.titleTimer.stop(), this.statusText.setText(a), b && (this.titleTimer = new N(2000), this.titleTimer.run = u(this, this.restoreTitle)))
        },
        restoreTitle: function () {
            null != this.titleTimer && this.titleTimer.stop();
            this.statusText.setText(this.title)
        },
        setTitle: function (a) {
            this.title = a;
            this.restoreTitle()
        },
        showContextMenu: function (a) {
            r.display(window.pageXOffset + a.clientX, window.pageYOffset + a.clientY, this.title, this.language);
            a.preventDefault()
        },
        __class__: C
    };
    f = function () {
        this.byText = new n
    };
    f.__name__ = !0;
    f.prototype = {
        byText: null,
        getText: function (a) {
            return this.byText.get(a)
        },
        setText: function (a, b) {
            this.byText.set(a, b)
        },
        getTextAlign: function () {
            return 'left'
        },
        __class__: f
    };
    var pa = function () {
        this.byText = new n;
        this.setText('play', 'Նվագարկել');
        this.setText('stop', 'Կանգնեցնել');
        this.setText('intro', 'Ներածություն');
        this.setText('ioError', 'Ցանցային սխալ');
        this.setText('loadComplete', 'Սխալ. բեռնումն ավարտված է');
        this.setText('soundComplete', 'Սխալ. նվագարկումն ավարտված է');
        this.setText('volume', 'Ձայնի բարձրություն');
        this.setText('securityError', 'Անվտանգության սխալ');
        this.setText('about', '«Muses» ռադիո նվագարկչի մասին');
        this.setText('version', 'Տարբերակ')
    };
    pa.__name__ = !0;
    pa.__super__ = f;
    pa.prototype = l(f.prototype, {
        __class__: pa
    });
    var qa = function () {
        this.byText = new n;
        this.setText('play', 'Включи');
        this.setText('stop', 'Изключи');
        this.setText('ioError', 'Грешка в свързването');
        this.setText('loadComplete', 'Грешка: Завършено зареждане');
        this.setText('soundComplete', 'Грешка: Завършено зареждане на звук');
        this.setText('volume', 'Сила на звука');
        this.setText('securityError', 'Грешка в сигурността');
        this.setText('about', 'За Muses Radio Player...');
        this.setText('version', 'Версия ....');
        this.setText('intro', 'Интро')
    };
    qa.__name__ = !0;
    qa.__super__ = f;
    qa.prototype = l(f.prototype, {
        __class__: qa
    });
    var ra = function () {
        this.byText = new n;
        this.setText('play', '播放');
        this.setText('stop', '停止');
        this.setText('intro', '简介');
        this.setText('ioError', '网络出错');
        this.setText('loadComplete', '错误: 下载结束');
        this.setText('soundComplete', '错误: 声音结束');
        this.setText('volume', '音量');
        this.setText('securityError', '安全性错误');
        this.setText('about', '关于Muses Radio Player');
        this.setText('version', '版本')
    };
    ra.__name__ = !0;
    ra.__super__ = f;
    ra.prototype = l(f.prototype, {
        __class__: ra
    });
    var sa = function () {
        this.byText = new n;
        this.setText('play', 'Pokreni');
        this.setText('stop', 'Zaustavi');
        this.setText('ioError', 'Greška u mreži');
        this.setText('loadComplete', 'Greška: Učitavanje završeno');
        this.setText('soundComplete', 'Greška: Zvuk završen');
        this.setText('volume', 'Glasnoća');
        this.setText('securityError', 'Sigurnosna greška');
        this.setText('about', 'O Muses Radio Player...');
        this.setText('version', 'Verzija')
    };
    sa.__name__ = !0;
    sa.__super__ = f;
    sa.prototype = l(f.prototype, {
        __class__: sa
    });
    var ta = function () {
        this.byText = new n;
        this.setText('play', 'Přehrát');
        this.setText('stop', 'Zastavit');
        this.setText('intro', 'Úvod');
        this.setText('ioError', 'Chyba sítě');
        this.setText('loadComplete', 'Chyba: načteno');
        this.setText('soundComplete', 'Chyba: zvuk kompletní');
        this.setText('volume', 'Hlasitost');
        this.setText('securityError', 'Chyba zabezpečení');
        this.setText('about', 'O Muses Radio přehrávači...');
        this.setText('version', 'Verze')
    };
    ta.__name__ = !0;
    ta.__super__ = f;
    ta.prototype = l(f.prototype, {
        __class__: ta
    });
    var ua = function () {
        this.byText = new n;
        this.setText('play', 'Afspelen');
        this.setText('stop', 'Stoppen');
        this.setText('ioError', 'Netwerkfout');
        this.setText('loadComplete', 'Fout: Laden afgelopen');
        this.setText('soundComplete', 'Fout: Geluid afgelopen');
        this.setText('volume', 'Volume');
        this.setText('securityError', 'Beveiligingsfout');
        this.setText('about', 'Over Muses Radio Player...');
        this.setText('version', 'Versie');
        this.setText('intro', 'Intro')
    };
    ua.__name__ = !0;
    ua.__super__ = f;
    ua.prototype = l(f.prototype, {
        __class__: ua
    });
    var va = function () {
        this.byText = new n;
        this.setText('play', 'Play');
        this.setText('stop', 'Stop');
        this.setText('ioError', 'Network Error');
        this.setText('loadComplete', 'Error: Load Complete');
        this.setText('soundComplete', 'Error: Sound Complete');
        this.setText('volume', 'Volume');
        this.setText('securityError', 'Security Error');
        this.setText('about', 'About Muses Radio Player...');
        this.setText('version', 'Version');
        this.setText('intro', 'Intro')
    };
    va.__name__ = !0;
    va.__super__ = f;
    va.prototype = l(f.prototype, {
        __class__: va
    });
    var wa = function () {
        this.byText = new n;
        this.setText('play', 'Toista');
        this.setText('stop', 'Pysäytä');
        this.setText('ioError', 'Verkkoyhteysvirhe');
        this.setText('loadComplete', 'Lataaminen päättyi');
        this.setText('soundComplete', 'Äänentoisto päättyi');
        this.setText('volume', 'Äänenvoimakkuus');
        this.setText('securityError', 'Tietoturvavirhe');
        this.setText('about', 'Tietoja Muses Radio Player:sta...');
        this.setText('version', 'Versio')
    };
    wa.__name__ = !0;
    wa.__super__ = f;
    wa.prototype = l(f.prototype, {
        __class__: wa
    });
    var xa = function () {
        this.byText = new n;
        this.setText('play', 'Jouer');
        this.setText('stop', 'Arrêter');
        this.setText('ioError', 'Erreur réseau');
        this.setText('loadComplete', 'Erreur: Chargement complet');
        this.setText('soundComplete', 'Erreur: Son complet');
        this.setText('volume', 'Volume');
        this.setText('securityError', 'Erreur de sécurité');
        this.setText('about', 'A propos de Muses Radio Player...');
        this.setText('version', 'Version')
    };
    xa.__name__ = !0;
    xa.__super__ = f;
    xa.prototype = l(f.prototype, {
        __class__: xa
    });
    var ea = function () {
        this.byText = new n;
        this.setText('play', 'Abspielen');
        this.setText('stop', 'Stop');
        this.setText('ioError', 'Netzwerk-Fehler');
        this.setText('loadComplete', 'Fehler: Full Load');
        this.setText('soundComplete', 'Fehler: Full Audio');
        this.setText('volume', 'Lautstärke');
        this.setText('securityError', 'Sicherheit Fehler');
        this.setText('about', 'Über Muses Radio Player...');
        this.setText('version', 'Version')
    };
    ea.__name__ = !0;
    ea.__super__ = f;
    ea.prototype = l(f.prototype, {
        __class__: ea
    });
    var ya = function () {
        this.byText = new n;
        this.setText('play', 'Αναπαραγωγή');
        this.setText('stop', 'Διακοπή');
        this.setText('ioError', 'Σφάλμα δικτύου');
        this.setText('loadComplete', 'Σφάλμα: η μεταφόρτωση ολοκληρώθηκε');
        this.setText('soundComplete', 'Σφάλμα: ο ήχος ολοκληρώθηκε');
        this.setText('volume', 'Ένταση');
        this.setText('securityError', 'Σφάλμα ασφαλείας');
        this.setText('about', 'Περί του Muses Radio Player...');
        this.setText('version', 'Έκδοση');
        this.setText('intro', 'Εισαγωγή')
    };
    ya.__name__ = !0;
    ya.__super__ = f;
    ya.prototype = l(f.prototype, {
        __class__: ya
    });
    var fa = function () {
        this.byText = new n;
        this.setText('play', 'מתנגן');
        this.setText('stop', 'מופסק');
        this.setText('ioError', 'שגיאת חיבור');
        this.setText('loadComplete', 'שגיאה: הטעינה הסתיימה');
        this.setText('soundComplete', 'שגיאה: השמע הסתיים');
        this.setText('volume', 'עוצמה');
        this.setText('securityError', 'שגיאת אבטחה');
        this.setText('about', 'אודות Muses Radio Player...');
        this.setText('version', 'גירסה');
        this.setText('intro', 'פתיח')
    };
    fa.__name__ = !0;
    fa.__super__ = f;
    fa.prototype = l(f.prototype, {
        getTextAlign: function () {
            return 'right'
        },
        __class__: fa
    });
    var za = function () {
        this.byText = new n;
        this.setText('play', 'Lejátszás');
        this.setText('stop', 'Stop');
        this.setText('ioError', 'Hlózati hiba');
        this.setText('loadComplete', 'Hiba: a letöltés befejezodött');
        this.setText('soundComplete', 'Hiba: a hang megszakadt');
        this.setText('volume', 'Hangero');
        this.setText('securityError', 'Biztonsági hiba');
        this.setText('about', 'Bovebben az Muses Radio Player-ról...');
        this.setText('version', 'Verzió')
    };
    za.__name__ = !0;
    za.__super__ = f;
    za.prototype = l(f.prototype, {
        __class__: za
    });
    var Aa = function () {
        this.byText = new n;
        this.setText('play', 'Seinn');
        this.setText('stop', 'Stad');
        this.setText('intro', 'Seoladh Isteach ');
        this.setText('ioError', 'Earráid ar an Líonra');
        this.setText('loadComplete', 'Earráid: Lód curtha i gcrích');
        this.setText('soundComplete', 'Earráid: Fuaim curtha i gcrích');
        this.setText('volume', 'Airde');
        this.setText('securityError', 'Earráid Slándála');
        this.setText('about', 'Maidir le Seinnteoir Raidió Muses...');
        this.setText('version', 'Leagan')
    };
    Aa.__name__ = !0;
    Aa.__super__ = f;
    Aa.prototype = l(f.prototype, {
        __class__: Aa
    });
    var Ba = function () {
        this.byText = new n;
        this.setText('play', 'Riprodurre');
        this.setText('stop', 'Fermare');
        this.setText('ioError', 'Errore di rete');
        this.setText('loadComplete', 'Erreur: Completo carico');
        this.setText('soundComplete', 'Errore: Audio completo');
        this.setText('volume', 'Volume');
        this.setText('securityError', 'Errore di Sicurezza');
        this.setText('about', 'Circa Muses Radio Player ...');
        this.setText('version', 'Versione')
    };
    Ba.__name__ = !0;
    Ba.__super__ = f;
    Ba.prototype = l(f.prototype, {
        __class__: Ba
    });
    var Xa = function () {
    };
    Xa.__name__ = !0;
    Xa.factory = function (a) {
        if (null == a || 'auto' == a) a = window.navigator.language,
            null != a && (a = a.split('-') [0]);
        switch (a) {
            case 'es':
            return new ga;
            case 'sp':
            return new ga;
            case 'it':
            return new Ba;
            case 'ga':
            return new Aa;
            case 'fr':
            return new xa;
            case 'ger':
            return new ea;
            case 'de':
            return new ea;
            case 'nb':
            return new Z;
            case 'nn':
            return new Z;
            case 'nw':
            return new Z;
            case 'pt':
            return new Ca;
            case 'tr':
            return new Da;
            case 'uk':
            return new Ea;
            case 'ru':
            return new Fa;
            case 'nl':
            return new ua;
            case 'hu':
            return new za;
            case 'pl':
            return new Ga;
            case 'hr':
            return new sa;
            case 'fi':
            return new wa;
            case 'el':
            return new ya;
            case 'bg':
            return new qa;
            case 'sv':
            return new Ha;
            case 'sl':
            return new Ia;
            case 'hy':
            return new pa;
            case 'tt':
            return new Ja;
            case 'cs':
            return new ta;
            case 'zh':
            return new ra;
            case 'he':
            return new fa;
            case 'iw':
            return new fa
        }
        return new va
    };
    var Z = function () {
        this.byText = new n;
        this.setText('play', 'Spill av');
        this.setText('stop', 'Stopp');
        this.setText('ioError', 'Nettverksfeil');
        this.setText('loadComplete', 'Feil: Lasting fullført');
        this.setText('soundComplete', 'Feil: Lyd fullført');
        this.setText('volume', 'Volum');
        this.setText('securityError', 'Sikkerhetsfeil');
        this.setText('about', 'Om Muses Radio Player...');
        this.setText('version', 'Versjon')
    };
    Z.__name__ = !0;
    Z.__super__ = f;
    Z.prototype = l(f.prototype, {
        __class__: Z
    });
    var Ga = function () {
        this.byText = new n;
        this.setText('play', 'Odtwórz');
        this.setText('stop', 'Stop');
        this.setText('ioError', 'Błąd sieciowy');
        this.setText('loadComplete', 'Błąd: Ładowanie zakończone');
        this.setText('soundComplete', 'Błąd: Ładowanie audio zakończone');
        this.setText('volume', 'Głośność');
        this.setText('securityError', 'Błąd zabezpieczeń');
        this.setText('about', 'O Muses Radio Player...');
        this.setText('version', 'Wersja')
    };
    Ga.__name__ = !0;
    Ga.__super__ = f;
    Ga.prototype = l(f.prototype, {
        __class__: Ga
    });
    var Ca = function () {
        this.byText = new n;
        this.setText('play', 'Tocar');
        this.setText('stop', 'Parar');
        this.setText('ioError', 'Erro de Rede');
        this.setText('loadComplete', 'Erro: terminou de carregar');
        this.setText('soundComplete', 'Erro: fim do áudio');
        this.setText('volume', 'Volume');
        this.setText('securityError', 'Erro de Segurança');
        this.setText('about', 'Sobre Muses Radio Player...');
        this.setText('version', 'Versão')
    };
    Ca.__name__ = !0;
    Ca.__super__ = f;
    Ca.prototype = l(f.prototype, {
        __class__: Ca
    });
    var Fa = function () {
        this.byText = new n;
        this.setText('play', 'Воспроизвести');
        this.setText('stop', 'Остановить');
        this.setText('ioError', 'Ошибка подключения');
        this.setText('loadComplete', 'Ошибка: Загрузка завершена');
        this.setText('soundComplete', 'Ошибка: Ошибка воспроизведения');
        this.setText('volume', 'Уровень звука');
        this.setText('securityError', 'Использование запрещено');
        this.setText('about', 'Подробнее о Muses Radio Player...');
        this.setText('version', 'Версия')
    };
    Fa.__name__ = !0;
    Fa.__super__ = f;
    Fa.prototype = l(f.prototype, {
        __class__: Fa
    });
    var Ia = function () {
        this.byText = new n;
        this.setText('play', 'Predvajaj');
        this.setText('stop', 'Stop');
        this.setText('ioError', 'Omrežna napaka');
        this.setText('loadComplete', 'Napaka: Nalaganje končano');
        this.setText('soundComplete', 'Napaka: Ni zvoka');
        this.setText('volume', 'Glasnost');
        this.setText('securityError', 'Varnostna napaka');
        this.setText('about', 'O Muses Radio Player...');
        this.setText('version', 'Verzija');
        this.setText('intro', 'Uvod')
    };
    Ia.__name__ = !0;
    Ia.__super__ = f;
    Ia.prototype = l(f.prototype, {
        __class__: Ia
    });
    var ga = function () {
        this.byText = new n;
        this.setText('play', 'Reproducir');
        this.setText('stop', 'Detener');
        this.setText('ioError', 'Error de Red');
        this.setText('loadComplete', 'Error: Carga completa');
        this.setText('soundComplete', 'Error: Sonido completo');
        this.setText('volume', 'Volumen');
        this.setText('securityError', 'Error de Seguridad');
        this.setText('about', 'Acerca de Muses Radio Player...');
        this.setText('version', 'Versión');
        this.setText('intro', 'Intro')
    };
    ga.__name__ = !0;
    ga.__super__ = f;
    ga.prototype = l(f.prototype, {
        __class__: ga
    });
    var Ha = function () {
        this.byText = new n;
        this.setText('play', 'Spelar');
        this.setText('stop', 'Stoppad');
        this.setText('ioError', 'Nätverksfel');
        this.setText('loadComplete', 'Fel: Laddning komplett');
        this.setText('soundComplete', 'Fel: Ljud komplett');
        this.setText('volume', 'Volym');
        this.setText('securityError', 'Säkerhetsfel');
        this.setText('about', 'Om Muses Radio Player...');
        this.setText('version', 'Version');
        this.setText('intro', 'Intro')
    };
    Ha.__name__ = !0;
    Ha.__super__ = f;
    Ha.prototype = l(f.prototype, {
        __class__: Ha
    });
    var Ja = function () {
        this.byText = new n;
        this.setText('play', 'Уйнату');
        this.setText('stop', 'Туктату');
        this.setText('intro', 'Интро');
        this.setText('ioError', 'Челтәр Хатасы');
        this.setText('loadComplete', 'Хата: Йөкләү тәмам');
        this.setText('soundComplete', 'Хата: Тавыш тәмам');
        this.setText('volume', 'Тавыш');
        this.setText('securityError', 'Куркынычсызлык хатасы');
        this.setText('about', 'Muses Radio Player Турында...');
        this.setText('version', 'Версия')
    };
    Ja.__name__ = !0;
    Ja.__super__ = f;
    Ja.prototype = l(f.prototype, {
        __class__: Ja
    });
    var Da = function () {
        this.byText = new n;
        this.setText('play', 'Çal');
        this.setText('stop', 'Durdur');
        this.setText('ioError', 'Ağ hatası');
        this.setText('loadComplete', 'Hata: Yüklenme Tamamlandı');
        this.setText('soundComplete', 'Hata: Yayın Tamamlandı');
        this.setText('volume', 'Ses');
        this.setText('securityError', 'Güvenlik Hatası');
        this.setText('about', 'Muses Radio Player Hakkında...');
        this.setText('version', 'Sürüm')
    };
    Da.__name__ = !0;
    Da.__super__ = f;
    Da.prototype = l(f.prototype, {
        __class__: Da
    });
    var Ea = function () {
        this.byText = new n;
        this.setText('play', 'Відтворити');
        this.setText('stop', 'Зупинити');
        this.setText('ioError', 'Помилка мережі');
        this.setText('loadComplete', 'Помилка: Завантаження завершено');
        this.setText('soundComplete', 'Помилка: Звук завершено');
        this.setText('volume', 'гучність');
        this.setText('securityError', 'Помилка доступу');
        this.setText('about', 'Про Muses Radio Player...');
        this.setText('version', 'Версія');
        this.setText('intro', 'Вступне вітання')
    };
    Ea.__name__ = !0;
    Ea.__super__ = f;
    Ea.prototype = l(f.prototype, {
        __class__: Ea
    });
    var D = function (a) {
        this.styleWidth = this.styleHeight = 0;
        this.ui = a;
        this.configured = !1;
        this.container = window.document.createElement('div');
        this.container.style.position = 'absolute'
    };
    D.__name__ = !0;
    D.prototype = {
        container: null,
        configured: null,
        ui: null,
        styleWidth: null,
        styleHeight: null,
        setVisible: function (a) {
            this.container.style.display = a ? 'block' : 'none'
        },
        configure: function (a) {
            this.configured = !0;
            this.container.style.left = C.parseInt(a.get('x'), 0) + 'px';
            this.container.style.top = C.parseInt(a.get('y'), 0) + 'px';
            this.styleWidth = C.parseInt(a.get('width'), 0);
            this.styleHeight = C.parseInt(a.get('height'), 0);
            null != a.get('width') && (this.container.style.width = this.styleWidth + 'px');
            null != a.get('height') && (this.container.style.height = this.styleHeight + 'px')
        },
        appendChild: function (a, b) {
            null == b && (b = !0);
            a.style.position = 'absolute';
            a.style.left = a.style.top = '0px';
            a.style.display = b ? 'block' : 'none';
            this.container.appendChild(a)
        },
        __class__: D
    };
    var da = function (a, b) {
        var c = this;
        D.call(this, a);
        this.mouseOverState = new Image;
        this.mouseDownState = new Image;
        this.noMouseState = new Image;
        this.container.title = b;
        this.mouseDownState.style.opacity = '0';
        this.mouseOverState.style.opacity = '0';
        this.container.onmouseup = function (a) {
            c.mouseDownState.style.opacity = '0';
            c.mouseOverState.style.opacity = '1'
        };
        this.container.onmousedown = function (a) {
            c.mouseDownState.style.opacity = '1';
            c.mouseOverState.style.opacity = '0'
        };
        this.container.onmouseover = function (a) {
            c.mouseOverState.style.opacity = '1'
        };
        this.container.onmouseout = function (a) {
            c.mouseDownState.style.opacity = '0';
            c.mouseOverState.style.opacity = '0'
        }
    };
    da.__name__ = !0;
    da.__super__ = D;
    da.prototype = l(D.prototype, {
        mouseOverState: null,
        mouseDownState: null,
        noMouseState: null,
        configure: function (a) {
            D.prototype.configure.call(this, a);
            null != a.get('bgimage') && (this.ui.loadImage(this.noMouseState, a.get('bgimage')), this.noMouseState.style.cursor = 'pointer', this.appendChild(this.noMouseState));
            null != a.get('clickimage') && (this.ui.loadImage(this.mouseDownState, a.get('clickimage')), this.mouseDownState.style.cursor = 'pointer', this.appendChild(this.mouseDownState));
            this.ui.loadImage(this.mouseOverState, a.get('image'));
            this.appendChild(this.mouseOverState);
            this.mouseOverState.style.cursor = 'pointer'
        },
        __class__: da
    });
    var na = function (a) {
        D.call(this, a);
        this.playMC = new Image;
        this.stopMC = new Image
    };
    na.__name__ = !0;
    na.__super__ = D;
    na.prototype = l(D.prototype, {
        playMC: null,
        stopMC: null,
        configure: function (a) {
            D.prototype.configure.call(this, a);
            null != a.get('imageplay') && - 1 == a.get('imageplay').indexOf('.swf') && (this.ui.loadImage(this.playMC, a.get('imageplay')), this.appendChild(this.playMC, !1));
            null != a.get('imagestop') && - 1 == a.get('imagestop').indexOf('.swf') && (this.ui.loadImage(this.stopMC, a.get('imagestop')), this.appendChild(this.stopMC, !0))
        },
        on: function () {
            this.playMC.style.display = 'block';
            this.stopMC.style.display = 'none'
        },
        off: function () {
            this.playMC.style.display = 'none';
            this.stopMC.style.display = 'block'
        },
        __class__: na
    });
    var Y = function (a) {
        this.innerDIV = null;
        this.scrollDiff = 0;
        D.call(this, a);
        this.container.style.fontFamily = 'Silkscreen';
        this.container.style.fontSize = '12px';
        this.innerDIV = window.document.createElement('div')
    };
    Y.__name__ = !0;
    Y.__super__ = D;
    Y.prototype = l(D.prototype, {
        scrollDiff: null,
        innerDIV: null,
        configureText: function (a, b) {
            this.configure(a);
            this.innerDIV.style.fontFamily = a.get('font');
            this.innerDIV.style.fontSize = C.parseInt(a.get('size'), 12) + 'px';
            this.innerDIV.style.color = a.get('color');
            this.innerDIV.style.whiteSpace = 'nowrap';
            this.innerDIV.style.padding = '2px';
            this.innerDIV.addEventListener('transitionend', u(this, this.scroll));
            switch (a.get('align')) {
                case 'center':
                this.innerDIV.style.textAlign = 'center';
                break;
                case 'right':
                this.innerDIV.style.textAlign = 'right';
                break;
                default:
                this.innerDIV.style.textAlign = b
            }
            this.container.style.overflow = 'hidden';
            this.container.style.transition = 'opacity 300ms';
            this.container.style.opacity = '0';
            this.container.appendChild(this.innerDIV)
        },
        setText: function (a) {
            if ('' == a) this.container.style.opacity = '0';
            else {
                this.container.style.opacity = '1';
                var b = a + ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' + a;
                this.innerDIV.innerHTML != a && this.innerDIV.innerHTML != b && (this.innerDIV.innerHTML = a, this.disableScrolling(), this.container.scrollWidth - 6 > this.styleWidth && (this.scrollDiff = this.container.scrollWidth, this.innerDIV.innerHTML = b, this.scrollDiff -=
                    this.container.scrollWidth, this.scroll()))
            }
        },
        scroll: function () {
            var a = this;
            this.innerDIV.style.transition = '';
            this.innerDIV.style.transitionDelay = '';
            this.innerDIV.style.transform = 'translate(0px , 0px)';
            N.delay(function () {
                0 != a.scrollDiff && (a.innerDIV.style.transition = 'transform 10000ms', a.innerDIV.style.transitionDelay = '5s', a.innerDIV.style.transform = 'translate(' + a.scrollDiff + 'px, 0px)')
            }, 1)
        },
        disableScrolling: function () {
            this.scrollDiff = 0;
            this.innerDIV.style.transition = '';
            this.innerDIV.style.transitionDelay = '';
            this.innerDIV.style.transform = 'translate(0px , 0px)'
        },
        __class__: Y
    }); var oa = function (a, b) {
        D.call(this, a);
        this.muses = b;
        this.firstDraw = !0;
        this.bars = null;
        this.mousePressed = !1;
        this.volume = 1;
        this.setMode('bars');
        this.draw(this.container);
        this.vertMargin = this.horizMargin = this.height = this.width = 0;
        this.barStep = 2;
        this.barWidth = 1;
        this.barColors = this.bgColors = null
    }; oa.__name__ = !0; oa.__super__ = D; oa.prototype = l(D.prototype, {
        volume: null,
        width: null,
        height: null,
        horizMargin: null,
        horizDesp: null,
        vertMargin: null,
        vertDesp: null,
        barStep: null,
        barWidth: null,
        bgColors: null,
        barColors: null,
        bars: null,
        cover: null,
        spriteBar: null,
        firstDraw: null,
        mode: null,
        holder: null,
        mousePressed: null,
        muses: null,
        draw: function (a) {
        },
        setMode: function (a) {
            switch (a.toLowerCase()) {
                case 'bars':
                this.draw = u(this, this.drawBars);
                break;
                case 'holder':
                this.draw = u(this, this.drawHolder);
                break;
                case 'vholder':
                this.draw = u(this, this.drawVHolder)
            }
            this.mode = a
        },
        drawHolder: function (a) {
            this.holder.style.left = this.volume * (this.width - this.holder.naturalWidth) + 'px'
        },
        drawVHolder: function (a) {
            this.holder.style.top = (1 - this.volume) * (this.height - this.holder.naturalHeight) + 'px'
        },
        drawBars: function (a) {
            if (null != this.barColors && 0 != this.barStep && (a = Math.round((this.width - 2 * this.horizMargin) / this.barStep), 0 != a)) {
                var b = (this.height - 2 * this.vertMargin + 1) / a,
                c = this.height - this.vertMargin,
                d = this.horizMargin;
                if (null == this.bars) {
                    this.bars = [
                    ];
                    for (var e = 0; e < a; ) {
                        var g = e++,
                        f;
                        f = window.document.createElement('div');
                        this.bars.push(f);
                        this.appendChild(f);
                        f.style.left = Math.ceil(d + g * this.barStep) + 'px';
                        f.style.top = Math.ceil(c - g * b) + 'px';
                        f.style.width = Math.round(this.barWidth) + 'px';
                        f.style.height = Math.ceil(g * b) + 'px'
                    }
                }
                b = 0;
                for (c = Math.round(this.volume * a); b < c; ) d = b++,
                    this.bars[d].style.backgroundColor = this.barColors[0];
                for (b = Math.round(this.volume * a); b < a; ) c = b++,
                    this.bars[c].style.backgroundColor = this.barColors[1]
            }
        },
        setVolume: function (a, b) {
            null == b && (b = !1);
            this.volume != a && (this.volume = a, 1 < this.volume && (this.volume = 1), 0 > this.volume && (this.volume = 0), this.muses.setVolume(this.volume, b), this.draw(this.container))
        },
        getVolume: function () {
            return this.volume
        },
        mouseDown: function (a) {
            var b;
            this.mousePressed = !0;
            a = this.getXY(a);
            null != a && ('vholder' != this.mode ? (a = a.x, b = this.width)  : (a = this.height - a.y, b = this.height), a -= 0.06 * b, 0 > a && (a = 0), a = Math.round(1.06 * a), a > b && (a = b), this.setVolume(a / (b - 2)))
        },
        mouseUp: function (a) {
            this.mousePressed = !1
        },
        mouseMove: function (a) {
            this.mousePressed && this.mouseDown(a)
        },
        mouseWheel: function (a) {
            0 < a.deltaY ? this.setVolume(this.volume + 0.025)  : this.setVolume(this.volume - 0.025)
        },
        touchMove: function (a) {
            a.stopPropagation();
            a.preventDefault();
            var b = this.cover.getBoundingClientRect();
            this.mouseDown({
                layerX: a.changedTouches[0].clientX - b.left,
                layerY: a.changedTouches[0].clientY - b.top
            })
        },
        configure: function (a) {
            D.prototype.configure.call(this, a);
            this.width = C.parseInt(a.get('width'), 0);
            this.height = C.parseInt(a.get('height'), 0);
            this.barColors = [
            a.get('color1'),
            a.get('color2')
            ];
            this.barStep = C.parseInt(a.get('barstep'), 2);
            this.barWidth = C.parseInt(a.get('barwidth'), 1);
            var b;
            b = null != a.get('mode') ? a.get('mode').toLowerCase()  : null;
            this.setMode(b);
            if ('holder' == b || 'vholder' == b) this.holder = new Image,
                this.holder.onload = u(this, this.holderLoad),
            this.ui.loadImage(this.holder, a.get('holderimage')),
            this.appendChild(this.holder);
            this.draw(this.container);
            this.cover = window.document.createElement('div');
            this.cover.onmousedown = u(this, this.mouseDown);
            this.cover.onmousemove = u(this, this.mouseMove);
            this.cover.addEventListener('touchstart', u(this, this.touchMove));
            this.cover.addEventListener('touchmove', u(this, this.touchMove));
            this.cover.onwheel = u(this, this.mouseWheel);
            this.cover.onmouseup = u(this, this.mouseUp);
            this.cover.onmouseout = u(this, this.mouseUp);
            this.cover.style.width = this.container.style.width;
            this.cover.style.height = this.container.style.height;
            this.cover.style.cursor = 'pointer';
            this.appendChild(this.cover)
        },
        holderLoad: function (a) {
            this.holder.style.left = 0.5 * (this.width - this.holder.naturalWidth) + 'px';
            this.holder.style.top = 0.5 * (this.height - this.holder.naturalHeight) + 'px';
            this.draw(this.container)
        },
        getXY: function (a) {
            return a.offsetX || 0 == a.offsetX || a.layerX || 0 == a.layerX ? {
                x: a.offsetX,
                y: a.offsetY
            }
            : null
        },
        __class__: oa
    }); var ab = 0; Array.prototype.indexOf && (q.indexOf = function (a, b, c) {
        return Array.prototype.indexOf.call(a, b, c)
    }); String.prototype.__class__ = String; String.__name__ = !0; Array.__name__ = !0; Date.prototype.__class__ = Date; Date.__name__ = [
    'Date'
    ]; var bb = {
        __name__: [
        'Int'
        ]
    }, cb = {
        __name__: [
        'Dynamic'
        ]
    }, Ya = Number; Ya.__name__ = [
    'Float'
    ]; var Za = Boolean; Za.__ename__ = [
    'Bool'
    ]; var db = {
        __name__: [
        'Class'
        ]
    }, eb = {
    }, E = {
    }, Wa = x.ArrayBuffer || L; null == Wa.prototype.slice && (Wa.prototype.slice = L.sliceImpl); var $a = x.Uint8Array || T._new; d.objectId = 'MRPObject'; d.flashInstances = new n; d.jsInstances = new n; d.__hostPrefix = 'hosted'; d.__hostMidfix = 'muses'; g.Element = 0; g.PCData = 1; g.CData = 2; g.Comment = 3; g.DocType = 4; g.ProcessingInstruction = 5; g.Document = 6; Q.ERROR_SEVERITY_SILENCE = 0; Q.ERROR_SEVERITY_TRACE = 1; Q.ERROR_SEVERITY_EXCEPTIONS = 2; ha.REFERRER_INTERNAL = '0'; t.paused = !1; A.VERSION = '5.2.5'; S.OBJECT_KEY_NUM = 1; S.TYPE_KEY_NUM = 2; S.LABEL_KEY_NUM = 3; S.VALUE_VALUE_NUM = 1; v.TYPE_EVENT = 'event'; v.TYPE_TRANSACTION = 'tran'; v.TYPE_ITEM = 'item'; v.TYPE_SOCIAL = 'social'; v.TYPE_CUSTOMVARIABLE = 'var'; v.X10_CUSTOMVAR_NAME_PROJECT_ID = '8'; v.X10_CUSTOMVAR_VALUE_PROJECT_ID = '9'; v.X10_CUSTOMVAR_SCOPE_PROJECT_ID = '11'; v.CAMPAIGN_DELIMITER = '|'; ba.X10_EVENT_PROJECT_ID = '5'; new Qa(0, 0); P.escapes = function (a) {
        a = new n;
        null != E.lt ? a.setReserved('lt', '<')  : a.h.lt = '<';
        null != E.gt ? a.setReserved('gt', '>')  : a.h.gt = '>';
        null != E.amp ? a.setReserved('amp', '&')  : a.h.amp = '&';
        null != E.quot ? a.setReserved('quot', '"')  : a.h.quot = '"';
        null != E.apos ? a.setReserved('apos', '\'')  : a.h.apos = '\'';
        return a
    }(this);
    z.__toStr = {
    }.toString; T.BYTES_PER_ELEMENT = 1; r.displaying = !1; G.VERSION = '2.1 (html5)'; G.instances = [
    ]; U.enabled = !0; d.main()
}) ('undefined' != typeof console ? console : {
    log: function () {
    }
}, 'undefined' != typeof window ? window : exports, 'undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this);
if ('undefined' == typeof musesCallback) var musesCallback = function (e, f) {
};
if ('undefined' == typeof musesPlayerCounter) {
    var musesPlayerCounter = 0,
    mrpStyleReset = null;
    mrpBrowserCompat = {
    };
    (function () {
        var e = function () {
            var e = navigator.userAgent.toLowerCase(),
            x = - 1 != e.indexOf('msie') ? parseInt(e.split('msie') [1])  : - 1;
            return - 1 == x && 0 < e.indexOf('trident/7.0') ? 11 : x
        };
        mrpBrowserCompat.isIE = e();
        0 < e() && 11 > e() || (e = document.createElement('audio'), mrpBrowserCompat.aac = !(!e.canPlayType || !e.canPlayType('audio/mp4;').replace(/no/, '')), mrpBrowserCompat.mp3 = !(!e.canPlayType || !e.canPlayType('audio/mpeg;').replace(/no/, '')), mrpBrowserCompat.ogg = !(!e.canPlayType || !e.canPlayType('audio/ogg;').replace(/no/, '')))
    }) ()
}
var FlashDetect = new function () {
    var e = this;
    e.installed = !1;
    e.raw = '';
    e.major = - 1;
    e.minor = - 1;
    e.revision = - 1;
    e.revisionStr = '';
    var f = [
    {
        name: 'ShockwaveFlash.ShockwaveFlash.7',
        version: function (e) {
            return x(e)
        }
    },
    {
        name: 'ShockwaveFlash.ShockwaveFlash.6',
        version: function (e) {
            var f = '6,0,21';
            try {
                e.AllowScriptAccess = 'always',
                f = x(e)
            } catch (u) {
            }
            return f
        }
    },
    {
        name: 'ShockwaveFlash.ShockwaveFlash',
        version: function (e) {
            return x(e)
        }
    }
    ],
    x = function (e) {
        var f = - 1;
        try {
            f = e.GetVariable('$version')
        } catch (u) {
        }
        return f
    };
    e.majorAtLeast = function (f) {
        return e.major >=
        f
    };
    e.minorAtLeast = function (f) {
        return e.minor >= f
    };
    e.revisionAtLeast = function (f) {
        return e.revision >= f
    };
    e.versionAtLeast = function (f) {
        var l = [
        e.major,
        e.minor,
        e.revision
        ],
        u = Math.min(l.length, arguments.length);
        for (i = 0; i < u; i++) if (l[i] >= arguments[i]) {
            if (!(i + 1 < u && l[i] == arguments[i])) return !0
        } else return !1
};
e.FlashDetect = function () {
    var l,
    x,
    u,
    F,
    M;
    if (navigator.plugins && 0 < navigator.plugins.length) {
        var q = navigator.mimeTypes;
        if (q && q['application/x-shockwave-flash'] && q['application/x-shockwave-flash'].enabledPlugin && q['application/x-shockwave-flash'].enabledPlugin.description) {
            l = q = q['application/x-shockwave-flash'].enabledPlugin.description;
            var q = l.split(/ +/),
            K = q[2].split(/\./),
            q = q[3];
            x = parseInt(K[0], 10);
            u = parseInt(K[1], 10);
            F = q;
            M = parseInt(q.replace(/[a-zA-Z]/g, ''), 10) || e.revision;
            e.raw = l;
            e.major = x;
            e.minor = u;
            e.revisionStr = F;
            e.revision = M;
            e.installed = !0
        }
    } else if ( - 1 == navigator.appVersion.indexOf('Mac') && window.execScript) for (q = - 1, K = 0; K < f.length && - 1 == q; K++) {
        l = - 1;
        try {
            l = new ActiveXObject(f[K].name)
        } catch (aa) {
            l = {
                activeXError: !0
            }
        }
        l.activeXError || (e.installed = !0, q = f[K].version(l), - 1 != q && (l = q, F = l.split(','), x = parseInt(F[0].split(' ') [1], 10), u = parseInt(F[1], 10), M = parseInt(F[2], 10), F = F[2], e.raw = l, e.major = x, e.minor = u, e.revision = M, e.revisionStr = F))
    }
}()
};
FlashDetect.JS_RELEASE = '1.0.4';
