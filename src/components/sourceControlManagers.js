import React from "react";
import OAuthConfigs from '../services/oauthConfigs';
import {Link} from "react-router-dom";

const SourceControlManagers = () => {
    return (
        <div>
            <h2>Source control management platforms</h2>
            <ul>
                {OAuthConfigs.map(scm =>
                    <li key={scm.id}>
                        <Link to={`/scm/${scm.id}/organizations`}>{scm.displayName}</Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default SourceControlManagers;