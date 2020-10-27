const cryptoRandomString = require('crypto-random-string');

class CallbackState {
    createNew(scmName) {
        return JSON.stringify({
            scm: scmName,
            random: cryptoRandomString({length: 32, type: 'alphanumeric'})
        });
    }
}
export default new CallbackState();