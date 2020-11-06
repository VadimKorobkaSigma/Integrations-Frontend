import * as React from "react";
import {Repository} from "../dtos/repository";
import {RepositoryRow} from "./repositoryRow";

export default function RepositoryList(props) {
    let result;
    const repos: Repository[] = props.repositories;
    if (!repos?.length) {
        result = <div>No repositories found for this organization.</div>;
    } else {
        result = <table>
            <tbody>
            {repos.map(repo => <RepositoryRow key={repo.id} repo={repo}/>)}
            </tbody>
        </table>;
    }
    return result;
}