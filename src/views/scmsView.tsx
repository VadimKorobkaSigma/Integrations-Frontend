import * as React from "react";
import {Link} from "react-router-dom";
import MainContext from "../services/mainContext";
import domWrapper from "../services/domWrapper";
import ScmStore from "../stores/scmStore";

export default class ScmsView extends React.Component {
    static contextType = MainContext;

    componentDidMount() {
        domWrapper.setWindowTitle('Source control platforms');
    }

    render() {
        const scmStore: ScmStore = this.context.scmStore;
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
}