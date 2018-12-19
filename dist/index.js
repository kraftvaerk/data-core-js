"use strict";

require("core-js/modules/es6.object.define-property");

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
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.replaceStringParams = exports.replaceObjectParams = exports.replacePlaceholderParams = exports.clone = exports.parseJSON = exports.stringify = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.constructor");

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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
    var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    _classCallCheck(this, Endpoint);

    this.method = method;
    this.url = url;
    this.data = data;
    this.headers = headers;

    for (var _len = arguments.length, args = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
      args[_key - 4] = arguments[_key];
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
        data: this.data,
        headers: this.headers
      }].concat(_toConsumableArray(this.args), additionalArgs));
    }
  }]);

  return Endpoint;
}();

;
var _default = Endpoint;
exports.default = _default;
"use strict";

require("core-js/modules/es6.object.define-property");

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
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var header = {
  cache: {
    pragma: {
      'Pragma': 'no-cache'
    },
    maxAge: function maxAge(seconds) {
      return {
        'Cache-Control': "max-age=".concat(seconds)
      };
    },
    maxStale: function maxStale(seconds) {
      return {
        'Cache-Control': "max-stale=".concat(seconds)
      };
    },
    minRefresh: function minRefresh(seconds) {
      return {
        'Cache-Control': "max-stale=".concat(seconds)
      };
    },
    noCache: {
      'Cache-Control': 'no-cache'
    },
    noStore: {
      'Cache-Control': 'no-store'
    },
    noTransform: {
      'Cache-Control': 'no-transform'
    },
    onlyIfCache: {
      'Cache-Control': 'only-if-cached'
    },
    immutable: {
      'Cache-Control': 'immutable'
    },
    staleWhileRevalidate: function staleWhileRevalidate(seconds) {
      return {
        'Cache-Control': "stale-while-revalidate=".concat(seconds)
      };
    },
    staleIfError: function staleIfError(seconds) {
      return {
        'Cache-Control': "stale-if-error=".concat(seconds)
      };
    } //, ...

  }
};
var _default = header;
exports.default = _default;
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.object.values");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _mimeType = _interopRequireDefault(require("./mime-type.core"));

var _sanitize2 = _interopRequireDefault(require("./sanitize.core"));

var _exception2 = _interopRequireDefault(require("./exception.core"));

var _utility = require("../common/utility.common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

    var headers = appendHeaders(new Headers({
      'Accept': _mimeType.default.json,
      'Content-Type': _mimeType.default.json
    }), options.headers);
    var fetchOptions = Object.assign.apply(Object, [{
      method: 'GET',
      credentials: 'include',
      headers: headers
    }].concat(_toConsumableArray(options.args)));
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
    }), options.headers); // request options

    var construct = Object.assign.apply(Object, [{
      headers: headers,
      method: 'POST',
      body: (0, _utility.stringify)(options.data || {}),
      credentials: 'include'
    }].concat(_toConsumableArray(options.args)));
    return fetch(options.url, construct);
  },
  put: function put(options
  /* { method = '', url = '', data = {}, headers = [], ...args } */
  ) {
    if (!options.url) throw new TypeError('loader.post => options.url is invalid, null or undefined'); // generate headers (extend if neccessary)

    var headers = appendHeaders(new Headers({
      'Accept': _mimeType.default.json,
      'Content-Type': _mimeType.default.json
    }), options.headers); // request options

    var construct = Object.assign.apply(Object, [{
      headers: headers,
      method: 'PUT',
      body: (0, _utility.stringify)(options.data || {}),
      credentials: 'include'
    }].concat(_toConsumableArray(options.args)));
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
    if (!options.method || requestTypes.indexOf(options.method.toLowerCase()) === -1) throw new TypeError('loader.do => options.method is invalid, null or undefined');
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
"use strict";

require("core-js/modules/es6.object.define-property");

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
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

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
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _endpoint = _interopRequireDefault(require("./core/endpoint.core"));

var _loader = _interopRequireDefault(require("./core/loader.core"));

var _global = _interopRequireDefault(require("./api/global.api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Endpoint: _endpoint.default,
  loader: _loader.default,
  api: _global.default
};
exports.default = _default;
"use strict";

require("core-js/modules/es6.object.define-property");

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
"use strict";

require("core-js/modules/es6.object.define-property");

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
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.replaceStringParams = exports.replaceObjectParams = exports.replacePlaceholderParams = exports.clone = exports.parseJSON = exports.stringify = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.constructor");

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
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.replaceStringParams = exports.replaceObjectParams = exports.replacePlaceholderParams = exports.clone = exports.parseJSON = exports.stringify = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.constructor");

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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
    var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    _classCallCheck(this, Endpoint);

    this.method = method;
    this.url = url;
    this.data = data;
    this.headers = headers;

    for (var _len = arguments.length, args = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
      args[_key - 4] = arguments[_key];
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
        data: this.data,
        headers: this.headers
      }].concat(_toConsumableArray(this.args), additionalArgs));
    }
  }]);

  return Endpoint;
}();

