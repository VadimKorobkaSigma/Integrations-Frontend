import * as React from "react";
import Organization from "../dtos/organization";
import OrganizationRow from './organizationRow';

type ExpectedProps = { organizations: Organization[], baseUrl: string }

export default function OrganizationList(props: ExpectedProps) {
    let result;
    const {organizations, baseUrl} = props;
    if (!organizations?.length) {
        result = <p>No organizations found.</p>
    } else {
        result = <table>
            <tbody>
            {organizations.map(org => <OrganizationRow key={org.id} organization={org} baseUrl={baseUrl}/>)}
            </tbody>
        </table>
    }
    return result;
}