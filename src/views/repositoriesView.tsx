import {observer} from "mobx-react";
import MainContext from "../services/mainContext";
import RepositoryList from "../components/repositoryList";
import {BasicLoadingState} from "../services/loadingStates";
import * as React from "react";
import {RouteComponentProps} from "react-router-dom";

type ExpectedProps = RouteComponentProps<{
    scmId: string,
    orgName: string,
}>;

export default observer(class Repositories extends React.Component<ExpectedProps> {
    static contextType = MainContext;

    componentDidMount() {
        const {scmId, orgName} = this.props.match.params;
        this.context.repoStore.loadOrganizationRepos(scmId, orgName);
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
        const {scmId, orgName} = this.props.match.params;
        const {scmStore} = this.context;

        const scmName = scmStore.getById(scmId)?.name;
        return orgName && scmName ? `${scmName}: ${orgName} organization` : '';
    }

    renderRepos() {
        let result;
        const {state} = this.context.repoStore;
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

