import React from "react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import MainContext from "../services/mainContext";

export default observer(class extends React.Component {
    static contextType = MainContext;

    constructor(props) {
        super(props);
        this.context.orgStore.getOrganizationsByScm(this.props.match.params.scmId);
    }

    render() {
        return (
            <div>
                <h2>{this.context.scmStore.getById(this.props.match.params.scmId).name}</h2>
                <h3>Organizations</h3>
                <ul>
                    {
                        this.context.orgStore.organizations.map(org =>
                            <li key={org.id}>
                                <Link to={`${this.props.match.url}/${org.id}/repos`}>{org.name}</Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
})