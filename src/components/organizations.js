import React from "react";
import scmService from '../services/scmService.ts';
import {Link} from "react-router-dom";
import orgService from '../services/organizationService';
import {observer} from "mobx-react";

export default observer(class extends React.Component {
    constructor(props) {
        super(props);
        orgService.getOrganizations(this.props.match.params.scmId);
    }

    render() {
        return (
            <div>
                <h2>{scmService.getById(this.props.match.params.scmId).name}</h2>
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