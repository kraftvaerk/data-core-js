import _loader from '../core/loader.core';
import _sanitize from '../core/sanitize.core';



const api = {

    call: (endpoint = null, data, type = 'json') => {
        if(!endpoint) throw new TypeError('api.call(endpoint, type) requries a valid endpoint object', endpoint);
        return _loader.do(endpoint).then(_sanitize[type]);
    }

};

export default api;
