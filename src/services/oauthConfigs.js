import * as QueryString from 'query-string';
import callbackState from './callbackState';

export default [
    {
        id: 'github',
        displayName: 'GitHub',
        getAuthServerPageUrl: function() {
            const query = QueryString.stringify({
                client_id: process.env.GITHUB_APP_CLIENT_ID,
                redirect_uri: `${window.location.origin}/scm/${this.id}/organizations`,
                state: callbackState.createNew(this.id),
                scope: 'user email repo write:repo_hook'
            });
            return `https://github.com/login/oauth/authorize?${query}`;
        }
    },

    {
        id: 'gitlab',
        displayName: 'GitLab',
        getAuthServerPageUrl: () => '#'
    },
];