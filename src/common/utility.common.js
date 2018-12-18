// convert an object to a json string
export const stringify = (object) => { return JSON.stringify(object); };

// parse a json string to a js object
export const parseJSON = (object) => { return JSON.parse(object); };

// does a deep clone of an object (functions not allowed)
export const clone = (object) => { return parseJSON(stringify(object)); };

// replace placeholder parameters inside a string with provided values
// i.e. ('You are {0} years old {1}', [32], null, true ) => returns the resulting string with values replaced using the values array
// @placholder: string => "You are {0} years old"
// @values:     object/array => 26 or [26]
// @regex:      regex => defaults to digits {0}, {1}... {n} */
// @limit:      boolean => trim result to length of values
export const replacePlaceholderParams = (placeholder, values, limit) => {
    if (!placeholder) return '';
    if (typeof placeholder !== 'string') throw new TypeError('invalid placeholder or placeholder is not an string', placeholder);
    if (regex && !(regex instanceof RegExp)) throw new TypeError('invalid regex: the regex is not a properly formatted regular expression i.e. /{\\d}/g ', regex);
    values = values instanceof Array ? values : [values];
    const regex = /{\d}|{\d,\d}|{\d,\d-\d}/g;

    // trim the placeholder to size base on the array of values length
    let index = -1;
    const count = values.length; 
    const tag = `{${count - 1}}`; // placeholder tags start at index 0
    const nextTag = `{${count}}`; // detect if next tag exists
    const tagExistsInPlaceholder = placeholder.indexOf(tag) > -1;
    const nextTagExistsInPlaceholder = placeholder.indexOf(nextTag) > -1;
    const trimToIndex = placeholder.indexOf(tag) + tag.length;
    placeholder = (limit) ? placeholder.substring(0, (tagExistsInPlaceholder && nextTagExistsInPlaceholder) ? trimToIndex : placeholder.length) : placeholder;

    // insert values in placeholder tags
    let result = placeholder.replace(regex, (match) => { 
        // introducing index based string manipulation (from-to index)
        const substring = match.substring(1, match.length - 1).split(','); // [..., x-y]
        const substringStartIndex = (substring.length === 1) ? 0 : substring[1].split('-')[0]; // check substring values
        const substringLength = (substring.length === 1) ? undefined : substring[1].split('-')[1]; // declare substring length
        const manipulated = (++index < count) ? (values[index] !== undefined ? values[index].toString().substring(substringStartIndex, substringLength) : null) : match;
        return manipulated;
    });

    return result;
};

// replace placeholder parameters inside an object with provided values
// i.e. ( { a: '{0}', b: { c: {1} }}, ['value-a', 'value-c'] ) => returns an object with values replaced using the values array
// @model:      object => defaults to {}
// @values:     object/array => 26 or [26]
// @regex:      regex => defaults to digits {0}, {1}... {n} */
export const replaceObjectParams = (model, values) => {
    if (!model) return {};
    if (typeof model !== 'object' && model.constructor === Object) throw new TypeError("invalid model or model is not an object", model);
    values = values instanceof Array ? values : [values];

    const regexJSONPlaceholder = /"{\d}"/g;
    const regexPlaceholderIndex = /{(.*?)}/;

    const stringified = stringify(model);
    const result = stringified.replace(regexJSONPlaceholder, (match) => { 
        const placeholderIndex = match.match(regexPlaceholderIndex);
        const index = (placeholderIndex.length > 0) ? placeholderIndex[1] : -1;
        return (index > -1 && index < values.length) ? stringify(values[index]) : match;
    });

    return parseJSON(result);
};

// replaces placeholder values sing the object properties; object must be a of single depth
// i.e. (/api/{userID}/get/email, { userID: 123 } => returns userID placeholder replaced with the object.userID value
// @string:     string => string with placeholder params {n}
// @object:     object => flat object with properties matching the placeholder params
export const replaceStringParams = (string = '', object = {} /* flat object */) => {
    const regex = /{(.*?)}/g;
    let result = string.replace(regex, (match) => { return object[match.substring(1, match.length - 1)]; });
    return result;
};

// export defaults
export default {
    stringify,
    parseJSON,
    clone,
    replacePlaceholderParams,
    replaceObjectParams,
    replaceStringParams
};
