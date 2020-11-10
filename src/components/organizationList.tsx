import * as React from "react";
import {Link} from "react-router-dom";
import Organization from "../dtos/organization";

type ExpectedProps = { organizations: Organization[], baseUrl: string }

export default function OrganizationList(props: ExpectedProps) {
    let result;
    const {organizations, baseUrl} = props;
    if (!organizations?.length) {
        result = <p>No organizations found.</p>
    } else {
        result = <ul>{
            organizations.map(org =>
                <li key={org.id}>
                    <Link to={`${baseUrl}/${org.id}/repos`}>{org.name}</Link>
                </li>
            )
        }</ul>
    }
    return result;
}