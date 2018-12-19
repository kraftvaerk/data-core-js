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
})({"../src/core/endpoint.core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// endpoint options class
var Endpoint =
/*#__PURE__*/
function () {
  function Endpoint() {
    var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
    var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#';
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Endpoint);

    this.method = method;
    this.url = url;
    this.data = data;

    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    this.args = Object.assign.apply(Object, [{}].concat(args));
  }

  _createClass(Endpoint, [{
    key: "options",
    value: function options() {
      for (var _len2 = arguments.length, additionalArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        additionalArgs[_key2] = arguments[_key2];
      }

      return Object.assign.apply(Object, [{
        method: this.method,
        url: this.url,
        data: this.data
      }, this.args].concat(additionalArgs));
    }
  }]);

  return Endpoint;
}();

;
var _default = Endpoint;
exports.default = _default;
},{}],"../src/core/mime-type.core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var mime = {
  css: 'text/css',
  html: 'text/html',
  script: 'text/javascript',
  json: 'application/json',
  xml: 'application/xml',
  xhtml: 'application/xhtml+xml',
  stream: 'application/octet-stream'
};
var _default = mime;
exports.default = _default;
},{}],"../src/core/sanitize.core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mimeType = _interopRequireDefault(require("./mime-type.core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitize = {
  core: function core(response) {
    var contentType = response.headers ? response.headers.get('content-type') : '';
    if (contentType.includes(_mimeType.default.json)) return response.json();
    if (contentType.includes(_mimeType.default.html)) return response.text();
    if (contentType.includes(_mimeType.default.stream)) return response.blob();
    throw new TypeError('content-type not available');
  },
  json: function json(response) {
    var contentType = response.headers ? response.headers.get('content-type') : '';
    if (contentType.includes(_mimeType.default.json)) return response.json();
    throw new TypeError('content-type not available');
  },
  html: function html(response) {
    var contentType = response.headers ? response.headers.get('content-type') : '';
    if (contentType.includes(_mimeType.default.json)) return response.text();
    throw new TypeError('content-type not available');
  },
  stream: function stream(response) {
    var contentType = response.headers ? response.headers.get('content-type') : '';
    if (contentType.includes(_mimeType.default.json)) return response.blob();
    throw new TypeError('content-type not available');
  }
};
var _default = sanitize;
exports.default = _default;
},{"./mime-type.core":"../src/core/mime-type.core.js"}],"../src/core/exception.core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// invalid response error
var InvalidResponseError = function InvalidResponseError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var exc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  this.name = 'InvalidResponseError';
  this.message = message;
  this.exc = exc;
};

InvalidResponseError.prototype = new Error();
var _default = {
  InvalidResponseError: InvalidResponseError
};
exports.default = _default;
},{}],"../src/common/utility.common.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.replaceStringParams = exports.replaceObjectParams = exports.replacePlaceholderParams = exports.clone = exports.parseJSON = exports.stringify = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// convert an object to a json string
var stringify = function stringify(object) {
  return JSON.stringify(object);
}; // parse a json string to a js object


exports.stringify = stringify;

var parseJSON = function parseJSON(object) {
  return JSON.parse(object);
}; // does a deep clone of an object (functions not allowed)


exports.parseJSON = parseJSON;

var clone = function clone(object) {
  return parseJSON(stringify(object));
}; // replace placeholder parameters inside a string with provided values
// i.e. ('You are {0} years old {1}', [32], null, true ) => returns the resulting string with values replaced using the values array
// @placholder: string => "You are {0} years old"
// @values:     object/array => 26 or [26]
// @regex:      regex => defaults to digits {0}, {1}... {n} */
// @limit:      boolean => trim result to length of values


exports.clone = clone;

var replacePlaceholderParams = function replacePlaceholderParams(placeholder, values, limit) {
  if (!placeholder) return '';
  if (typeof placeholder !== 'string') throw new TypeError('invalid placeholder or placeholder is not an string', placeholder);
  if (regex && !(regex instanceof RegExp)) throw new TypeError('invalid regex: the regex is not a properly formatted regular expression i.e. /{\\d}/g ', regex);
  values = values instanceof Array ? values : [values];
  var regex = /{\d}|{\d,\d}|{\d,\d-\d}/g; // trim the placeholder to size base on the array of values length

  var index = -1;
  var count = values.length;
  var tag = "{".concat(count - 1, "}"); // placeholder tags start at index 0

  var nextTag = "{".concat(count, "}"); // detect if next tag exists

  var tagExistsInPlaceholder = placeholder.indexOf(tag) > -1;
  var nextTagExistsInPlaceholder = placeholder.indexOf(nextTag) > -1;
  var trimToIndex = placeholder.indexOf(tag) + tag.length;
  placeholder = limit ? placeholder.substring(0, tagExistsInPlaceholder && nextTagExistsInPlaceholder ? trimToIndex : placeholder.length) : placeholder; // insert values in placeholder tags

  var result = placeholder.replace(regex, function (match) {
    // introducing index based string manipulation (from-to index)
    var substring = match.substring(1, match.length - 1).split(','); // [..., x-y]

    var substringStartIndex = substring.length === 1 ? 0 : substring[1].split('-')[0]; // check substring values

    var substringLength = substring.length === 1 ? undefined : substring[1].split('-')[1]; // declare substring length

    var manipulated = ++index < count ? values[index] !== undefined ? values[index].toString().substring(substringStartIndex, substringLength) : null : match;
    return manipulated;
  });
  return result;
}; // replace placeholder parameters inside an object with provided values
// i.e. ( { a: '{0}', b: { c: {1} }}, ['value-a', 'value-c'] ) => returns an object with values replaced using the values array
// @model:      object => defaults to {}
// @values:     object/array => 26 or [26]
// @regex:      regex => defaults to digits {0}, {1}... {n} */


