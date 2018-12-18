import _mime from './mime-type.core';
import _sanitize from './sanitize.core';
import _exception from './exception.core';
import { stringify as _stringify, clone as _clone } from '../common/utility.common';


// available fetch request types
const requestTypes = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'OPTIONS', 'CONNECT', 'PATCH']; 

// append headers to header instance
const appendHeaders = (header, headers = [] /* array containing header objects */) => {
    header = header || new Headers();
    if (!headers.length) return header;
  
    for (let i = 0, length = headers.length; i < length; i++) header.append(Object.keys(headers[i])[0], Object.values(headers[i])[0]);
    return header;
};

// loader core (get, post, do)
const loader = {

    get: (options /* { method = '', url = '', data = {}, headers = [], ...args } */) => {
        if (!options.url) throw new TypeError('loader.get => options.url is invalid, null or undefined');

        let query = '';
        if (options.data && typeof options.data === 'object') for (const prop in options.data) query += ('&' + prop + '=' + encodeURIComponent(options.data[prop]));
        if (query.length > 0) query = '?' + query.slice(1);

        // generate options and headers (extend if neccessary)
        const headers = appendHeaders(
            new Headers({ 'Accept': _mime.json, 'Content-Type': _mime.json }), 
            options.headers
        );
        const fetchOptions = Object.assign({
            method: 'GET',
            credentials: 'include',
            headers
        }, ...options.args);
        return fetch((options.url + query), fetchOptions);
    },

    head: (options /* {} */) => {
        throw new Error('loader.head => not yet implemented...');
    },

    post: (options /* { method = '', url = '', data = {}, headers = [], ...args } */) => {
        if (!options.url) throw new TypeError('loader.post => options.url is invalid, null or undefined');

        // generate headers (extend if neccessary)
        const headers = appendHeaders(
            new Headers({ 'Accept': _mime.json, 'Content-Type': _mime.json }), 
            options.headers
        );

        // request options
        const construct = Object.assign({
            headers,
            method: 'POST',
            body: _stringify(options.data || {}),
            credentials: 'include'
        }, ...options.args);

        return fetch(options.url, construct);
    },

    put: (options /* { method = '', url = '', data = {}, headers = [], ...args } */) => {
        if (!options.url) throw new TypeError('loader.post => options.url is invalid, null or undefined');

        // generate headers (extend if neccessary)
        const headers = appendHeaders(
            new Headers({ 'Accept': _mime.json, 'Content-Type': _mime.json }),
            options.headers
        );

        // request options
        const construct = Object.assign({
            headers,
            method: 'PUT',
            body: _stringify(options.data || {}),
            credentials: 'include'
        }, ...options.args);

        return fetch(options.url, construct);
    },

    delete: (options /* {} */) => {
        throw new Error('loader.delete => not yet implemented...');
    },

    trace: (options /* {} */) => {
        throw new Error('loader.trace => not yet implemented...');
    },

    options: (options /* {} */) => {
        throw new Error('loader.options => not yet implemented...');
    },

    connect: (options /* {} */) => {
        throw new Error('loader.connect => not yet implemented...');
    },

    do (options /* { method = '', url = '', data = {}, headers = [], ...args } */) {
        if (!options) throw new TypeError('loader.do => options is invalid, null or undefined');
        if (!options.method || (requestTypes.indexOf(options.method.toLowerCase()) === -1)) throw new TypeError('loader.do => options.method is invalid, null or undefined');
        if (!options.url) throw new TypeError('loader.do => options.url is invalid, null or undefined');
      
        // execute the xhr request
        return this[options.method.toLowerCase()](options)
            .then((response) => {
                // cast a custom exception to manage invalid status codes from the service calls
                if (!response.ok) {
                    const message = `response.status: ${response.status} | url: ${response.url}`;
                    return _sanitize.core(response).then((exc) => { throw new _exception.InvalidResponseError(message, exc); });
                }

                // return response copy
                return response.clone();
            })
            .catch((error) => {
                throw error;
            });
    },

    sync (queue) {
        throw new Error('loader.sync => not yet implemented...');
    }

};

export default loader;
