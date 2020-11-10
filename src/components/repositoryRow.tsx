import * as React from "react";
import {Repository} from "../dtos/repository";

export function RepositoryRow(props: { repo: Repository }) {
    function setWebhook() {
        console.log('setWebhook');
    }

    function removeWebhook() {
        console.log('removeWebhook');
    }

    const {repo} = props;
    return <tr>
        <td>{repo.name}</td>
        <td>
            <button disabled>Scan with Checkmarx</button>
        </td>
        <td>
            <button disabled={repo.webHookEnabled} onClick={setWebhook}>Set webhook</button>
        </td>
        <td>
            <button disabled={!repo.webHookEnabled} onClick={removeWebhook}>Remove webhook</button>
        </td>
    </tr>;
}