import * as React from 'react';
import { observer } from 'mobx-react';

import MainContext from '@services/mainContext';

import { Repository } from '@dtos/repository';
import RepoLocator from '@dtos/repoLocator';

type PropType = { repo: Repository; repoLocator: RepoLocator };

export default observer(
    class RepositoryRow extends React.Component<PropType> {
        static contextType = MainContext;

        createWebhook = () => {
            this.context.repoStore.createRepoWebhook(this.props.repoLocator);
        };

        removeWebhook = () => {
            this.context.repoStore.removeRepoWebhook(this.props.repoLocator);
        };

        render() {
            const { state } = this.context.repoStore.currentWebhookOperation;
            const { name, webhookEnabled } = this.props.repo;
            const canSet = !webhookEnabled && state !== 'loading';
            const canRemove = webhookEnabled && state !== 'loading';

            return (
                <tr>
                    <td>{name}</td>
                    <td>
                        <button disabled={!canSet} onClick={this.createWebhook}>
                            Set webhook
                        </button>
                    </td>
                    <td>
                        <button disabled={!canRemove} onClick={this.removeWebhook}>
                            Remove webhook
                        </button>
                    </td>
                    <td>{this.getLoadingMessage()}</td>
                </tr>
            );
        }

        private getLoadingMessage() {
            const { state, repoId } = this.context.repoStore.currentWebhookOperation;
            let result = '';
            if (repoId === this.props.repoLocator.repoId) {
                result = { loading: 'Working...', error: 'Error!' }[state];
            }
            return result;
        }
    },
);
