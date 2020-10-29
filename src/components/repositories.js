import React from "react";
import {observer} from "mobx-react";
import MainContext from "../services/mainContext";

export default observer(class Repositories extends React.Component {
    static contextType = MainContext;

    componentDidMount() {
        const {orgId} = this.props.match.params;
        this.context.repoStore.getOrganizationRepos(orgId);
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <h3>Repositories</h3>
                {this.renderRepoList()}
            </div>
        );
    }

    renderHeader() {
        const {scmId, orgId} = this.props.match.params;
        const {scmStore, orgStore} = this.context;

        const currentOrg = orgStore.getOrganizationById(orgId);
        const orgName = currentOrg ? currentOrg.name : null;

        const scm = scmStore.getById(scmId);
        const scmName = scm ? scm.name : null;

        return orgName && scmName ? `${scmName}: ${orgName} organization` : '';
    }

    renderRepoList() {
        const {repos} = this.context.repoStore;
        return <table>
            <tbody>
            {repos.map(repo =>
                <tr key={repo.id}>
                    <td>{repo.name}</td>
                    <td>
                        <button>Scan with Checkmarx</button>
                    </td>
                    <td>
                        <button>Set webhook</button>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    }
})

