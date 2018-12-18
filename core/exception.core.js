
// invalid response error
const InvalidResponseError = function (message = '', exc = null) {
    this.name = 'InvalidResponseError';
    this.message = message;
    this.exc = exc;
};
InvalidResponseError.prototype = new Error();

export default { InvalidResponseError };