exports.replacePlaceholderParams = replacePlaceholderParams;

var replaceObjectParams = function replaceObjectParams(model, values) {
  if (!model) return {};
  if (_typeof(model) !== 'object' && model.constructor === Object) throw new TypeError("invalid model or model is not an object", model);
  values = values instanceof Array ? values : [values];
  var regexJSONPlaceholder = /"{\d}"/g;
  var regexPlaceholderIndex = /{(.*?)}/;
  var stringified = stringify(model);
  var result = stringified.replace(regexJSONPlaceholder, function (match) {
    var placeholderIndex = match.match(regexPlaceholderIndex);
    var index = placeholderIndex.length > 0 ? placeholderIndex[1] : -1;
    return index > -1 && index < values.length ? stringify(values[index]) : match;
  });
  return parseJSON(result);
}; // replaces placeholder values sing the object properties; object must be a of single depth
// i.e. (/api/{userID}/get/email, { userID: 123 } => returns userID placeholder replaced with the object.userID value
// @string:     string => string with placeholder params {n}
// @object:     object => flat object with properties matching the placeholder params


exports.replaceObjectParams = replaceObjectParams;

var replaceStringParams = function replaceStringParams()
/* flat object */
{
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var regex = /{(.*?)}/g;
  var result = string.replace(regex, function (match) {
    return object[match.substring(1, match.length - 1)];
  });
  return result;
}; // export defaults


exports.replaceStringParams = replaceStringParams;
var _default = {
  stringify: stringify,
  parseJSON: parseJSON,
  clone: clone,
  replacePlaceholderParams: replacePlaceholderParams,
  replaceObjectParams: replaceObjectParams,
  replaceStringParams: replaceStringParams
};
exports.default = _default;
},{}],"../src/core/loader.core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mimeType = _interopRequireDefault(require("./mime-type.core"));

var _sanitize2 = _interopRequireDefault(require("./sanitize.core"));

var _exception2 = _interopRequireDefault(require("./exception.core"));

var _utility = require("../common/utility.common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// available fetch request types
var requestTypes = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'OPTIONS', 'CONNECT', 'PATCH']; // append headers to header instance

var appendHeaders = function appendHeaders(header)
/* array containing header objects */
{
  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  header = header || new Headers();
  if (!headers.length) return header;

  for (var i = 0, length = headers.length; i < length; i++) {
    header.append(Object.keys(headers[i])[0], Object.values(headers[i])[0]);
  }

  return header;
}; // loader core (get, post, do)


