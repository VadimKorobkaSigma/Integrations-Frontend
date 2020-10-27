class AuthService {
    getAccessToken() {
        console.debug("Getting access token.");

        return new Promise(resolve => {
            window.setTimeout(() => resolve('token-stub'), 2000);
        });
    }
}

export default new AuthService();