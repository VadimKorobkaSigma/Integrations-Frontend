import React from "react";
import OAuthConfigs from '../services/oauthConfigs';

const ScmSelector = () => {
    return (
        <div style={{fontSize: '150%', fontFamily: 'sans-serif'}}>
            <h2>Source control management platforms</h2>
            <ul>
                {OAuthConfigs.map(config =>
                    <li key={config.name}><a href={config.getAuthServerPageUrl()}>{config.name}</a></li>
                )}
            </ul>
        </div>
    );
};

export default ScmSelector;