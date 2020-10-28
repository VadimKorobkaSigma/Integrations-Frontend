const cryptoRandomString = require('crypto-random-string');

export default {
    create: function(scmId): string {
        return JSON.stringify({
            scm: scmId,
            random: cryptoRandomString({length: 32, type: 'alphanumeric'})
        });
    }
}