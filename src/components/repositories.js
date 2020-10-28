import React from "react";
import scmConfigs from '../services/scmConfigs.ts';
import repoService from '../repoService';
import organizationService from "../services/organizationService";

export default class Repositories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            org: {
                name: ''
            }
        };
    }

    componentDidMount() {
        const {scmId, orgId} = this.props.match.params;
        organizationService.getById(orgId)
            .then(org => {
                this.setState({repos: [], org})
                return repoService.getOrganizationRepos(scmId, orgId)
            })
            .then(repos => {
                this.setState({repos, org: this.state.org})
            });
    }

    render() {
        return (
            <div>
                <h2>{this.getScmName()}: {this.state.org.name} organization</h2>
                <h3>Repositories</h3>
                <ul>
                    {
                        this.state.repos.map(repo =>
                            <li key={repo.id}>
                                {repo.name}
                            </li>)
                    }
                </ul>
            </div>
        );
    }

    getScmName() {
        const {scmId} = this.props.match.params;
        return scmConfigs.find(scm => scm.id === scmId).name;
    }
}
