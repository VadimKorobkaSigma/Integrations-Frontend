import React from "react";
import * as QueryString from "querystring";

const APP_CLIENT_ID = 'Iv1.9a90765be1851cbd';

const ScmSelector = () => {
    const query = QueryString.stringify({
        client_id: APP_CLIENT_ID,
        redirect_uri: `${document.location.origin}/callback`,
        state: 'hello',
        scope: 'user email repo write:repo_hook'
    });

    return <div>
        <h1>Source control management platform</h1>
        <a href={`https://github.com/login/oauth/authorize?${query}`}>GitHub</a>
    </div>
};

export default ScmSelector;