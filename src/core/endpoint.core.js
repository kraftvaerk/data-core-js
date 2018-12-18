// endpoint options class
class Endpoint {
    constructor (method = 'GET', url = '#', data = {}, headers = [], ...args) {
        this.method = method;
        this.url = url;
        this.data = data;
        this.headers = headers;
        this.args = Object.assign({}, ...args);
    };

    options(...additionalArgs) {
        return Object.assign({
            method: this.method, 
            url: this.url, 
            data: this.data, 
            headers: this.headers
        }, ...this.args, ...additionalArgs);
    }
};

export default Endpoint;
