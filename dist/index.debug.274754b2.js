// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../dist/index.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

parcelRequire = function (e, r, n, t) {
  var i = "function" == typeof parcelRequire && parcelRequire,
      o = "function" == typeof require && require;

  function u(n, t) {
    if (!r[n]) {
      if (!e[n]) {
        var f = "function" == typeof parcelRequire && parcelRequire;
        if (!t && f) return f(n, !0);
        if (i) return i(n, !0);
        if (o && "string" == typeof n) return o(n);
        var c = new Error("Cannot find module '" + n + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[n][1][r] || r;
      }, p.cache = {};
      var l = r[n] = new u.Module(n);
      e[n][0].call(l.exports, p, l, l.exports, this);
    }

    return r[n].exports;

    function p(e) {
      return u(p.resolve(e));
    }
  }

  u.isParcelRequire = !0, u.Module = function (e) {
    this.id = e, this.bundle = u, this.exports = {};
  }, u.modules = e, u.cache = r, u.parent = i, u.register = function (r, n) {
    e[r] = [function (e, r) {
      r.exports = n;
    }, {}];
  };

  for (var f = 0; f < n.length; f++) {
    u(n[f]);
  }

  if (n.length) {
    var c = u(n[n.length - 1]);
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function () {
      return c;
    }) : t && (this[t] = c);
  }

  return u;
}({
  "0pG5": [function (require, module, exports) {
    "use strict";

    function e(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function t(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
      }
    }

    function r(e, r, n) {
      return r && t(e.prototype, r), n && t(e, n), e;
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var n = function () {
      function t() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "GET",
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "#",
            a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
        e(this, t), o = o instanceof Array ? o : [o], this.method = r, this.url = n, this.data = a, this.headers = o;

        for (var i = arguments.length, s = new Array(i > 4 ? i - 4 : 0), h = 4; h < i; h++) {
          s[h - 4] = arguments[h];
        }

        this.args = Object.assign.apply(Object, [{}].concat(s));
      }

      return r(t, [{
        key: "options",
        value: function value() {
          for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) {
            t[r] = arguments[r];
          }

          return Object.assign.apply(Object, [{
            method: this.method,
            url: this.url,
            data: this.data,
            headers: this.headers
          }, this.args].concat(t));
        }
      }]), t;
    }(),
        a = n;

    exports.default = a;
  }, {}],
  "qlvM": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var t = {
      css: "text/css",
      html: "text/html",
      script: "text/javascript",
      json: "application/json",
      xml: "application/xml",
      xhtml: "application/xhtml+xml",
      stream: "application/octet-stream"
    },
        e = t;
    exports.default = e;
  }, {}],
  "e7az": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = t(require("./mime-type.core"));

    function t(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var n = {
      core: function core(t) {
        var n = t.headers ? t.headers.get("content-type") : "";
        if (n.includes(e.default.json)) return t.json();
        if (n.includes(e.default.html)) return t.text();
        if (n.includes(e.default.stream)) return t.blob();
        throw new TypeError("content-type not available");
      },
      json: function json(t) {
        if ((t.headers ? t.headers.get("content-type") : "").includes(e.default.json)) return t.json();
        throw new TypeError("content-type not available");
      },
      html: function html(t) {
        if ((t.headers ? t.headers.get("content-type") : "").includes(e.default.json)) return t.text();
        throw new TypeError("content-type not available");
      },
      stream: function stream(t) {
        if ((t.headers ? t.headers.get("content-type") : "").includes(e.default.json)) return t.blob();
        throw new TypeError("content-type not available");
      }
    },
        r = n;
    exports.default = r;
  }, {
    "./mime-type.core": "qlvM"
  }],
  "0its": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = function e() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      this.name = "InvalidResponseError", this.message = e, this.exc = r;
    };

    e.prototype = new Error();
    var r = {
      InvalidResponseError: e
    };
    exports.default = r;
  }, {}],
  "Slwy": [function (require, module, exports) {
    "use strict";

    function r(e) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (r) {
        return _typeof(r);
      } : function (r) {
        return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : _typeof(r);
      })(e);
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = exports.replaceStringParams = exports.replaceObjectParams = exports.replacePlaceholderParams = exports.clone = exports.parseJSON = exports.stringify = void 0;

    var e = function e(r) {
      return JSON.stringify(r);
    };

    exports.stringify = e;

    var t = function t(r) {
      return JSON.parse(r);
    };

    exports.parseJSON = t;

    var n = function n(r) {
      return t(e(r));
    };

    exports.clone = n;

    var o = function o(r, e, t) {
      if (!r) return "";
      if ("string" != typeof r) throw new TypeError("invalid placeholder or placeholder is not an string", r);
      if (n && !(n instanceof RegExp)) throw new TypeError("invalid regex: the regex is not a properly formatted regular expression i.e. /{\\d}/g ", n);
      e = e instanceof Array ? e : [e];
      var n = /{\d}|{\d,\d}|{\d,\d-\d}/g,
          o = -1,
          a = e.length,
          i = "{".concat(a - 1, "}"),
          s = "{".concat(a, "}"),
          l = r.indexOf(i) > -1,
          c = r.indexOf(s) > -1,
          p = r.indexOf(i) + i.length;
      return (r = t ? r.substring(0, l && c ? p : r.length) : r).replace(n, function (r) {
        var t = r.substring(1, r.length - 1).split(","),
            n = 1 === t.length ? 0 : t[1].split("-")[0],
            i = 1 === t.length ? void 0 : t[1].split("-")[1];
        return ++o < a ? void 0 !== e[o] ? e[o].toString().substring(n, i) : null : r;
      });
    };

    exports.replacePlaceholderParams = o;

    var a = function a(n, o) {
      if (!n) return {};
      if ("object" !== r(n) && n.constructor === Object) throw new TypeError("invalid model or model is not an object", n);
      o = o instanceof Array ? o : [o];
      var a = /{(.*?)}/,
          i = e(n).replace(/"{\d}"/g, function (r) {
        var t = r.match(a),
            n = t.length > 0 ? t[1] : -1;
        return n > -1 && n < o.length ? e(o[n]) : r;
      });
      return t(i);
    };

    exports.replaceObjectParams = a;

    var i = function i() {
      var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return r.replace(/{(.*?)}/g, function (r) {
        return e[r.substring(1, r.length - 1)];
      });
    };

    exports.replaceStringParams = i;
    var s = {
      stringify: e,
      parseJSON: t,
      clone: n,
      replacePlaceholderParams: o,
      replaceObjectParams: a,
      replaceStringParams: i
    };
    exports.default = s;
  }, {}],
  "gvlF": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = o(require("./mime-type.core")),
        t = o(require("./sanitize.core")),
        n = o(require("./exception.core")),
        r = require("../common/utility.common");

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e) {
      return (i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
      })(e);
    }

    var d = ["GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "OPTIONS", "CONNECT", "PATCH"],
        a = function a(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
      if (e = e || new Headers(), !t.length) return e;

      for (var n = 0, r = t.length; n < r; n++) {
        e.append(Object.keys(t[n])[0], Object.values(t[n])[0]);
      }

      return e;
    },
        l = {
      get: function get(t) {
        if (!t.url) throw new TypeError("loader.get => options.url is invalid, null or undefined");
        var n = "";
        if (t.data && "object" === i(t.data)) for (var r in t.data) {
          n += "&" + r + "=" + encodeURIComponent(t.data[r]);
        }
        n.length > 0 && (n = "?" + n.slice(1));
        var o = a(new Headers({
          Accept: e.default.json,
          "Content-Type": e.default.json
        }), t.headers),
            d = Object.assign({
          method: "GET",
          credentials: "include",
          headers: o
        }, t.args);
        return fetch(t.url + n, d);
      },
      head: function head(e) {
        throw new Error("loader.head => not yet implemented...");
      },
      post: function post(t) {
        if (!t.url) throw new TypeError("loader.post => options.url is invalid, null or undefined");
        var n = a(new Headers({
          Accept: e.default.json,
          "Content-Type": e.default.json
        }), t.headers),
            o = Object.assign({
          headers: n,
          method: "POST",
          body: (0, r.stringify)(t.data || {}),
          credentials: "include"
        }, t.args);
        return fetch(t.url, o);
      },
      put: function put(t) {
        if (!t.url) throw new TypeError("loader.post => options.url is invalid, null or undefined");
        var n = a(new Headers({
          Accept: e.default.json,
          "Content-Type": e.default.json
        }), t.headers),
            o = Object.assign({
          headers: n,
          method: "PUT",
          body: (0, r.stringify)(t.data || {}),
          credentials: "include"
        }, t.args);
        return fetch(t.url, o);
      },
      delete: function _delete(e) {
        throw new Error("loader.delete => not yet implemented...");
      },
      trace: function trace(e) {
        throw new Error("loader.trace => not yet implemented...");
      },
      options: function options(e) {
        throw new Error("loader.options => not yet implemented...");
      },
      connect: function connect(e) {
        throw new Error("loader.connect => not yet implemented...");
      },
      do: function _do(e) {
        if (!e) throw new TypeError("loader.do => options is invalid, null or undefined");
        if (!e.method || -1 === d.indexOf(e.method.toUpperCase())) throw new TypeError("loader.do => options.method is invalid, null or undefined");
        if (!e.url) throw new TypeError("loader.do => options.url is invalid, null or undefined");
        return this[e.method.toLowerCase()](e).then(function (e) {
          if (!e.ok) {
            var r = "response.status: ".concat(e.status, " | url: ").concat(e.url);
            return t.default.core(e).then(function (e) {
              throw new n.default.InvalidResponseError(r, e);
            });
          }

          return e.clone();
        }).catch(function (e) {
          throw e;
        });
      },
      sync: function sync(e) {
        throw new Error("loader.sync => not yet implemented...");
      }
    },
        u = l;

    exports.default = u;
  }, {
    "./mime-type.core": "qlvM",
    "./sanitize.core": "e7az",
    "./exception.core": "0its",
    "../common/utility.common": "Slwy"
  }],
  "baCp": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = t(require("../core/loader.core")),
        r = t(require("../core/sanitize.core"));

    function t(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var o = {
      call: function call() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            o = (arguments.length > 1 && arguments[1], arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "json");
        if (!t) throw new TypeError("api.call(endpoint, type) requries a valid endpoint object", t);
        return e.default.do(t).then(r.default[o]);
      }
    },
        l = o;
    exports.default = l;
  }, {
    "../core/loader.core": "gvlF",
    "../core/sanitize.core": "e7az"
  }],
  "Focm": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), Object.defineProperty(exports, "Endpoint", {
      enumerable: !0,
      get: function get() {
        return e.default;
      }
    }), Object.defineProperty(exports, "loader", {
      enumerable: !0,
      get: function get() {
        return r.default;
      }
    }), Object.defineProperty(exports, "sanitize", {
      enumerable: !0,
      get: function get() {
        return t.default;
      }
    }), Object.defineProperty(exports, "mime", {
      enumerable: !0,
      get: function get() {
        return n.default;
      }
    }), Object.defineProperty(exports, "api", {
      enumerable: !0,
      get: function get() {
        return o.default;
      }
    });
    var e = u(require("./core/endpoint.core")),
        r = u(require("./core/loader.core")),
        t = u(require("./core/sanitize.core")),
        n = u(require("./core/mime-type.core")),
        o = u(require("./api/global.api"));

    function u(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }
  }, {
    "./core/endpoint.core": "0pG5",
    "./core/loader.core": "gvlF",
    "./core/sanitize.core": "e7az",
    "./core/mime-type.core": "qlvM",
    "./api/global.api": "baCp"
  }]
}, {}, ["Focm"], null);
},{}],"index.debug.js":[function(require,module,exports) {
"use strict";

var _dist = require("../dist");

// create an endpoint
var endpoint = new _dist.Endpoint('get', 'https://reqres.in/api/users?page=2', null, {
  'cache-control': 5000
}, {
  credentials: 'omit'
});
console.log(endpoint); // call the root loader and sanitize the repsonse data

_dist.loader.do(endpoint).then(_dist.sanitize.json).then(function (data) {
  return console.log(data);
}); // you can also call the wrapper function for loader as a shorthand
//api.call(endpoint).then(data => console.log(data));
},{"../dist":"../dist/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "20939" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.debug.js"], null)
//# sourceMappingURL=/index.debug.274754b2.map