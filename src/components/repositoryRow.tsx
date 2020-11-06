import * as React from "react";

export function RepositoryRow(props) {
    return <tr>
        <td>{props.repo.name}</td>
        <td>
            <button>Scan with Checkmarx</button>
        </td>
        <td>
            <button>Set webhook</button>
        </td>
    </tr>;
}