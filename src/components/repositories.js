import React from "react";
import repoStore from '../stores/repoStore';
import organizationStore from "../stores/organizationStore";
import {observer} from "mobx-react";
import MainContext from "../services/mainContext";

export default observer(class Repositories extends React.Component {
    static contextType = MainContext;

    componentDidMount() {
        const {scmId, orgId} = this.props.match.params;
        organizationStore.getOrganizationsByScm(scmId);
        repoStore.getOrganizationRepos(orgId);
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <h3>Repositories</h3>
                <ul>
                    {repoStore.repos.map(repo => <li key={repo.id}>{repo.name}</li>)}
                </ul>
            </div>
        );
    }

    renderHeader() {
        const currentOrg = organizationStore.getOrganizationById(this.props.match.params.orgId);
        const orgName = currentOrg ? currentOrg.name : null;
        const scm = this.context.scmStore.getById(this.props.match.params.scmId);
        const scmName = scm ? scm.name : null;
        return orgName && scmName ? `${scmName}: ${orgName} organization` : '';
    }
})

