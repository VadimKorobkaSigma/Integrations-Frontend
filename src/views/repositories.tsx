import {observer} from "mobx-react";
import MainContext from "../services/mainContext";
import RepositoryList from "../components/repositoryList";
import {BasicLoadingState} from "../services/loadingStates";
import * as React from "react";

export default observer(class Repositories extends React.Component<any,any> {
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

    static renderLoadingMessage(state: BasicLoadingState) {
        let result;
        switch (state) {
            case 'loading':
                result = <div>Loading...</div>;
                break;
            case 'error':
                result = <div>An error has occurred.</div>;
                break;
            default:
                result = '';
        }
        return result;
    }
})

