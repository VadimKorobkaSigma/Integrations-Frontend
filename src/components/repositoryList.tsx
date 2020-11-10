import * as React from "react";
import {Repository} from "../dtos/repository";
import RepositoryRow from "./repositoryRow";
import {observer} from "mobx-react";
import RepoLocator from "../dtos/repoLocator";

type PropType = { repositories: Repository[], scmId: string, orgId: string };

export default observer(function RepositoryList(props: PropType) {
    let result;
    const {repositories, scmId, orgId} = props;

    const toRows = () => repo => {
        const locator: RepoLocator = {scmId, orgId, repoId: repo.id};
        return <RepositoryRow key={repo.id} repo={repo} repoLocator={locator}/>;
    };

    if (!repositories?.length) {
        result = <div>No repositories found for this organization.</div>;
    } else {
        result = <table>
            <tbody>
            {repositories.map(toRows)}
            </tbody>
        </table>;
    }
    return result;
});