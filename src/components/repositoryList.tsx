import * as React from "react";
import {Repository} from "../dtos/repository";
import RepositoryRow from "./repositoryRow";
import {observer} from "mobx-react";

type PropType = { repositories: Repository[], scmId: string, orgId: string };

export default observer(function RepositoryList(props: PropType) {
    let result;
    const {repositories, scmId, orgId} = props;
    if (!repositories?.length) {
        result = <div>No repositories found for this organization.</div>;
    } else {
        result = <table>
            <tbody>
            {repositories.map(repo => <RepositoryRow key={repo.id} repository={repo} repoLocator={{
                scmId,
                orgId,
                repoId: repo.id
            }}/>)}
            </tbody>
        </table>;
    }
    return result;
});