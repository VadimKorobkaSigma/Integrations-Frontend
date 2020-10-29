import React from "react";
import {Link} from "react-router-dom";
import orgService from '../stores/organizationStore';
import {observer} from "mobx-react";
import MainContext from "../services/mainContext";

export default observer(class extends React.Component {
    static contextType = MainContext;

    constructor(props) {
        super(props);
        orgService.getOrganizationsByScm(this.props.match.params.scmId);
    }

    render() {
        return (
            <div>
                <h2>{this.context.scmStore.getById(this.props.match.params.scmId).name}</h2>
                <h3>Organizations</h3>
                <ul>
                    {
                        orgService.organizations.map(org =>
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