;
var _default = Endpoint;
exports.default = _default;
"use strict";

require("core-js/modules/es6.object.define-property");

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
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var header = {
  cache: {
    pragma: {
      'Pragma': 'no-cache'
    },
    maxAge: function maxAge(seconds) {
      return {
        'Cache-Control': "max-age=".concat(seconds)
      };
    },
    maxStale: function maxStale(seconds) {
      return {
        'Cache-Control': "max-stale=".concat(seconds)
      };
    },
    minRefresh: function minRefresh(seconds) {
      return {
        'Cache-Control': "max-stale=".concat(seconds)
      };
    },
    noCache: {
      'Cache-Control': 'no-cache'
    },
    noStore: {
      'Cache-Control': 'no-store'
    },
    noTransform: {
      'Cache-Control': 'no-transform'
    },
    onlyIfCache: {
      'Cache-Control': 'only-if-cached'
    },
    immutable: {
      'Cache-Control': 'immutable'
    },
    staleWhileRevalidate: function staleWhileRevalidate(seconds) {
      return {
        'Cache-Control': "stale-while-revalidate=".concat(seconds)
      };
    },
    staleIfError: function staleIfError(seconds) {
      return {
        'Cache-Control': "stale-if-error=".concat(seconds)
      };
    } //, ...

  }
};
var _default = header;
exports.default = _default;
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.object.values");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _mimeType = _interopRequireDefault(require("./mime-type.core"));

var _sanitize2 = _interopRequireDefault(require("./sanitize.core"));

var _exception2 = _interopRequireDefault(require("./exception.core"));

var _utility = require("../common/utility.common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

    var headers = appendHeaders(new Headers({
      'Accept': _mimeType.default.json,
      'Content-Type': _mimeType.default.json
    }), options.headers);
    var fetchOptions = Object.assign.apply(Object, [{
      method: 'GET',
      credentials: 'include',
      headers: headers
    }].concat(_toConsumableArray(options.args)));
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
    }), options.headers); // request options

    var construct = Object.assign.apply(Object, [{
      headers: headers,
      method: 'POST',
      body: (0, _utility.stringify)(options.data || {}),
      credentials: 'include'
    }].concat(_toConsumableArray(options.args)));
    return fetch(options.url, construct);
  },
  put: function put(options
  /* { method = '', url = '', data = {}, headers = [], ...args } */
  ) {
    if (!options.url) throw new TypeError('loader.post => options.url is invalid, null or undefined'); // generate headers (extend if neccessary)

    var headers = appendHeaders(new Headers({
      'Accept': _mimeType.default.json,
      'Content-Type': _mimeType.default.json
    }), options.headers); // request options

    var construct = Object.assign.apply(Object, [{
      headers: headers,
      method: 'PUT',
      body: (0, _utility.stringify)(options.data || {}),
      credentials: 'include'
    }].concat(_toConsumableArray(options.args)));
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
    if (!options.method || requestTypes.indexOf(options.method.toLowerCase()) === -1) throw new TypeError('loader.do => options.method is invalid, null or undefined');
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
"use strict";

require("core-js/modules/es6.object.define-property");

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
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
    var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    _classCallCheck(this, Endpoint);

    this.method = method;
    this.url = url;
    this.data = data;
    this.headers = headers;

    for (var _len = arguments.length, args = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
      args[_key - 4] = arguments[_key];
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
        data: this.data,
        headers: this.headers
      }].concat(_toConsumableArray(this.args), additionalArgs));
    }
  }]);

  return Endpoint;
}();

