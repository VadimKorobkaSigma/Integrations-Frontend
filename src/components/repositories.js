import React from "react";
import {observer} from "mobx-react";
import MainContext from "../services/mainContext";
import RepositoryList from "./repositoryList.tsx";

export default observer(class Repositories extends React.Component {
    static contextType = MainContext;

    componentDidMount() {
        const {scmId, orgName} = this.props.match.params;
        this.context.repoStore.getOrganizationRepos(scmId, orgName);
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <h3>Repositories</h3>
                {this.renderRepos()}
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

    renderRepos() {
        const {state} = this.context.repoStore;
        let result;
        if (state === 'completed') {
            result = <RepositoryList repositories={this.context.repoStore.repos}/>
        } else {
            result = Repositories.renderLoadingMessage(state);
        }
        return result;
    }

    renderRepoList() {
        let result;
        const {repos} = this.context.repoStore;
        if (!repos || !repos.length) {
            result = <div>No repositories found for this organization.</div>;
        } else {
            result = <table>
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
            </table>;
        }
        return result;
    }

    static renderLoadingMessage(state) {
        let result;
        switch (state) {
            case 'loading':
                result = <div>Loading...</div>;
                break;
            case 'generalError':
                result = <div>An error has occurred.</div>;
                break;
            default:
                result = '';
        }
        return result;
    }
})

