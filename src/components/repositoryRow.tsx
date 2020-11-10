import * as React from "react";
import {Repository} from "../dtos/repository";
import {observer} from "mobx-react";
import MainContext from "../services/mainContext";
import RepoLocator from "../dtos/repoLocator";

type PropType = { repo: Repository, repoLocator: RepoLocator };

export default observer(class RepositoryRow extends React.Component<PropType> {
    static contextType = MainContext;

    setWebhook = () => {
        this.context.repoStore.setRepoWebhook(this.props.repoLocator);
    }

    removeWebhook = () => {
        console.log('removeWebhook');
    }

    render() {
        const {state} = this.context.repoStore.currentWebhookOperation;
        const {name, webHookEnabled} = this.props.repo;
        const canSet = !webHookEnabled && state !== 'loading';

        return <tr>
            <td>{name}</td>
            <td>
                <button disabled>Scan with Checkmarx</button>
            </td>
            <td>
                <button disabled={!canSet} onClick={this.setWebhook}>
                    Set webhook{this.getLoadingMessage()}
                </button>
            </td>
            <td>
                <button disabled onClick={this.removeWebhook}>
                    Remove webhook
                </button>
            </td>
        </tr>;
    }

    private getLoadingMessage() {
        const {state, repoId} = this.context.repoStore.currentWebhookOperation;
        let result;
        if (repoId === this.props.repoLocator.repoId) {
            result = {'loading': 'working...', 'error': 'error!'}[state];
        }
        return result ? `: ${result}` : '';
    }
});