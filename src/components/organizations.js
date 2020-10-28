import React from "react";
import scmConfigs from '../services/scmConfigs.ts';
import {Link} from "react-router-dom";
import orgService from '../services/organizationService';

export default class Organizations extends React.Component {
    constructor(props) {
        super(props);

        const {scmId} = this.props.match.params;
        const scm = scmConfigs.find(aScm => aScm.id === scmId);
        this.state = {
            orgs: [],
            scm
        };
    }

    componentDidMount() {
        orgService.getOrganizations(this.props.match.params.scmId)
            .then(orgs => {
                this.setState({orgs, scm: this.state.scm});
            });
    }

    render() {
        return (
            <div>
                <h2>{this.state.scm.name}</h2>
                <h3>Organizations</h3>
                <ul>
                    {
                        this.state.orgs.map(org =>
                            <li key={org.id}>
                                <Link to={`${this.props.match.url}/${org.id}/repos`}>{org.name}</Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}