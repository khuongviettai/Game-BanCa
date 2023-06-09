(function (b) {
  function a(a, c, b) {
    for (
      var d = a.length, i = c.length, j, k, p, q, o, l = { x: 0, y: 0 }, m = 0;
      m < d;
      m++
    ) {
      j = a[m];
      k = a[m < d - 1 ? m + 1 : 0];
      l.x = j.x - k.x;
      l.y = k.y - j.y;
      j = Math.sqrt(l.x * l.x + l.y * l.y);
      l.x /= j;
      l.y /= j;
      j = k = a[0].x * l.x + a[0].y * l.y;
      for (var n = 1; n < d; n++)
        (o = a[n].x * l.x + a[n].y * l.y), o > k ? (k = o) : o < j && (j = o);
      p = q = c[0].x * l.x + c[0].y * l.y;
      for (n = 1; n < i; n++)
        (o = c[n].x * l.x + c[n].y * l.y), o > q ? (q = o) : o < p && (p = o);
      j < p ? ((j = p - k), (l.x = -l.x), (l.y = -l.y)) : (j -= q);
      if (j >= 0) return !1;
      else if (j > b.overlap)
        (b.overlap = j), (b.normal.x = l.x), (b.normal.y = l.y);
    }
    return b;
  }
  var c = (b.Quark = b.Quark || { version: "1.0.0", global: b }),
    d = function () {};
  c.inherit = function (a, c) {
    d.prototype = c.prototype;
    a.superClass = c.prototype;
    a.prototype = new d();
    a.prototype.constructor = a;
  };
  c.merge = function (a, c, b) {
    for (var d in c)
      if (!b || a.hasOwnProperty(d) || a[d] !== void 0) a[d] = c[d];
    return a;
  };
  c.delegate = function (a, c) {
    var d = c || b;
    if (arguments.length > 2) {
      var g = Array.prototype.slice.call(arguments, 2);
      return function () {
        var c = Array.prototype.concat.apply(g, arguments);
        return a.apply(d, c);
      };
    } else
      return function () {
        return a.apply(d, arguments);
      };
  };
  c.getDOM = function (a) {
    return document.getElementById(a);
  };
  c.createDOM = function (a, c) {
    var b = document.createElement(a),
      d;
    for (d in c) {
      var i = c[d];
      if (d == "style") for (var j in i) b.style[j] = i[j];
      else b[d] = i;
    }
    return b;
  };
  c.use = function (a) {
    for (var a = a.split("."), c = b, d = 0; d < a.length; d++)
      var g = a[d], c = c[g] || (c[g] = {});
    return c;
  };
  (function (a) {
    var c = (a.ua = navigator.userAgent);
    a.isWebKit = /webkit/i.test(c);
    a.isMozilla = /mozilla/i.test(c);
    a.isIE = /msie/i.test(c);
    a.isFirefox = /firefox/i.test(c);
    a.isChrome = /chrome/i.test(c);
    a.isSafari = /safari/i.test(c) && !this.isChrome;
    a.isMobile = /mobile/i.test(c);
    a.isOpera = /opera/i.test(c);
    a.isIOS = /ios/i.test(c);
    a.isIpad = /ipad/i.test(c);
    a.isIpod = /ipod/i.test(c);
    a.isIphone = /iphone/i.test(c) && !this.isIpod;
    a.isAndroid = /android/i.test(c);
    a.supportStorage = "localStorage" in b;
    a.supportOrientation = "orientation" in b;
    a.supportDeviceMotion = "ondevicemotion" in b;
    a.supportTouch = "ontouchstart" in b;
    a.cssPrefix = a.isWebKit
      ? "webkit"
      : a.isFirefox
      ? "Moz"
      : a.isOpera
      ? "O"
      : a.isIE
      ? "ms"
      : "";
  })(c);
  c.getElementOffset = function (a) {
    for (
      var c = a.offsetLeft, b = a.offsetTop;
      (a = a.offsetParent) && a != document.body && a != document;

    )
      (c += a.offsetLeft), (b += a.offsetTop);
    return { left: c, top: b };
  };
  c.createDOMDrawable = function (a, b) {
    var d = a.tagName || "div",
      g = b.image,
      i = a.width || (g && g.width),
      j = a.height || (g && g.height),
      k = c.createDOM(d);
    if (a.id) k.id = a.id;
    k.style.position = "absolute";
    k.style.left = (a.left || 0) + "px";
    k.style.top = (a.top || 0) + "px";
    k.style.width = i + "px";
    k.style.height = j + "px";
    if (d == "canvas")
      (k.width = i),
        (k.height = j),
        g &&
          ((d = k.getContext("2d")),
          (i = b.rect || [0, 0, i, j]),
          d.drawImage(
            g,
            i[0],
            i[1],
            i[2],
            i[3],
            a.x || 0,
            a.y || 0,
            a.width || i[2],
            a.height || i[3]
          ));
    else if (
      ((k.style.opacity = a.alpha != void 0 ? a.alpha : 1),
      (k.style.overflow = "hidden"),
      g && g.src)
    )
      (k.style.backgroundImage = "url(" + g.src + ")"),
        (k.style.backgroundPosition =
          -(a.rectX || 0) + "px " + -(a.rectY || 0) + "px");
    return k;
  };
  c.DEG_TO_RAD = Math.PI / 180;
  c.RAD_TO_DEG = 180 / Math.PI;
  c.hitTestPoint = function (a, c, b, d) {
    var a = a.getBounds(),
      i = a.length,
      j = c >= a.x && c <= a.x + a.width && b >= a.y && b <= a.y + a.height;
    if (j && d) {
      for (var d = 0, j = !1, k, p, q, o, l = 0; l < i; l++) {
        var m = a[l],
          n = a[(l + 1) % i];
        if (
          m.y == n.y &&
          b == m.y &&
          (m.x > n.x ? ((k = n.x), (p = m.x)) : ((k = m.x), (p = n.x)),
          c >= k && c <= p)
        ) {
          j = !0;
          continue;
        }
        m.y > n.y ? ((q = n.y), (o = m.y)) : ((q = m.y), (o = n.y));
        b < q ||
          b > o ||
          ((m = ((b - m.y) * (n.x - m.x)) / (n.y - m.y) + m.x),
          m > c ? d++ : m == c && (j = !0));
      }
      if (j) return 0;
      else if (d % 2 == 1) return 1;
      return -1;
    }
    return j ? 1 : -1;
  };
  c.hitTestObject = function (a, b, d) {
    a = a.getBounds();
    b = b.getBounds();
    return (a =
      a.x <= b.x + b.width &&
      b.x <= a.x + a.width &&
      a.y <= b.y + b.height &&
      b.y <= a.y + a.height) && d
      ? ((a = c.polygonCollision(b, b)), a !== !1)
      : a;
  };
  c.polygonCollision = function (c, b) {
    var d = a(c, b, { overlap: -Infinity, normal: { x: 0, y: 0 } });
    return d ? a(b, c, d) : !1;
  };
  c.toString = function () {
    return "Quark";
  };
  c.trace = function () {
    var a = Array.prototype.slice.call(arguments);
    typeof console != "undefined" &&
      typeof console.log != "undefined" &&
      console.log(a.join(" "));
  };
  if (b.Q == void 0) b.Q = c;
  if (b.trace == void 0) b.trace = c.trace;
})(window);
(function () {
  var b = (Quark.Matrix = function (a, c, b, e, f, h) {
    this.a = a;
    this.b = c;
    this.c = b;
    this.d = e;
    this.tx = f;
    this.ty = h;
  });
  b.prototype.concat = function (a) {
    var c = this.a,
      b = this.c,
      e = this.tx;
    this.a = c * a.a + this.b * a.c;
    this.b = c * a.b + this.b * a.d;
    this.c = b * a.a + this.d * a.c;
    this.d = b * a.b + this.d * a.d;
    this.tx = e * a.a + this.ty * a.c + a.tx;
    this.ty = e * a.b + this.ty * a.d + a.ty;
    return this;
  };
  b.prototype.rotate = function (a) {
    var c = Math.cos(a),
      a = Math.sin(a),
      b = this.a,
      e = this.c,
      f = this.tx;
    this.a = b * c - this.b * a;
    this.b = b * a + this.b * c;
    this.c = e * c - this.d * a;
    this.d = e * a + this.d * c;
    this.tx = f * c - this.ty * a;
    this.ty = f * a + this.ty * c;
    return this;
  };
  b.prototype.scale = function (a, c) {
    this.a *= a;
    this.d *= c;
    this.tx *= a;
    this.ty *= c;
    return this;
  };
  b.prototype.translate = function (a, c) {
    this.tx += a;
    this.ty += c;
    return this;
  };
  b.prototype.identity = function () {
    this.a = this.d = 1;
    this.b = this.c = this.tx = this.ty = 0;
    return this;
  };
  b.prototype.invert = function () {
    var a = this.a,
      c = this.b,
      b = this.c,
      e = this.d,
      f = this.tx,
      h = a * e - c * b;
    this.a = e / h;
    this.b = -c / h;
    this.c = -b / h;
    this.d = a / h;
    this.tx = (b * this.ty - e * f) / h;
    this.ty = -(a * this.ty - c * f) / h;
    return this;
  };
  b.prototype.transformPoint = function (a, c, b) {
    var e = a.x * this.a + a.y * this.c + this.tx,
      f = a.x * this.b + a.y * this.d + this.ty;
    c && ((e = (e + 0.5) >> 0), (f = (f + 0.5) >> 0));
    if (b) return { x: e, y: f };
    a.x = e;
    a.y = f;
    return a;
  };
  b.prototype.clone = function () {
    return new b(this.a, this.b, this.c, this.d, this.tx, this.ty);
  };
  b.prototype.toString = function () {
    return (
      "(a=" +
      this.a +
      ", b=" +
      this.b +
      ", c=" +
      this.c +
      ", d=" +
      this.d +
      ", tx=" +
      this.tx +
      ", ty=" +
      this.ty +
      ")"
    );
  };
})();
(function () {
  var b = (Quark.Rectangle = function (a, c, b, e) {
    this.x = a;
    this.y = c;
    this.width = b;
    this.height = e;
  });
  b.prototype.intersects = function (a) {
    return (
      this.x <= a.x + a.width &&
      a.x <= this.x + this.width &&
      this.y <= a.y + a.height &&
      a.y <= this.y + this.height
    );
  };
  b.prototype.intersection = function (a) {
    var c = Math.max(this.x, a.x),
      d = Math.min(this.x + this.width, a.x + a.width);
    if (c <= d) {
      var e = Math.max(this.y, a.y),
        a = Math.min(this.y + this.height, a.y + a.height);
      if (e <= a) return new b(c, e, d - c, a - e);
    }
    return null;
  };
  b.prototype.union = function (a, c) {
    var d = Math.min(this.x, a.x),
      e = Math.min(this.y, a.y),
      f = Math.max(this.x + this.width, a.x + a.width) - d,
      h = Math.max(this.y + this.height, a.y + a.height) - e;
    if (c) return new b(d, e, f, h);
    else (this.x = d), (this.y = e), (this.width = f), (this.height = h);
  };
  b.prototype.containsPoint = function (a, c) {
    return (
      this.x <= a &&
      a <= this.x + this.width &&
      this.y <= c &&
      c <= this.y + this.height
    );
  };
  b.prototype.clone = function () {
    return new b(this.x, this.y, this.width, this.height);
  };
  b.prototype.toString = function () {
    return (
      "(x=" +
      this.x +
      ", y=" +
      this.y +
      ", width=" +
      this.width +
      ", height=" +
      this.height +
      ")"
    );
  };
})();
(function () {
  Quark.KEY = {
    MOUSE_LEFT: 1,
    MOUSE_MID: 2,
    MOUSE_RIGHT: 3,
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    RETURN: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    CONTEXT_MENU: 93,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
  };
})();
(function () {
  var b = (Quark.EventManager = function () {
    this.keyState = {};
    this._evtHandlers = {};
  });
  b.prototype.registerStage = function (a, c, b, e) {
    this.register(a.context.canvas, c, { host: a, func: a._onEvent }, b, e);
  };
  b.prototype.unregisterStage = function (a, c) {
    this.unregister(a.context.canvas, c, a.onEvent);
  };
  b.prototype.register = function (a, c, b, e, f) {
    if (b == null || typeof b == "function") b = { host: null, func: b };
    for (
      var h = { prevent: e, stop: f },
        g = this,
        e = function (a) {
          g._onEvent(a, h, b);
        },
        f = 0;
      f < c.length;
      f++
    ) {
      for (
        var i = c[f],
          j = this._evtHandlers[i] || (this._evtHandlers[i] = []),
          k = 0,
          p = !1;
        k < j.length;
        k++
      ) {
        var q = j[k];
        if (q.target == a && q.callback.func == b.func) {
          trace("duplicate callback");
          p = !0;
          break;
        }
      }
      p ||
        (j.push({ target: a, callback: b, handler: e }),
        a.addEventListener(i, e, !1));
    }
  };
  b.prototype.unregister = function (a, c, b) {
    for (var e = 0; e < c.length; e++)
      for (var f = c[e], h = this._evtHandlers[f], g = 0; g < h.length; g++) {
        var i = h[g];
        if (i.target == a && (i.callback.func == b || b == null)) {
          a.removeEventListener(f, i.handler);
          h.splice(g, 1);
          break;
        }
      }
  };
  b.prototype._onEvent = function (a, c, d) {
    var e = a,
      f = a.type;
    if (a.type.indexOf("touch") == 0)
      (e =
        a.touches && a.touches.length > 0
          ? a.touches[0]
          : a.changedTouches && a.changedTouches.length > 0
          ? a.changedTouches[0]
          : a),
        (e.type = f);
    if (f == "keydown" || f == "keyup" || f == "keypress")
      this.keyState[a.keyCode] = f;
    d.func != null && d.func.call(d.host, e);
    b.stop(a, !c.prevent, !c.stop);
  };
  b.stop = function (a, c, b) {
    c || a.preventDefault();
    b ||
      (a.stopPropagation(),
      a.stopImmediatePropagation && a.stopImmediatePropagation());
  };
})();
(function () {
  var b = (Quark.EventDispatcher = function () {
    this._eventMap = {};
  });
  b.prototype.addEventListener = function (a, c) {
    var b = this._eventMap[a];
    b == null && (b = this._eventMap[a] = []);
    return b.indexOf(c) == -1 ? (b.push(c), !0) : !1;
  };
  b.prototype.removeEventListener = function (a, c) {
    var b = this._eventMap[a];
    if (b == null) return !1;
    for (var e = 0; e < b.length; e++)
      if (b[e] === c)
        return b.splice(e, 1), b.length == 0 && delete this._eventMap[a], !0;
    return !1;
  };
  b.prototype.removeEventListenerByType = function (a) {
    return this._eventMap[a] != null ? (delete this._eventMap[a], !0) : !1;
  };
  b.prototype.removeAllEventListeners = function () {
    this._eventMap = {};
  };
  b.prototype.dispatchEvent = function (a) {
    var c = this._eventMap[a.type];
    if (c == null) return !1;
    if (!a.target) a.target = this;
    for (var c = c.slice(), b = 0; b < c.length; b++) {
      var e = c[b];
      typeof e == "function" && e.call(this, a);
    }
    return !0;
  };
  b.prototype.hasEventListener = function (a) {
    a = this._eventMap[a];
    return a != null && a.length > 0;
  };
  b.prototype.on = b.prototype.addEventListener;
  b.prototype.un = b.prototype.removeEventListener;
  b.prototype.fire = b.prototype.dispatchEvent;
})();
(function () {
  var b = (Quark.UIDUtil = { _counter: 0 });
  b.createUID = function (a) {
    var c = a.charCodeAt(a.length - 1);
    c >= 48 && c <= 57 && (a += "_");
    return a + this._counter++;
  };
  b.displayObjectToString = function (a) {
    for (var c; a != null; a = a.parent) {
      var b = a.id != null ? a.id : a.name;
      c = c == null ? b : b + "." + c;
      if (a == a.parent) break;
    }
    return c;
  };
})();
(function () {
  function b(a, c) {
    for (var d = 0; d < a.children.length; d++) {
      var g = a.children[d];
      if (g.children) b(g, c);
      else if (c != null) {
        g = g.getBounds();
        c.globalAlpha = 0.2;
        c.beginPath();
        var i = g[0];
        c.moveTo(i.x - 0.5, i.y - 0.5);
        for (var j = 1; j < g.length; j++) {
          var k = g[j];
          c.lineTo(k.x - 0.5, k.y - 0.5);
        }
        c.lineTo(i.x - 0.5, i.y - 0.5);
        c.stroke();
        c.closePath();
        c.globalAlpha = 0.5;
        c.beginPath();
        c.rect((g.x >> 0) - 0.5, (g.y >> 0) - 0.5, g.width >> 0, g.height >> 0);
        c.stroke();
        c.closePath();
      } else if (g.drawable.domDrawable)
        g.drawable.domDrawable.style.border = "1px solid #f00";
    }
  }
  Quark.getUrlParams = function () {
    var e;
    var a = {},
      c = window.location.href,
      b = c.indexOf("?");
    if (b > 0)
      for (var c = c.substring(b + 1).split("&"), b = 0, d; (d = c[b]); b++)
        (e = c[b] = d.split("=")),
          (d = e),
          (a[d[0]] = d.length > 1 ? d[1] : !0);
    return a;
  };
  var a = document.head,
    c = a.getElementsByTagName("meta"),
    d = c.length > 0 ? c[c.length - 1].nextSibling : a.childNodes[0];
  Quark.addMeta = function (c) {
    var b = document.createElement("meta"),
      h;
    for (h in c) b.setAttribute(h, c[h]);
    a.insertBefore(b, d);
  };
  Quark.toggleDebugRect = function (a) {
    a.debug = !a.debug;
    a._render = a.debug
      ? function (c) {
          c.clear != null && c.clear(0, 0, a.width, a.height);
          Quark.Stage.superClass._render.call(a, c);
          c = a.context.context;
          if (c != null)
            c.save(),
              (c.lineWidth = 1),
              (c.strokeStyle = "#f00"),
              (c.globalAlpha = 0.5);
          b(a, c);
          c != null && c.restore();
        }
      : function (c) {
          c.clear != null && c.clear(0, 0, a.width, a.height);
          Quark.Stage.superClass._render.call(a, c);
        };
  };
})();
(function () {
  var b = (Quark.Timer = function (a) {
    this.interval = a || 50;
    this.paused = !1;
    this.info = { lastTime: 0, currentTime: 0, deltaTime: 0, realDeltaTime: 0 };
    this._startTime = 0;
    this._intervalID = null;
    this._listeners = [];
  });
  b.prototype.start = function () {
    if (this._intervalID == null) {
      this._startTime = this.info.lastTime = this.info.currentTime = Date.now();
      var a = this,
        c = function () {
          a._intervalID = setTimeout(c, a.interval);
          a._run();
        };
      c();
    }
  };
  b.prototype.stop = function () {
    clearTimeout(this._intervalID);
    this._intervalID = null;
    this._startTime = 0;
  };
  b.prototype.pause = function () {
    this.paused = !0;
  };
  b.prototype.resume = function () {
    this.paused = !1;
  };
  b.prototype._run = function () {
    if (!this.paused) {
      var a = this.info,
        c = (a.currentTime = Date.now());
      a.deltaTime = a.realDeltaTime = c - a.lastTime;
      for (var b = 0, e = this._listeners.length, f, h; b < e; b++)
        (f = this._listeners[b]),
          (h = f.__runTime || 0),
          h == 0
            ? f.step(this.info)
            : c > h &&
              (f.step(this.info), this._listeners.splice(b, 1), b--, e--);
      a.lastTime = c;
    }
  };
  b.prototype.delay = function (a, c) {
    this.addListener({ step: a, __runTime: Date.now() + c });
  };
  b.prototype.addListener = function (a) {
    if (a == null || typeof a.step != "function")
      throw "Timer Error: The listener object must implement a step() method!";
    this._listeners.push(a);
  };
  b.prototype.removeListener = function (a) {
    a = this._listeners.indexOf(a);
    a > -1 && this._listeners.splice(a, 1);
  };
})();
(function () {
  var b = (Quark.ImageLoader = function (a) {
    b.superClass.constructor.call(this);
    this.loading = !1;
    this._index = -1;
    this._loaded = 0;
    this._images = {};
    this._totalSize = 0;
    this._loadHandler = Quark.delegate(this._loadHandler, this);
    this._addSource(a);
  });
  Quark.inherit(b, Quark.EventDispatcher);
  b.prototype.load = function (a) {
    this._addSource(a);
    this.loading || this._loadNext();
  };
  b.prototype._addSource = function (a) {
    if (a) {
      for (var a = a instanceof Array ? a : [a], c = 0; c < a.length; c++)
        this._totalSize += a[c].size || 0;
      this._source = this._source ? this._source.concat(a) : a;
    }
  };
  b.prototype._loadNext = function () {
    this._index++;
    if (this._index >= this._source.length)
      this.dispatchEvent({
        type: "complete",
        target: this,
        images: this._images,
      }),
        (this._source = []),
        (this.loading = !1),
        (this._index = -1);
    else {
      var a = new Image();
      a.onload = this._loadHandler;
      a.src = this._source[this._index].src;
      this.loading = !0;
    }
  };
  b.prototype._loadHandler = function (a) {
    this._loaded++;
    var c = this._source[this._index];
    c.image = a.target;
    this._images[c.id || c.src] = c;
    this.dispatchEvent({ type: "loaded", target: this, image: c });
    this._loadNext();
  };
  b.prototype.getLoaded = function () {
    return this._loaded;
  };
  b.prototype.getTotal = function () {
    return this._source.length;
  };
  b.prototype.getLoadedSize = function () {
    var a = 0,
      c;
    for (c in this._images) a += this._images[c].size || 0;
    return a;
  };
  b.prototype.getTotalSize = function () {
    return this._totalSize;
  };
})();
(function () {
  var b = (Quark.Tween = function (c, b, e) {
    this.target = c;
    this.delay = this.time = 0;
    this.reverse = this.loop = this.paused = !1;
    this.interval = 0;
    this.ease = a.Linear.EaseNone;
    this.onComplete = this.onUpdate = this.onStart = this.next = null;
    this._oldProps = {};
    this._newProps = {};
    this._deltaProps = {};
    this._lastTime = this._startTime = 0;
    this._reverseFlag = 1;
    this._frameCount = this._frameTotal = 0;
    for (var f in b) {
      var h = c[f],
        g = b[f];
      h !== void 0 &&
        typeof h == "number" &&
        typeof g == "number" &&
        ((this._oldProps[f] = h),
        (this._newProps[f] = g),
        (this._deltaProps[f] = g - h));
    }
    for (f in e) this[f] = e[f];
  });
  b.prototype.setProps = function (a, b) {
    for (var e in a) this.target[e] = this._oldProps[e] = a[e];
    for (e in b)
      (this._newProps[e] = b[e]), (this._deltaProps[e] = b[e] - this.target[e]);
  };
  b.prototype._init = function () {
    this._startTime = Date.now() + this.delay;
    if (this.interval > 0)
      this._frameTotal = Math.round(this.time / this.interval);
    b.add(this);
  };
  b.prototype.start = function () {
    this._init();
    this.paused = !1;
  };
  b.prototype.stop = function () {
    this.paused = !0;
    b.remove(this);
  };
  b.prototype.pause = function () {
    this.paused = !0;
  };
  b.prototype._update = function () {
    if (!this.paused) {
      var a = Date.now(),
        d = a - this._startTime;
      if (!(d < 0)) {
        if (this._lastTime == 0 && this.onStart != null) this.onStart(this);
        this._lastTime = a;
        a =
          this._frameTotal > 0
            ? ++this._frameCount / this._frameTotal
            : d / this.time;
        a > 1 && (a = 1);
        var d = this.ease(a),
          e;
        for (e in this._oldProps)
          this.target[e] =
            this._oldProps[e] + this._deltaProps[e] * this._reverseFlag * d;
        if (this.onUpdate != null) this.onUpdate(this, d);
        if (a >= 1) {
          if (this.reverse) {
            if (
              ((e = this._oldProps),
              (this._oldProps = this._newProps),
              (this._newProps = e),
              (this._startTime = Date.now()),
              (this._frameCount = 0),
              (this._reverseFlag *= -1),
              !this.loop)
            )
              this.reverse = !1;
          } else if (this.loop) {
            for (e in this._oldProps) this.target[e] = this._oldProps[e];
            this._startTime = Date.now();
            this._frameCount = 0;
          } else if (
            (b.remove(this),
            (e = this.next),
            e != null &&
              (e instanceof b ? ((a = e), (e = null)) : (a = e.shift()),
              a != null))
          )
            (a.next = e), a.start();
          if (this.onComplete != null) this.onComplete(this);
        }
      }
    }
  };
  b._tweens = [];
  b.step = function () {
    for (var a = this._tweens, b = a.length; --b >= 0; ) a[b]._update();
  };
  b.add = function (a) {
    this._tweens.indexOf(a) == -1 && this._tweens.push(a);
    return this;
  };
  b.remove = function (a) {
    var b = this._tweens,
      a = b.indexOf(a);
    a > -1 && b.splice(a, 1);
    return this;
  };
  b.to = function (a, d, e) {
    a = new b(a, d, e);
    a._init();
    return a;
  };
  b.from = function (a, d, e) {
    d = new b(a, d, e);
    e = d._oldProps;
    d._oldProps = d._newProps;
    d._newProps = e;
    d._reverseFlag = -1;
    for (var f in d._oldProps) a[f] = d._oldProps[f];
    d._init();
    return d;
  };
  var a = (Quark.Easing = {
    Linear: {},
    Quadratic: {},
    Cubic: {},
    Quartic: {},
    Quintic: {},
    Sinusoidal: {},
    Exponential: {},
    Circular: {},
    Elastic: {},
    Back: {},
    Bounce: {},
  });
  a.Linear.EaseNone = function (a) {
    return a;
  };
  a.Quadratic.EaseIn = function (a) {
    return a * a;
  };
  a.Quadratic.EaseOut = function (a) {
    return -a * (a - 2);
  };
  a.Quadratic.EaseInOut = function (a) {
    return (a *= 2) < 1 ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1);
  };
  a.Cubic.EaseIn = function (a) {
    return a * a * a;
  };
  a.Cubic.EaseOut = function (a) {
    return --a * a * a + 1;
  };
  a.Cubic.EaseInOut = function (a) {
    return (a *= 2) < 1 ? 0.5 * a * a * a : 0.5 * ((a -= 2) * a * a + 2);
  };
  a.Quartic.EaseIn = function (a) {
    return a * a * a * a;
  };
  a.Quartic.EaseOut = function (a) {
    return -(--a * a * a * a - 1);
  };
  a.Quartic.EaseInOut = function (a) {
    return (a *= 2) < 1
      ? 0.5 * a * a * a * a
      : -0.5 * ((a -= 2) * a * a * a - 2);
  };
  a.Quintic.EaseIn = function (a) {
    return a * a * a * a * a;
  };
  a.Quintic.EaseOut = function (a) {
    return (a -= 1) * a * a * a * a + 1;
  };
  a.Quintic.EaseInOut = function (a) {
    return (a *= 2) < 1
      ? 0.5 * a * a * a * a * a
      : 0.5 * ((a -= 2) * a * a * a * a + 2);
  };
  a.Sinusoidal.EaseIn = function (a) {
    return -Math.cos((a * Math.PI) / 2) + 1;
  };
  a.Sinusoidal.EaseOut = function (a) {
    return Math.sin((a * Math.PI) / 2);
  };
  a.Sinusoidal.EaseInOut = function (a) {
    return -0.5 * (Math.cos(Math.PI * a) - 1);
  };
  a.Exponential.EaseIn = function (a) {
    return a == 0 ? 0 : Math.pow(2, 10 * (a - 1));
  };
  a.Exponential.EaseOut = function (a) {
    return a == 1 ? 1 : -Math.pow(2, -10 * a) + 1;
  };
  a.Exponential.EaseInOut = function (a) {
    return a == 0
      ? 0
      : a == 1
      ? 1
      : (a *= 2) < 1
      ? 0.5 * Math.pow(2, 10 * (a - 1))
      : 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2);
  };
  a.Circular.EaseIn = function (a) {
    return -(Math.sqrt(1 - a * a) - 1);
  };
  a.Circular.EaseOut = function (a) {
    return Math.sqrt(1 - --a * a);
  };
  a.Circular.EaseInOut = function (a) {
    return (a /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - a * a) - 1)
      : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
  };
  a.Elastic.EaseIn = function (a) {
    var b,
      e = 0.1,
      f = 0.4;
    if (a == 0) return 0;
    else if (a == 1) return 1;
    else f || (f = 0.3);
    !e || e < 1
      ? ((e = 1), (b = f / 4))
      : (b = (f / (2 * Math.PI)) * Math.asin(1 / e));
    return -(
      e *
      Math.pow(2, 10 * (a -= 1)) *
      Math.sin(((a - b) * 2 * Math.PI) / f)
    );
  };
  a.Elastic.EaseOut = function (a) {
    var b,
      e = 0.1,
      f = 0.4;
    if (a == 0) return 0;
    else if (a == 1) return 1;
    else f || (f = 0.3);
    !e || e < 1
      ? ((e = 1), (b = f / 4))
      : (b = (f / (2 * Math.PI)) * Math.asin(1 / e));
    return e * Math.pow(2, -10 * a) * Math.sin(((a - b) * 2 * Math.PI) / f) + 1;
  };
  a.Elastic.EaseInOut = function (a) {
    var b,
      e = 0.1,
      f = 0.4;
    if (a == 0) return 0;
    else if (a == 1) return 1;
    else f || (f = 0.3);
    !e || e < 1
      ? ((e = 1), (b = f / 4))
      : (b = (f / (2 * Math.PI)) * Math.asin(1 / e));
    return (a *= 2) < 1
      ? -0.5 *
          e *
          Math.pow(2, 10 * (a -= 1)) *
          Math.sin(((a - b) * 2 * Math.PI) / f)
      : e *
          Math.pow(2, -10 * (a -= 1)) *
          Math.sin(((a - b) * 2 * Math.PI) / f) *
          0.5 +
          1;
  };
  a.Back.EaseIn = function (a) {
    return a * a * (2.70158 * a - 1.70158);
  };
  a.Back.EaseOut = function (a) {
    return (a -= 1) * a * (2.70158 * a + 1.70158) + 1;
  };
  a.Back.EaseInOut = function (a) {
    return (a *= 2) < 1
      ? 0.5 * a * a * (3.5949095 * a - 2.5949095)
      : 0.5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2);
  };
  a.Bounce.EaseIn = function (c) {
    return 1 - a.Bounce.EaseOut(1 - c);
  };
  a.Bounce.EaseOut = function (a) {
    return (a /= 1) < 1 / 2.75
      ? 7.5625 * a * a
      : a < 2 / 2.75
      ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
      : a < 2.5 / 2.75
      ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
      : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
  };
  a.Bounce.EaseInOut = function (b) {
    return b < 0.5
      ? a.Bounce.EaseIn(b * 2) * 0.5
      : a.Bounce.EaseOut(b * 2 - 1) * 0.5 + 0.5;
  };
})();
(function () {
  var b = (Quark.Audio = function (a, c, d, e) {
    b.superClass.constructor.call(this);
    this.src = a;
    this.autoPlay = c && d;
    this.loop = e;
    this._playing = this._loaded = !1;
    this._evtHandler = Quark.delegate(this._evtHandler, this);
    this._element = document.createElement("audio");
    this._element.preload = c;
    this._element.src = a;
    c && this.load();
  });
  Quark.inherit(b, Quark.EventDispatcher);
  b.prototype.load = function () {
    this._element.addEventListener("progress", this._evtHandler, !1);
    this._element.addEventListener("ended", this._evtHandler, !1);
    this._element.addEventListener("error", this._evtHandler, !1);
    try {
      this._element.load();
    } catch (a) {
      trace(a);
    }
  };
  b.prototype._evtHandler = function (a) {
    if (a.type == "progress") {
      var b = 0,
        d = 0,
        e = a.target.buffered;
      if (e && e.length > 0)
        for (b = e.length; b >= 0; b--) d = e.end(b) - e.start(b);
      if (d / a.target.duration >= 1)
        this._element.removeEventListener("progress", this._evtHandler),
          this._element.removeEventListener("error", this._evtHandler),
          (this._loaded = !0),
          this.dispatchEvent({ type: "loaded", target: this }),
          this.autoPlay && this.play();
    } else
      a.type == "ended"
        ? (this.dispatchEvent({ type: "ended", target: this }),
          this.loop ? this.play() : (this._playing = !1))
        : a.type == "error" && trace("Quark.Audio Error: " + a.target.src);
  };
  b.prototype.play = function () {
    this._loaded
      ? (this._element.play(), (this._playing = !0))
      : ((this.autoPlay = !0), this.load());
  };
  b.prototype.stop = function () {
    if (this._playing) this._element.pause(), (this._playing = !1);
  };
  b.prototype.loaded = function () {
    return this._loaded;
  };
  b.prototype.playing = function () {
    return this._playing;
  };
})();
(function () {
  var b = (Quark.Drawable = function (a, b) {
    this.domDrawable = this.rawDrawable = null;
    this.set(a, b);
  });
  b.prototype.get = function (a, b) {
    if (b == null || b.canvas.getContext != null) return this.rawDrawable;
    else {
      if (this.domDrawable == null)
        this.domDrawable = Quark.createDOMDrawable(a, {
          image: this.rawDrawable,
        });
      return this.domDrawable;
    }
  };
  b.prototype.set = function (a, b) {
    if (
      a instanceof HTMLImageElement ||
      a instanceof HTMLCanvasElement ||
      a instanceof HTMLVideoElement
    )
      this.rawDrawable = a;
    if (b === !0) this.domDrawable = a;
    else if (this.domDrawable)
      this.domDrawable.style.backgroundImage =
        "url(" + this.rawDrawable.src + ")";
  };
})();
(function () {
  var b = (Quark.DisplayObject = function (a) {
    this.id = Quark.UIDUtil.createUID("DisplayObject");
    this.name = null;
    this.height = this.width = this.regY = this.regX = this.y = this.x = 0;
    this.scaleY = this.scaleX = this.alpha = 1;
    this.rotation = 0;
    this.transformEnabled = this.eventEnabled = this.visible = !0;
    this.useHandCursor = !1;
    this.context = this.parent = this.drawable = this.polyArea = null;
    this._depth = 0;
    this._lastState = {};
    this._stateList = [
      "x",
      "y",
      "regX",
      "regY",
      "width",
      "height",
      "alpha",
      "scaleX",
      "scaleY",
      "rotation",
      "visible",
      "_depth",
    ];
    Quark.merge(this, a, !0);
    a.mixin && Quark.merge(this, a.mixin, !1);
  });
  b.prototype.setDrawable = function (a) {
    this.drawable == null
      ? (this.drawable = new Quark.Drawable(a))
      : this.drawable.rawDrawable != a && this.drawable.set(a);
  };
  b.prototype.getDrawable = function (a) {
    return this.drawable && this.drawable.get(this, a);
  };
  b.prototype._update = function (a) {
    this.update(a);
  };
  b.prototype.update = function () {};
  b.prototype._render = function (a) {
    a = this.context || a;
    !this.visible || this.alpha <= 0
      ? (a.hide != null && a.hide(this), this.saveState(["visible", "alpha"]))
      : (a.startDraw(),
        a.transform(this),
        this.render(a),
        a.endDraw(),
        this.saveState());
  };
  b.prototype.render = function (a) {
    a.draw(this, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
  };
  b.prototype._onEvent = function (a) {
    if (this.onEvent != null) this.onEvent(a);
  };
  b.prototype.onEvent = null;
  b.prototype.saveState = function (a) {
    for (
      var a = a || this._stateList, b = this._lastState, d = 0, e = a.length;
      d < e;
      d++
    ) {
      var f = a[d];
      b["last" + f] = this[f];
    }
  };
  b.prototype.getState = function (a) {
    return this._lastState["last" + a];
  };
  b.prototype.propChanged = function () {
    for (
      var a = arguments.length > 0 ? arguments : this._stateList,
        b = 0,
        d = a.length;
      b < d;
      b++
    ) {
      var e = a[b];
      if (this._lastState["last" + e] != this[e]) return !0;
    }
    return !1;
  };
  b.prototype.hitTestPoint = function (a, b, d) {
    return Quark.hitTestPoint(this, a, b, d);
  };
  b.prototype.hitTestObject = function (a, b) {
    return Quark.hitTestObject(this, a, b);
  };
  b.prototype.localToGlobal = function (a, b) {
    var d = this.getConcatenatedMatrix();
    return { x: d.tx + a, y: d.ty + b };
  };
  b.prototype.globalToLocal = function (a, b) {
    var d = this.getConcatenatedMatrix().invert();
    return { x: d.tx + a, y: d.ty + b };
  };
  b.prototype.localToTarget = function (a, b, d) {
    a = this.localToGlobal(a, b);
    return d.globalToLocal(a.x, a.y);
  };
  b.prototype.getConcatenatedMatrix = function (a) {
    var b = new Quark.Matrix(1, 0, 0, 1, 0, 0);
    if (a == this) return b;
    for (var d = this; d.parent != null && d.parent != a; d = d.parent) {
      var e = 1,
        f = 0;
      d.rotation % 360 != 0 &&
        ((f = d.rotation * Quark.DEG_TO_RAD),
        (e = Math.cos(f)),
        (f = Math.sin(f)));
      d.regX != 0 && (b.tx -= d.regX);
      d.regY != 0 && (b.ty -= d.regY);
      b.concat(
        new Quark.Matrix(
          e * d.scaleX,
          f * d.scaleX,
          -f * d.scaleY,
          e * d.scaleY,
          d.x,
          d.y
        )
      );
    }
    return b;
  };
  b.prototype.getBounds = function () {
    var a = this.width,
      b = this.height,
      d = this.getConcatenatedMatrix(),
      a = this.polyArea || [
        { x: 0, y: 0 },
        { x: a, y: 0 },
        { x: a, y: b },
        { x: 0, y: b },
      ],
      b = [],
      e = a.length,
      f,
      h,
      g,
      i,
      j;
    f = d.transformPoint(a[0], !0, !0);
    h = g = f.x;
    i = j = f.y;
    b[0] = f;
    for (var k = 1; k < e; k++) {
      f = d.transformPoint(a[k], !0, !0);
      if (h > f.x) h = f.x;
      else if (g < f.x) g = f.x;
      if (i > f.y) i = f.y;
      else if (j < f.y) j = f.y;
      b[k] = f;
    }
    b.x = h;
    b.y = i;
    b.width = g - h;
    b.height = j - i;
    return b;
  };
  b.prototype.getCurrentWidth = function () {
    return Math.abs(this.width * this.scaleX);
  };
  b.prototype.getCurrentHeight = function () {
    return Math.abs(this.height * this.scaleY);
  };
  b.prototype.getStage = function () {
    for (var a = this; a.parent; ) a = a.parent;
    return a instanceof Quark.Stage ? a : null;
  };
  b.prototype.toString = function () {
    return Quark.UIDUtil.displayObjectToString(this);
  };
})();
(function () {
  var b = (Quark.DisplayObjectContainer = function (a) {
    this.eventChildren = !0;
    this.autoSize = !1;
    a = a || {};
    b.superClass.constructor.call(this, a);
    this.id = a.id || Quark.UIDUtil.createUID("DisplayObjectContainer");
    this.setDrawable(a.drawable || a.image || null);
    this.children = [];
    if (a.children)
      for (var c = 0; c < a.children.length; c++) this.addChild(a.children[c]);
  });
  Quark.inherit(b, Quark.DisplayObject);
  b.prototype.addChildAt = function (a, b) {
    if (b < 0) b = 0;
    else if (b > this.children.length) b = this.children.length;
    var d = this.getChildIndex(a);
    if (d != -1) {
      if (d == b) return this;
      this.children.splice(d, 1);
    } else a.parent && a.parent.removeChild(a);
    this.children.splice(b, 0, a);
    a.parent = this;
    if (this.autoSize) {
      var d = new Quark.Rectangle(
          0,
          0,
          this.rectWidth || this.width,
          this.rectHeight || this.height
        ),
        e = new Quark.Rectangle(
          a.x,
          a.y,
          a.rectWidth || a.width,
          a.rectHeight || a.height
        );
      d.union(e);
      this.width = d.width;
      this.height = d.height;
    }
    return this;
  };
  b.prototype.addChild = function (a) {
    for (var b = this.children.length, d = 0; d < arguments.length; d++)
      (a = arguments[d]), this.addChildAt(a, b + d);
    return this;
  };
  b.prototype.removeChildAt = function (a) {
    if (a < 0 || a >= this.children.length) return !1;
    var b = this.children[a];
    if (b != null) this.getStage().context.remove(b), (b.parent = null);
    this.children.splice(a, 1);
    return !0;
  };
  b.prototype.removeChild = function (a) {
    return this.removeChildAt(this.children.indexOf(a));
  };
  b.prototype.removeAllChildren = function () {
    for (; this.children.length > 0; ) this.removeChildAt(0);
  };
  b.prototype.getChildAt = function (a) {
    return a < 0 || a >= this.children.length ? null : this.children[a];
  };
  b.prototype.getChildIndex = function (a) {
    return this.children.indexOf(a);
  };
  b.prototype.setChildIndex = function (a, b) {
    if (a.parent == this) {
      var d = this.children.indexOf(a);
      b != d && (this.children.splice(d, 1), this.children.splice(b, 0, a));
    }
  };
  b.prototype.swapChildren = function (a, b) {
    var d = this.getChildIndex(a),
      e = this.getChildIndex(b);
    this.children[d] = b;
    this.children[e] = a;
  };
  b.prototype.swapChildrenAt = function (a, b) {
    var d = this.getChildAt(a),
      e = this.getChildAt(b);
    this.children[a] = e;
    this.children[b] = d;
  };
  b.prototype.contains = function (a) {
    return this.getChildIndex(a) != -1;
  };
  b.prototype.getNumChildren = function () {
    return this.children.length;
  };
  b.prototype._update = function (a) {
    this.update != null && this.update(a);
    for (var b = this.children.slice(0), d = 0, e = b.length; d < e; d++) {
      var f = b[d];
      f._depth = d + 1;
      f._update(a);
    }
  };
  b.prototype.render = function (a) {
    b.superClass.render.call(this, a);
    for (var c = 0, d = this.children.length; c < d; c++)
      this.children[c]._render(a);
  };
  b.prototype.getObjectUnderPoint = function (a, b, d, e) {
    if (e) var f = [];
    for (var h = this.children.length - 1; h >= 0; h--) {
      var g = this.children[h];
      if (
        !(
          g == null ||
          (!g.eventEnabled && g.children == void 0) ||
          !g.visible ||
          g.alpha <= 0
        )
      )
        if (g.children != void 0 && g.eventChildren && g.getNumChildren() > 0) {
          var i = g.getObjectUnderPoint(a, b, d, e);
          if (i)
            if (e) i.length > 0 && (f = f.concat(i));
            else return i;
          else if (g.hitTestPoint(a, b, d) >= 0)
            if (e) f.push(g);
            else return g;
        } else if (g.hitTestPoint(a, b, d) >= 0)
          if (e) f.push(g);
          else return g;
    }
    return e ? f : null;
  };
})();
(function () {
  var b = (Quark.Stage = function (a) {
    this.stageY = this.stageX = 0;
    this.paused = !1;
    this._eventTarget = null;
    a = a || {};
    b.superClass.constructor.call(this, a);
    this.id = a.id || Quark.UIDUtil.createUID("Stage");
    if (this.context == null) throw "Quark.Stage Error: context is required.";
    this.updatePosition();
  });
  Quark.inherit(b, Quark.DisplayObjectContainer);
  b.prototype.step = function (a) {
    this.paused || (this._update(a), this._render(this.context));
  };
  b.prototype._update = function (a) {
    for (var b = this.children.slice(0), d = 0, e = b.length; d < e; d++) {
      var f = b[d];
      f._depth = d;
      f._update(a);
    }
    this.update != null && this.update(a);
  };
  b.prototype._render = function (a) {
    a.clear != null && a.clear(0, 0, this.width, this.height);
    b.superClass._render.call(this, a);
  };
  b.prototype._onEvent = function (a) {
    var b = a.pageX - this.stageX,
      d = a.pageY - this.stageY,
      e = this._eventTarget,
      f = this.getObjectUnderPoint(b, d, !0);
    a.eventX = b;
    a.eventY = d;
    if (e != null && e != f)
      (a.lastEventTarget = e),
        (b =
          a.type == "mousemove"
            ? "mouseout"
            : a.type == "touchmove"
            ? "touchout"
            : null) && e._onEvent({ type: b }),
        (this._eventTarget = null);
    if (f != null && f.eventEnabled)
      (a.eventTarget = e = this._eventTarget = f), f._onEvent(a);
    if (!Quark.supportTouch)
      this.context.canvas.style.cursor =
        e && e.useHandCursor && e.eventEnabled ? "pointer" : "";
    if (this.onEvent != null) this.onEvent(a);
  };
  b.prototype.updatePosition = function () {
    var a = Quark.getElementOffset(this.context.canvas);
    this.stageX = a.left;
    this.stageY = a.top;
  };
})();
(function () {
  var b = (Quark.Bitmap = function (a) {
    this.image = null;
    this.rectHeight = this.rectWidth = this.rectY = this.rectX = 0;
    a = a || {};
    b.superClass.constructor.call(this, a);
    this.id = a.id || Quark.UIDUtil.createUID("Bitmap");
    this.setRect(a.rect || [0, 0, this.image.width, this.image.height]);
    this.setDrawable(this.image);
    this._stateList.push("rectX", "rectY", "rectWidth", "rectHeight");
  });
  Quark.inherit(b, Quark.DisplayObject);
  b.prototype.setRect = function (a) {
    this.rectX = a[0];
    this.rectY = a[1];
    this.rectWidth = this.width = a[2];
    this.rectHeight = this.height = a[3];
  };
  b.prototype.render = function (a) {
    a.draw(
      this,
      this.rectX,
      this.rectY,
      this.rectWidth,
      this.rectHeight,
      0,
      0,
      this.width,
      this.height
    );
  };
})();
(function () {
  var b = (Quark.MovieClip = function (a) {
    this.interval = 0;
    this.useFrames = this.paused = !1;
    this.currentFrame = 0;
    this._frames = [];
    this._frameLabels = {};
    this._frameDisObj = null;
    this._displayedCount = 0;
    a = a || {};
    b.superClass.constructor.call(this, a);
    this.id = a.id || Quark.UIDUtil.createUID("MovieClip");
    a.frames && this.addFrame(a.frames);
  });
  Quark.inherit(b, Quark.Bitmap);
  b.prototype.addFrame = function (a) {
    var b = this._frames.length;
    if (a instanceof Array)
      for (var d = 0; d < a.length; d++) this.setFrame(a[d], b + d);
    else this.setFrame(a, b);
    return this;
  };
  b.prototype.setFrame = function (a, b) {
    b == void 0 || b > this._frames.length
      ? (b = this._frames.length)
      : b < 0 && (b = 0);
    this._frames[b] = a;
    a.label && (this._frameLabels[a.label] = a);
    if (a.interval == void 0) a.interval = this.interval;
    b == 0 && this.currentFrame == 0 && this.setRect(a.rect);
  };
  b.prototype.getFrame = function (a) {
    return typeof a == "number" ? this._frames[a] : this._frameLabels[a];
  };
  b.prototype.play = function () {
    this.paused = !1;
  };
  b.prototype.stop = function () {
    this.paused = !0;
  };
  b.prototype.gotoAndStop = function (a) {
    this.currentFrame = this.getFrameIndex(a);
    this.paused = !0;
  };
  b.prototype.gotoAndPlay = function (a) {
    this.currentFrame = this.getFrameIndex(a);
    this.paused = !1;
  };
  b.prototype.getFrameIndex = function (a) {
    if (typeof a == "number") return a;
    for (
      var a = this._frameLabels[a], b = this._frames, d = 0;
      d < b.length;
      d++
    )
      if (a == b[d]) return d;
    return -1;
  };
  b.prototype.nextFrame = function (a) {
    var b = this._frames[this.currentFrame];
    if (b.interval > 0)
      (a = this._displayedCount + a),
        (this._displayedCount = b.interval > a ? a : 0);
    if (b.jump >= 0 || typeof b.jump == "string")
      if (this._displayedCount == 0 || !b.interval)
        return (this.currentFrame = this.getFrameIndex(b.jump));
    return b.interval > 0 && this._displayedCount > 0
      ? this.currentFrame
      : this.currentFrame >= this._frames.length - 1
      ? (this.currentFrame = 0)
      : ++this.currentFrame;
  };
  b.prototype._update = function (a) {
    var c = this._frames[this.currentFrame];
    c.stop
      ? this.stop()
      : (this.paused || this.nextFrame(this.useFrames ? 1 : a && a.deltaTime),
        this.setRect(c.rect),
        b.superClass._update.call(this, a));
  };
  b.prototype.render = function (a) {
    var b = this._frames[this.currentFrame].rect;
    a.draw(this, b[0], b[1], b[2], b[3], 0, 0, this.width, this.height);
  };
})();
(function () {
  var b = (Quark.Button = function (a) {
    this.state = b.UP;
    this.enabled = !0;
    a = a || {};
    b.superClass.constructor.call(this, a);
    this.id = a.id || Quark.UIDUtil.createUID("Button");
    this._skin = new Quark.MovieClip({ id: "skin", image: a.image });
    this.addChild(this._skin);
    this._skin.stop();
    this.eventChildren = !1;
    if (a.useHandCursor === void 0) this.useHandCursor = !0;
    a.up && this.setUpState(a.up);
    a.over && this.setOverState(a.over);
    a.down && this.setDownState(a.down);
    a.disabled && this.setDisabledState(a.disabled);
  });
  Quark.inherit(b, Quark.DisplayObjectContainer);
  b.UP = "up";
  b.OVER = "over";
  b.DOWN = "down";
  b.DISABLED = "disabled";
  b.prototype.setUpState = function (a) {
    a.label = b.UP;
    this._skin.setFrame(a, 0);
    this.upState = a;
    return this;
  };
  b.prototype.setOverState = function (a) {
    a.label = b.OVER;
    this._skin.setFrame(a, 1);
    this.overState = a;
    return this;
  };
  b.prototype.setDownState = function (a) {
    a.label = b.DOWN;
    this._skin.setFrame(a, 2);
    this.downState = a;
    return this;
  };
  b.prototype.setDisabledState = function (a) {
    a.label = b.DISABLED;
    this._skin.setFrame(a, 3);
    this.disabledState = a;
    return this;
  };
  b.prototype.setEnabled = function (a) {
    if (this.enabled == a) return this;
    (this.eventEnabled = this.enabled = a)
      ? this.currentFrame == 3 && this._skin.gotoAndStop(b.UP)
      : this.disabledState
      ? this._skin.gotoAndStop(b.DISABLED)
      : this._skin.gotoAndStop(b.state.UP);
    return this;
  };
  b.prototype.changeState = function (a) {
    if (this.state != a) {
      this.state = a;
      switch (a) {
        case b.OVER:
        case b.DOWN:
        case b.UP:
          if (!this.enabled) this.eventEnabled = this.enabled = !0;
          this._skin.gotoAndStop(a);
          break;
        case b.DISABLED:
          this.setEnabled(!1);
      }
      return this;
    }
  };
  b.prototype._onEvent = function (a) {
    if (this.enabled) {
      switch (a.type) {
        case "mousemove":
          this.overState && this.changeState(b.OVER);
          break;
        case "mousedown":
        case "touchstart":
        case "touchmove":
          this.downState && this.changeState(b.DOWN);
          break;
        case "mouseup":
          this.overState ? this.changeState(b.OVER) : this.changeState(b.UP);
          break;
        case "mouseout":
        case "touchout":
        case "touchend":
          this.upState && this.changeState(b.UP);
      }
      b.superClass._onEvent.call(this, a);
    }
  };
  b.prototype.setDrawable = function () {
    b.superClass.setDrawable.call(this, null);
  };
})();
(function () {
  var b = (Quark.Context = function (a) {
    if (a.canvas == null) throw "Quark.Context Error: canvas is required.";
    this.canvas = null;
    Quark.merge(this, a);
  });
  b.prototype.startDraw = function () {};
  b.prototype.draw = function () {};
  b.prototype.endDraw = function () {};
  b.prototype.transform = function () {};
  b.prototype.remove = function () {};
})();
(function () {
  var b = (Quark.CanvasContext = function (a) {
    b.superClass.constructor.call(this, a);
    this.context = this.canvas.getContext("2d");
  });
  Quark.inherit(b, Quark.Context);
  b.prototype.startDraw = function () {
    this.context.save();
  };
  b.prototype.draw = function (a) {
    var b = a.getDrawable(this);
    b != null &&
      ((arguments[0] = b),
      this.context.drawImage.apply(this.context, arguments));
  };
  b.prototype.endDraw = function () {
    this.context.restore();
  };
  b.prototype.transform = function (a) {
    var b = this.context;
    (a.x != 0 || a.y != 0) && b.translate(a.x, a.y);
    a.rotation % 360 != 0 && b.rotate((a.rotation % 360) * Quark.DEG_TO_RAD);
    (a.scaleX != 1 || a.scaleY != 1) && b.scale(a.scaleX, a.scaleY);
    (a.regX != 0 || a.regY != 0) && b.translate(-a.regX, -a.regY);
    a.alpha > 0 && (b.globalAlpha *= a.alpha);
  };
  b.prototype.clear = function (a, b, d, e) {
    this.context.clearRect(a, b, d, e);
  };
})();
(function () {
  function b(a, b) {
    var c = "";
    c += b
      ? "translate3d(" +
        (a.x - a.regX) +
        "px, " +
        (a.y - a.regY) +
        "px, 0px)rotate3d(0, 0, 1, " +
        a.rotation +
        "deg)scale3d(" +
        a.scaleX +
        ", " +
        a.scaleY +
        ", 1)"
      : "translate(" +
        (a.x - a.regX) +
        "px, " +
        (a.y - a.regY) +
        "px)rotate(" +
        a.rotation +
        "deg)scale(" +
        a.scaleX +
        ", " +
        a.scaleY +
        ")";
    return c;
  }
  var a = document.createElement("div"),
    c = a.style[Quark.cssPrefix + "Transform"] != void 0,
    d = a.style[Quark.cssPrefix + "Perspective"] != void 0,
    e = document.documentElement;
  if (d && "webkitPerspective" in e.style) {
    a.id = "test3d";
    var f = document.createElement("style");
    f.textContent = "@media (-webkit-transform-3d){#test3d{height:3px}}";
    document.head.appendChild(f);
    e.appendChild(a);
    d = a.offsetHeight === 3;
    f.parentNode.removeChild(f);
    a.parentNode.removeChild(a);
  }
  Quark.supportTransform = c;
  Quark.supportTransform3D = d;
  if (!c) throw "Error: DOMContext requires css transfrom support.";
  var h = (Quark.DOMContext = function (a) {
    h.superClass.constructor.call(this, a);
  });
  Quark.inherit(h, Quark.Context);
  h.prototype.draw = function (a) {
    if (!a._addedToDOM) {
      var b = a.parent,
        c = a.getDrawable(this);
      b == null && c.parentNode == null
        ? this.canvas.appendChild(c)
        : ((b = b.getDrawable(this)), c.parentNode != b && b.appendChild(c));
      a._addedToDOM = !0;
    }
  };
  h.prototype.transform = function (a) {
    var c = a.getDrawable(this);
    if (a.transformEnabled || !a._addedToDOM) {
      var d = Quark.cssPrefix,
        e = d + "TransformOrigin";
      d += "Transform";
      if (!c.style.display || a.propChanged("visible", "alpha"))
        c.style.display = !a.visible || a.alpha <= 0 ? "none" : "";
      if (!c.style.opacity || a.propChanged("alpha")) c.style.opacity = a.alpha;
      if (!c.style.backgroundPosition || a.propChanged("rectX", "rectY"))
        c.style.backgroundPosition = -a.rectX + "px " + -a.rectY + "px";
      if (!c.style.width || a.propChanged("width", "height"))
        (c.style.width = a.width + "px"), (c.style.height = a.height + "px");
      if (!c.style[e] || a.propChanged("regX", "regY"))
        c.style[e] = a.regX + "px " + a.regY + "px";
      if (
        !c.style[d] ||
        a.propChanged("x", "y", "regX", "regY", "scaleX", "scaleY", "rotation")
      )
        (e = Quark.supportTransform3D ? b(a, !0) : b(a, !1)), (c.style[d] = e);
      if (!c.style.zIndex || a.propChanged("_depth")) c.style.zIndex = a._depth;
    }
  };
  h.prototype.hide = function (a) {
    a.getDrawable(this).style.display = "none";
  };
  h.prototype.remove = function (a) {
    var b = a.getDrawable(this),
      c = b.parentNode;
    c != null && c.removeChild(b);
    a._addedToDOM = !1;
  };
})();
