import React, {useContext} from "react";
import {Link} from "react-router-dom";
import MainContext from "../services/mainContext";

export default function ScmsView() {
    const {scmStore} = useContext(MainContext)
    return (
        <div>
            <h2>Source control management platforms</h2>
            <ul>
                {scmStore.getAll().map(scm =>
                    <li key={scm.id}>
                        <Link to={`/scm/${scm.id}/authorize`}>{scm.name}</Link>
                    </li>
                )}
            </ul>
        </div>
    );
}