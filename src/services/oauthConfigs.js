import * as QueryString from 'query-string';

export default [
    {
        name: 'GitHub',
        getAuthServerPageUrl: () => {
            const query = QueryString.stringify({
                client_id: process.env.GITHUB_APP_CLIENT_ID,
                redirect_uri: `${window.location.origin}/callback`,
                state: 'hello',
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