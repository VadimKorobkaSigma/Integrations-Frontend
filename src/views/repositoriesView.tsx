import {observer} from "mobx-react";
import MainContext from "../services/mainContext";
import RepositoryList from "../components/repositoryList";
import {BasicLoadingState} from "../services/loadingStates";
import * as React from "react";
import {RouteComponentProps} from "react-router-dom";

type ExpectedProps = RouteComponentProps<{
    scmId: string,
    orgId: string,
}>;

export default observer(class extends React.Component<ExpectedProps> {
    static contextType = MainContext;

    componentDidMount() {
        const {scmId, orgId} = this.props.match.params;
        this.context.repoStore.loadOrganizationRepos(scmId, orgId);
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
        const {scmStore} = this.context;

        const scmName = scmStore.getById(scmId)?.name;
        return orgId && scmName ? `${scmName}: ${orgId} organization` : '';
    }

    renderRepos() {
        let result;
        const {state} = this.context.repoStore;
        if (state === 'completed') {
            const {scmId, orgId} = this.props.match.params;
            result = <RepositoryList
                repositories={this.context.repoStore.repos}
                scmId={scmId}
                orgId={orgId}/>
        } else {
            result = this.renderLoadingMessage(state);
        }
        return result;
    }

    renderLoadingMessage(state: BasicLoadingState) {
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
