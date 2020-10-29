// import callbackState from './oauthState';

import oauthState from "./oauthState";
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
                scope: 'user email repo write:repo_hook'
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

export default {
    getById: function (id: string): ScmConfig | undefined {
        return scmConfigs.find(config => config.id === id);
    },

    getAll: function (): ScmConfig[] {
        return scmConfigs;
    }
};