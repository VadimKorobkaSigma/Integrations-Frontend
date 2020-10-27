const cryptoRandomString = require('crypto-random-string');

class CallbackState {
    createNew(scmId) {
        return JSON.stringify({
            scm: scmId,
            random: cryptoRandomString({length: 32, type: 'alphanumeric'})
        });
    }
}
export default new CallbackState();