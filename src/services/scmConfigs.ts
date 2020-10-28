import callbackState from './callbackState';

interface ScmConfig {
    id: string,
    name: string,
    clientId: string,
    scope: string,
    getAuthServerPageUrl: () => string
}

const scmConfigs: ScmConfig[] = [
    {
        id: 'github',
        name: 'GitHub',
        clientId: process.env.GITHUB_APP_CLIENT_ID,
        scope: 'user email repo write:repo_hook',
        getAuthServerPageUrl: function () {
            const query = {
                client_id: this.clientId,
                redirect_uri: `${window.location.origin}/scm/${this.id}/organizations`,
                state: callbackState.createNew(this.id),
                scope: this.scope
            };
            const queryString = new URLSearchParams(query);
            return `https://github.com/login/oauth/authorize?${queryString}`;
        }
    },

    {
        id: 'gitlab',
        name: 'GitLab',
        clientId: '',
        scope: '',
        getAuthServerPageUrl: function () {
            return '';
        }
    }
]

export default scmConfigs;