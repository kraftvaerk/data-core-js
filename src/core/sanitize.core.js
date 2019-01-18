import _mime from './mime-type.core';



const sanitize = {

    core: (response) => {
        var contentType = response.headers ? response.headers.get('content-type') : '';
        if (contentType.includes(_mime.json)) return response.json();
        if (contentType.includes(_mime.html)) return response.text();
        if (contentType.includes(_mime.stream)) return response.blob();
        throw new TypeError('content-type not available');
    },

    json: (response) => {
        var contentType = response.headers ? response.headers.get('content-type') : '';
        if (contentType.includes(_mime.json)) return response.json();
        throw new TypeError('content-type not available');
    },

    text: (response) => {
        var contentType = response.headers ? response.headers.get('content-type') : '';
        if (contentType.includes(_mime.text)) return response.text();
        throw new TypeError('content-type not available');
    },

    html: (response) => {
        var contentType = response.headers ? response.headers.get('content-type') : '';
        if (contentType.includes(_mime.html)) return response.text();
        throw new TypeError('content-type not available');
    },

    stream: (response) => {
        var contentType = response.headers ? response.headers.get('content-type') : '';
        if (contentType.includes(_mime.stream)) return response.blob();
        throw new TypeError('content-type not available');
    }

};

export default sanitize;
