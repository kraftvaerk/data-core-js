'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},stringify=exports.stringify=function(a){return JSON.stringify(a)},parseJSON=exports.parseJSON=function(a){return JSON.parse(a)},clone=exports.clone=function(a){return parseJSON(stringify(a))},replacePlaceholderParams=exports.replacePlaceholderParams=function(a,b,c){if(!a)return'';if('string'!=typeof a)throw new TypeError('invalid placeholder or placeholder is not an string',a);if(d)throw new TypeError('invalid regex: the regex is not a properly formatted regular expression i.e. /{\\d}/g ',void 0);b=b instanceof Array?b:[b];var d=/{\d}|{\d,\d}|{\d,\d-\d}/g,e=-1,f=b.length,g='{'+(f-1)+'}',h=-1<a.indexOf(g),i=-1<a.indexOf('{'+f+'}'),j=a.indexOf(g)+g.length;// trim the placeholder to size base on the array of values length
// placeholder tags start at index 0
// detect if next tag exists
a=c?a.substring(0,h&&i?j:a.length):a;// insert values in placeholder tags
var k=a.replace(d,function(a){// introducing index based string manipulation (from-to index)
var c=a.substring(1,a.length-1).split(','),d=1===c.length?0:c[1].split('-')[0],g=1===c.length?void 0:c[1].split('-')[1],h=++e<f?b[e]===void 0?null:b[e].toString().substring(d,g):a;// [..., x-y]
// check substring values
// declare substring length
return h});return k},replaceObjectParams=exports.replaceObjectParams=function(a,b){if(!a)return{};if('object'!==('undefined'==typeof a?'undefined':_typeof(a))&&a.constructor===Object)throw new TypeError('invalid model or model is not an object',a);b=b instanceof Array?b:[b];var c=/"{\d}"/g,d=/{(.*?)}/,e=stringify(a),f=e.replace(c,function(a){var c=a.match(d),e=0<c.length?c[1]:-1;return-1<e&&e<b.length?stringify(b[e]):a});return parseJSON(f)},replaceStringParams=exports.replaceStringParams=function()/* flat object */{var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:'',b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},c=/{(.*?)}/g,d=a.replace(c,function(a){return b[a.substring(1,a.length-1)]});return d};// convert an object to a json string
// parse a json string to a js object
// does a deep clone of an object (functions not allowed)
// replace placeholder parameters inside a string with provided values
// i.e. ('You are {0} years old {1}', [32], null, true ) => returns the resulting string with values replaced using the values array
// @placholder: string => "You are {0} years old"
// @values:     object/array => 26 or [26]
// @regex:      regex => defaults to digits {0}, {1}... {n} */
// @limit:      boolean => trim result to length of values
// replace placeholder parameters inside an object with provided values
// i.e. ( { a: '{0}', b: { c: {1} }}, ['value-a', 'value-c'] ) => returns an object with values replaced using the values array
// @model:      object => defaults to {}
// @values:     object/array => 26 or [26]
// @regex:      regex => defaults to digits {0}, {1}... {n} */
// replaces placeholder values sing the object properties; object must be a of single depth
// i.e. (/api/{userID}/get/email, { userID: 123 } => returns userID placeholder replaced with the object.userID value
// @string:     string => string with placeholder params {n}
// @object:     object => flat object with properties matching the placeholder params
// export defaults
exports.default={stringify:stringify,parseJSON:parseJSON,clone:clone,replacePlaceholderParams:replacePlaceholderParams,replaceObjectParams:replaceObjectParams,replaceStringParams:replaceStringParams};