import oauthState from "../services/oauthState";
import {ScmConfig} from "../dtos/scmConfig";

const scmConfigs: ScmConfig[] = [
    {
        id: 'github',
        name: 'GitHub',
        getAuthServerPageUrl: function () {
            const query = {
                client_id: process.env.GITHUB_APP_CLIENT_ID,
                redirect_uri: `${window.location.origin}/scm/${this.id}/organizations`,
                state: oauthState.create(this.id),
                scope: process.env.GITHUB_OAUTH_SCOPES
            };
            const queryString = new URLSearchParams(query);
            return `https://github.com/login/oauth/authorize?${queryString}`;
        }
    },
    {
        id: 'gitlab',
        name: 'GitLab',
        getAuthServerPageUrl: function () {
            return '';
        }
    }
]

export default class ScmStore {
    getById(id: string): ScmConfig | undefined {
        return scmConfigs.find(config => config.id === id);
    }

    getAll(): ScmConfig[] {
        return scmConfigs;
    }
}