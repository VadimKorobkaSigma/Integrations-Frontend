import callbackState from './callbackState';

interface ScmConfig {
    id: string,
    name: string,
    getAuthServerPageUrl: () => string
}

interface FullScmConfig {
    name: string,
    clientId: string,
    scope: string,
    getAuthServerPageUrl: () => string
}

const scmConfigs: { [id: string]: FullScmConfig } = {
    'github': {
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
    'gitlab': {
        name: 'GitLab',
        clientId: '',
        scope: '',
        getAuthServerPageUrl: function () {
            return '';
        }
    }
}

// {
//     id: 'gitlab',
//     name: 'GitLab',
//     clientId: '',
//     scope: '',
//     getAuthServerPageUrl: function () {
//         return '';
//     }
// }


// const scmConfigs: ExtendedScmConfig[]

export default {
    getById: function (id: string): ScmConfig | null {
        const config = scmConfigs[id];
        return config ? {
            id,
            name: config.name,
            getAuthServerPageUrl: config.getAuthServerPageUrl
        } : null;
    },

    getAll: function (): ScmConfig[] {
        return Object.getOwnPropertyNames(scmConfigs)
            .map(this.getById);
    }
};