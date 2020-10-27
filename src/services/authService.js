
class AuthService {
    getAccessToken(authCode) {
        console.debug(`Getting access token, auth code: ${authCode}.`);

        return new Promise(resolve => {
            window.setTimeout(() => resolve('token-stub'), 2000);
        });
    }
}
export default new AuthService();