var loader = {
  get: function get(options
  /* { method = '', url = '', data = {}, headers = [], ...args } */
  ) {
    if (!options.url) throw new TypeError('loader.get => options.url is invalid, null or undefined');
    var query = '';
    if (options.data && _typeof(options.data) === 'object') for (var prop in options.data) {
      query += '&' + prop + '=' + encodeURIComponent(options.data[prop]);
    }
    if (query.length > 0) query = '?' + query.slice(1); // generate options and headers (extend if neccessary)

    console.log(options.args.headers);
    var headers = appendHeaders(new Headers({
      'Accept': _mimeType.default.json,
      'Content-Type': _mimeType.default.json
    }), options.args.headers);
    console.log(headers);
    var fetchOptions = Object.assign({
      method: 'GET',
      credentials: 'include',
      headers: headers
    }, options.args);
    return fetch(options.url + query, fetchOptions);
  },
  head: function head(options
  /* {} */
  ) {
    throw new Error('loader.head => not yet implemented...');
  },
  post: function post(options
  /* { method = '', url = '', data = {}, headers = [], ...args } */
  ) {
    if (!options.url) throw new TypeError('loader.post => options.url is invalid, null or undefined'); // generate headers (extend if neccessary)

    var headers = appendHeaders(new Headers({
      'Accept': _mimeType.default.json,
      'Content-Type': _mimeType.default.json
    }), options.args.headers); // request options

    var construct = Object.assign({
      headers: headers,
      method: 'POST',
      body: (0, _utility.stringify)(options.data || {}),
      credentials: 'include'
    }, options.args);
    return fetch(options.url, construct);
  },
  put: function put(options
  /* { method = '', url = '', data = {}, headers = [], ...args } */
  ) {
    if (!options.url) throw new TypeError('loader.post => options.url is invalid, null or undefined'); // generate headers (extend if neccessary)

    var headers = appendHeaders(new Headers({
      'Accept': _mimeType.default.json,
      'Content-Type': _mimeType.default.json
    }), options.args.headers); // request options

    var construct = Object.assign({
      headers: headers,
      method: 'PUT',
      body: (0, _utility.stringify)(options.data || {}),
      credentials: 'include'
    }, options.args);
    return fetch(options.url, construct);
  },
  delete: function _delete(options
  /* {} */
  ) {
    throw new Error('loader.delete => not yet implemented...');
  },
  trace: function trace(options
  /* {} */
  ) {
    throw new Error('loader.trace => not yet implemented...');
  },
  options: function options(_options
  /* {} */
  ) {
    throw new Error('loader.options => not yet implemented...');
  },
  connect: function connect(options
  /* {} */
  ) {
    throw new Error('loader.connect => not yet implemented...');
  },
  do: function _do(options
  /* { method = '', url = '', data = {}, headers = [], ...args } */
  ) {
    if (!options) throw new TypeError('loader.do => options is invalid, null or undefined');
    if (!options.method || requestTypes.indexOf(options.method.toUpperCase()) === -1) throw new TypeError('loader.do => options.method is invalid, null or undefined');
    if (!options.url) throw new TypeError('loader.do => options.url is invalid, null or undefined'); // execute the xhr request

    return this[options.method.toLowerCase()](options).then(function (response) {
      // cast a custom exception to manage invalid status codes from the service calls
      if (!response.ok) {
        var message = "response.status: ".concat(response.status, " | url: ").concat(response.url);
        return _sanitize2.default.core(response).then(function (exc) {
          throw new _exception2.default.InvalidResponseError(message, exc);
        });
      } // return response copy


      return response.clone();
    }).catch(function (error) {
      throw error;
    });
  },
  sync: function sync(queue) {
    throw new Error('loader.sync => not yet implemented...');
  }
};
var _default = loader;
exports.default = _default;
},{"./mime-type.core":"../src/core/mime-type.core.js","./sanitize.core":"../src/core/sanitize.core.js","./exception.core":"../src/core/exception.core.js","../common/utility.common":"../src/common/utility.common.js"}],"../src/api/global.api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loader2 = _interopRequireDefault(require("../core/loader.core"));

var _sanitize2 = _interopRequireDefault(require("../core/sanitize.core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = {
  call: function call() {
    var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var data = arguments.length > 1 ? arguments[1] : undefined;
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'json';
    if (!endpoint) throw new TypeError('api.call(endpoint, type) requries a valid endpoint object', endpoint);
    return _loader2.default.do(endpoint).then(_sanitize2.default[type]);
  }
};
var _default = api;
exports.default = _default;
},{"../core/loader.core":"../src/core/loader.core.js","../core/sanitize.core":"../src/core/sanitize.core.js"}],"../src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Endpoint", {
  enumerable: true,
  get: function () {
    return _endpoint.default;
  }
});
Object.defineProperty(exports, "loader", {
  enumerable: true,
  get: function () {
    return _loader.default;
  }
});
Object.defineProperty(exports, "sanitize", {
  enumerable: true,
  get: function () {
    return _sanitize.default;
  }
});
Object.defineProperty(exports, "mime", {
  enumerable: true,
  get: function () {
    return _mimeType.default;
  }
});
Object.defineProperty(exports, "api", {
  enumerable: true,
  get: function () {
    return _global.default;
  }
});

var _endpoint = _interopRequireDefault(require("./core/endpoint.core"));

var _loader = _interopRequireDefault(require("./core/loader.core"));

var _sanitize = _interopRequireDefault(require("./core/sanitize.core"));

var _mimeType = _interopRequireDefault(require("./core/mime-type.core"));

var _global = _interopRequireDefault(require("./api/global.api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./core/endpoint.core":"../src/core/endpoint.core.js","./core/loader.core":"../src/core/loader.core.js","./core/sanitize.core":"../src/core/sanitize.core.js","./core/mime-type.core":"../src/core/mime-type.core.js","./api/global.api":"../src/api/global.api.js"}],"index.debug.js":[function(require,module,exports) {
"use strict";

var _src = require("../src");

var endpoint = new _src.Endpoint('get', 'https://reqres.in/api/users?page=2', null, {
  credentials: 'omit'
}, {
  headers: [{
    'Content-type': 'no-cache'
  }]
});
console.log(endpoint);

_src.api.call(endpoint).then(function (data) {
  return console.log(data);
});

_src.loader.do(endpoint).then(_src.sanitize.json).then(function (data) {
  return console.log(data);
});
},{"../src":"../src/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "8792" + '/');

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