;
var _default = Endpoint;
exports.default = _default;
"use strict";

require("core-js/modules/es6.object.define-property");

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
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var header = {
  cache: {
    pragma: {
      'Pragma': 'no-cache'
    },
    maxAge: function maxAge(seconds) {
      return {
        'Cache-Control': "max-age=".concat(seconds)
      };
    },
    maxStale: function maxStale(seconds) {
      return {
        'Cache-Control': "max-stale=".concat(seconds)
      };
    },
    minRefresh: function minRefresh(seconds) {
      return {
        'Cache-Control': "max-stale=".concat(seconds)
      };
    },
    noCache: {
      'Cache-Control': 'no-cache'
    },
    noStore: {
      'Cache-Control': 'no-store'
    },
    noTransform: {
      'Cache-Control': 'no-transform'
    },
    onlyIfCache: {
      'Cache-Control': 'only-if-cached'
    },
    immutable: {
      'Cache-Control': 'immutable'
    },
    staleWhileRevalidate: function staleWhileRevalidate(seconds) {
      return {
        'Cache-Control': "stale-while-revalidate=".concat(seconds)
      };
    },
    staleIfError: function staleIfError(seconds) {
      return {
        'Cache-Control': "stale-if-error=".concat(seconds)
      };
    } //, ...

  }
};
var _default = header;
exports.default = _default;
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.object.values");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _mimeType = _interopRequireDefault(require("./mime-type.core"));

var _sanitize2 = _interopRequireDefault(require("./sanitize.core"));

var _exception2 = _interopRequireDefault(require("./exception.core"));

var _utility = require("../common/utility.common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

    var headers = appendHeaders(new Headers({
      'Accept': _mimeType.default.json,
      'Content-Type': _mimeType.default.json
    }), options.headers);
    var fetchOptions = Object.assign.apply(Object, [{
      method: 'GET',
      credentials: 'include',
      headers: headers
    }].concat(_toConsumableArray(options.args)));
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
    }), options.headers); // request options

    var construct = Object.assign.apply(Object, [{
      headers: headers,
      method: 'POST',
      body: (0, _utility.stringify)(options.data || {}),
      credentials: 'include'
    }].concat(_toConsumableArray(options.args)));
    return fetch(options.url, construct);
  },
  put: function put(options
  /* { method = '', url = '', data = {}, headers = [], ...args } */
  ) {
    if (!options.url) throw new TypeError('loader.post => options.url is invalid, null or undefined'); // generate headers (extend if neccessary)

    var headers = appendHeaders(new Headers({
      'Accept': _mimeType.default.json,
      'Content-Type': _mimeType.default.json
    }), options.headers); // request options

    var construct = Object.assign.apply(Object, [{
      headers: headers,
      method: 'PUT',
      body: (0, _utility.stringify)(options.data || {}),
      credentials: 'include'
    }].concat(_toConsumableArray(options.args)));
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
    if (!options.method || requestTypes.indexOf(options.method.toLowerCase()) === -1) throw new TypeError('loader.do => options.method is invalid, null or undefined');
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
"use strict";

require("core-js/modules/es6.object.define-property");

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
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

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
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _endpoint = _interopRequireDefault(require("./core/endpoint.core"));

var _loader = _interopRequireDefault(require("./core/loader.core"));

var _global = _interopRequireDefault(require("./api/global.api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Endpoint: _endpoint.default,
  loader: _loader.default,
  api: _global.default
};
exports.default = _default;
