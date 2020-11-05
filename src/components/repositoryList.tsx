import React from "react";
import {Repository} from "../dtos/repository";

export default function RepositoryList(props) {
    let result;
    const repos: Repository[] = props.repositories;
    if (!repos?.length) {
        result = <div>No repositories found for this organization.</div>;
    } else {
        result = <table>
            <tbody>
            {repos.map(repo =>
                <tr key={repo.id}>
                    <td>{repo.name}</td>
                    <td>
                        <button>Scan with Checkmarx</button>
                    </td>
                    <td>
                        <button>Set webhook</button>
                    </td>
                </tr>
            )}
            </tbody>
        </table>;
    }
    return result;
}