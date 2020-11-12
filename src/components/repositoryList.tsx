import * as React from "react";
import {Repository} from "../dtos/repository";
import RepositoryRow from "./repositoryRow";
import {observer} from "mobx-react";
import RepoLocator from "../dtos/repoLocator";

type PropType = { repositories: Repository[], scmId: string, orgId: string };

export default observer(class RepositoryList extends React.Component<PropType> {
    render() {
        let result;
        if (!this.props.repositories?.length) {
            result = <div>No repositories found for this organization.</div>;
        } else {
            result = <table>
                <tbody>
                {this.renderRows()}
                </tbody>
            </table>;
        }
        return result;
    }

    renderRows() {
        const {repositories, scmId, orgId} = this.props;
        return repositories.map(repo => {
            const locator: RepoLocator = {scmId, orgId, repoId: repo.id, webhookId: repo.webhookId};
            return <RepositoryRow key={repo.id} repo={repo} repoLocator={locator}/>;
        });
    }
});