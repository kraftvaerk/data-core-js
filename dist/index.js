parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"0pG5":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var n=function(){function t(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"GET",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];e(this,t),o=o instanceof Array?o:[o],this.method=r,this.url=n,this.data=a,this.headers=o;for(var i=arguments.length,s=new Array(i>4?i-4:0),h=4;h<i;h++)s[h-4]=arguments[h];this.args=Object.assign.apply(Object,[{}].concat(s))}return r(t,[{key:"options",value:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return Object.assign.apply(Object,[{method:this.method,url:this.url,data:this.data,headers:this.headers},this.args].concat(t))}}]),t}(),a=n;exports.default=a;
},{}],"qlvM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t={css:"text/css",html:"text/html",script:"text/javascript",json:"application/json",xml:"application/xml",xhtml:"application/xhtml+xml",stream:"application/octet-stream"},e=t;exports.default=e;
},{}],"e7az":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./mime-type.core"));function t(e){return e&&e.__esModule?e:{default:e}}var n={core:function(t){var n=t.headers?t.headers.get("content-type"):"";if(n.includes(e.default.json))return t.json();if(n.includes(e.default.html))return t.text();if(n.includes(e.default.stream))return t.blob();throw new TypeError("content-type not available")},json:function(t){if((t.headers?t.headers.get("content-type"):"").includes(e.default.json))return t.json();throw new TypeError("content-type not available")},html:function(t){if((t.headers?t.headers.get("content-type"):"").includes(e.default.json))return t.text();throw new TypeError("content-type not available")},stream:function(t){if((t.headers?t.headers.get("content-type"):"").includes(e.default.json))return t.blob();throw new TypeError("content-type not available")}},r=n;exports.default=r;
},{"./mime-type.core":"qlvM"}],"0its":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.name="InvalidResponseError",this.message=e,this.exc=r};e.prototype=new Error;var r={InvalidResponseError:e};exports.default=r;
},{}],"Slwy":[function(require,module,exports) {
"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.replaceStringParams=exports.replaceObjectParams=exports.replacePlaceholderParams=exports.clone=exports.parseJSON=exports.stringify=void 0;var e=function(r){return JSON.stringify(r)};exports.stringify=e;var t=function(r){return JSON.parse(r)};exports.parseJSON=t;var n=function(r){return t(e(r))};exports.clone=n;var o=function(r,e,t){if(!r)return"";if("string"!=typeof r)throw new TypeError("invalid placeholder or placeholder is not an string",r);if(n&&!(n instanceof RegExp))throw new TypeError("invalid regex: the regex is not a properly formatted regular expression i.e. /{\\d}/g ",n);e=e instanceof Array?e:[e];var n=/{\d}|{\d,\d}|{\d,\d-\d}/g,o=-1,a=e.length,i="{".concat(a-1,"}"),s="{".concat(a,"}"),l=r.indexOf(i)>-1,c=r.indexOf(s)>-1,p=r.indexOf(i)+i.length;return(r=t?r.substring(0,l&&c?p:r.length):r).replace(n,function(r){var t=r.substring(1,r.length-1).split(","),n=1===t.length?0:t[1].split("-")[0],i=1===t.length?void 0:t[1].split("-")[1];return++o<a?void 0!==e[o]?e[o].toString().substring(n,i):null:r})};exports.replacePlaceholderParams=o;var a=function(n,o){if(!n)return{};if("object"!==r(n)&&n.constructor===Object)throw new TypeError("invalid model or model is not an object",n);o=o instanceof Array?o:[o];var a=/{(.*?)}/,i=e(n).replace(/"{\d}"/g,function(r){var t=r.match(a),n=t.length>0?t[1]:-1;return n>-1&&n<o.length?e(o[n]):r});return t(i)};exports.replaceObjectParams=a;var i=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r.replace(/{(.*?)}/g,function(r){return e[r.substring(1,r.length-1)]})};exports.replaceStringParams=i;var s={stringify:e,parseJSON:t,clone:n,replacePlaceholderParams:o,replaceObjectParams:a,replaceStringParams:i};exports.default=s;
},{}],"gvlF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=o(require("./mime-type.core")),t=o(require("./sanitize.core")),n=o(require("./exception.core")),r=require("../common/utility.common");function o(e){return e&&e.__esModule?e:{default:e}}function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var d=["GET","HEAD","POST","PUT","DELETE","TRACE","OPTIONS","CONNECT","PATCH"],a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(e=e||new Headers,!t.length)return e;for(var n=0,r=t.length;n<r;n++)e.append(Object.keys(t[n])[0],Object.values(t[n])[0]);return e},l={get:function(t){if(!t.url)throw new TypeError("loader.get => options.url is invalid, null or undefined");var n="";if(t.data&&"object"===i(t.data))for(var r in t.data)n+="&"+r+"="+encodeURIComponent(t.data[r]);n.length>0&&(n="?"+n.slice(1));var o=a(new Headers({Accept:e.default.json,"Content-Type":e.default.json}),t.headers),d=Object.assign({method:"GET",credentials:"include",headers:o},t.args);return fetch(t.url+n,d)},head:function(e){throw new Error("loader.head => not yet implemented...")},post:function(t){if(!t.url)throw new TypeError("loader.post => options.url is invalid, null or undefined");var n=a(new Headers({Accept:e.default.json,"Content-Type":e.default.json}),t.headers),o=Object.assign({headers:n,method:"POST",body:(0,r.stringify)(t.data||{}),credentials:"include"},t.args);return fetch(t.url,o)},put:function(t){if(!t.url)throw new TypeError("loader.post => options.url is invalid, null or undefined");var n=a(new Headers({Accept:e.default.json,"Content-Type":e.default.json}),t.headers),o=Object.assign({headers:n,method:"PUT",body:(0,r.stringify)(t.data||{}),credentials:"include"},t.args);return fetch(t.url,o)},delete:function(e){throw new Error("loader.delete => not yet implemented...")},trace:function(e){throw new Error("loader.trace => not yet implemented...")},options:function(e){throw new Error("loader.options => not yet implemented...")},connect:function(e){throw new Error("loader.connect => not yet implemented...")},do:function(e){if(!e)throw new TypeError("loader.do => options is invalid, null or undefined");if(!e.method||-1===d.indexOf(e.method.toUpperCase()))throw new TypeError("loader.do => options.method is invalid, null or undefined");if(!e.url)throw new TypeError("loader.do => options.url is invalid, null or undefined");return this[e.method.toLowerCase()](e).then(function(e){if(!e.ok){var r="response.status: ".concat(e.status," | url: ").concat(e.url);return t.default.core(e).then(function(e){throw new n.default.InvalidResponseError(r,e)})}return e.clone()}).catch(function(e){throw e})},sync:function(e){throw new Error("loader.sync => not yet implemented...")}},u=l;exports.default=u;
},{"./mime-type.core":"qlvM","./sanitize.core":"e7az","./exception.core":"0its","../common/utility.common":"Slwy"}],"baCp":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("../core/loader.core")),r=t(require("../core/sanitize.core"));function t(e){return e&&e.__esModule?e:{default:e}}var o={call:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,o=(arguments.length>1&&arguments[1],arguments.length>2&&void 0!==arguments[2]?arguments[2]:"json");if(!t)throw new TypeError("api.call(endpoint, type) requries a valid endpoint object",t);return e.default.do(t).then(r.default[o])}},l=o;exports.default=l;
},{"../core/loader.core":"gvlF","../core/sanitize.core":"e7az"}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"Endpoint",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(exports,"loader",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(exports,"sanitize",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(exports,"mime",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(exports,"api",{enumerable:!0,get:function(){return o.default}});var e=u(require("./core/endpoint.core")),r=u(require("./core/loader.core")),t=u(require("./core/sanitize.core")),n=u(require("./core/mime-type.core")),o=u(require("./api/global.api"));function u(e){return e&&e.__esModule?e:{default:e}}
},{"./core/endpoint.core":"0pG5","./core/loader.core":"gvlF","./core/sanitize.core":"e7az","./core/mime-type.core":"qlvM","./api/global.api":"baCp"}]},{},["Focm"], null)
//# sourceMappingURL=/index.map