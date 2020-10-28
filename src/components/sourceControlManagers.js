import React from "react";
import scmConfigs from '../services/scmConfigs.ts';
import {Link} from "react-router-dom";

const SourceControlManagers = () => {
    return (
        <div>
            <h2>Source control management platforms</h2>
            <ul>
                {scmConfigs.map(scm =>
                    <li key={scm.id}>
                        <Link to={`/scm/${scm.id}/authorize`}>{scm.name}</Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default SourceControlManagers;