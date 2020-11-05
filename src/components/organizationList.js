import React from "react";
import {Link} from "react-router-dom";

export default function OrganizationList(props) {
    let result;
    const {organizations, baseUrl} = props;
    if (!organizations?.length) {
        result = <p>No organizations found.</p>
    } else {
        result = <ul>{
            organizations.map(org =>
                <li key={org.id}>
                    <Link to={`${baseUrl}/${org.name}/repos`}>{org.name}</Link>
                </li>
            )
        }</ul>
    }
    return result;
}