import * as QueryString from 'query-string';
import callbackState from './callbackState';

export default [
    {
        name: 'GitHub',
        getAuthServerPageUrl: function() {
            const query = QueryString.stringify({
                client_id: process.env.GITHUB_APP_CLIENT_ID,
                redirect_uri: `${window.location.origin}/callback`,
                state: callbackState.createNew(this.name),
                scope: 'user email repo write:repo_hook'
            });
            return `https://github.com/login/oauth/authorize?${query}`;
        }
    },

    {
        name: 'GitLab',
        getAuthServerPageUrl: () => '#'
    },
];