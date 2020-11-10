import * as React from "react";
import {Repository} from "../dtos/repository";
import {observer} from "mobx-react";
import MainContext from "../services/mainContext";
import RepoLocator from "../dtos/repoLocator";

type PropType = { repository: Repository, repoLocator: RepoLocator };

export default observer(class RepositoryRow extends React.Component<PropType> {
    static contextType = MainContext;

    setWebhook = () => {
        this.context.repoStore.setRepoWebhook(this.props.repoLocator);
    }

    removeWebhook = () => {
        console.log('removeWebhook');
    }

    render() {
        const {repository} = this.props;

        return <tr>
            <td>{repository.name}</td>
            <td>
                <button disabled>Scan with Checkmarx</button>
            </td>
            <td>
                <button disabled={repository.webHookEnabled} onClick={this.setWebhook}>Set
                    webhook
                </button>
            </td>
            <td>
                <button disabled={!repository.webHookEnabled} onClick={this.removeWebhook}>Remove
                    webhook
                </button>
            </td>
        </tr>;
    }
});