import React from "react";
import scmService from '../services/scmService.ts';
import {Link} from "react-router-dom";

const SourceControlManagers = () => {
    return (
        <div>
            <h2>Source control management platforms</h2>
            <ul>
                {scmService.getAll().map(scm =>
                    <li key={scm.id}>
                        <Link to={`/scm/${scm.id}/authorize`}>{scm.name}</Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default SourceControlManagers;