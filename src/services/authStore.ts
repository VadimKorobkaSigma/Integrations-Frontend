import domWrapper from "./domWrapper";

const cryptoRandomString = require('crypto-random-string');

const STORAGE_KEY = 'oauthState';

export default {
    createAndRememberState: function(): string {
        const result = cryptoRandomString({length: 32, type: 'alphanumeric'});

        console.debug(`Storing OAuth state: ${result}`);
        domWrapper.getSessionStorage().setItem(STORAGE_KEY, result);

        return result;
    },

    isSameAsStoredState(stateToCheck) {
        let result = false;
        const storedState = domWrapper.getSessionStorage().getItem(STORAGE_KEY);
        if (!storedState) {
            console.warn('OAuth state validation failed. No stored state was found.')
        } else if (storedState !== stateToCheck) {
            console.warn(`Stored OAuth state (${storedState}) does not match the provided state (${stateToCheck}).`);
        } else {
            result = true;
            console.debug('OAuth state validated successfully.');
        }

        if (storedState) {
            console.debug('Removing the stored OAuth state.');
            domWrapper.getSessionStorage().removeItem(STORAGE_KEY);
        }
        return result;
    }
}