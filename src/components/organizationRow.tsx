import Organization from "../dtos/organization";
import * as React from "react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";

type PropType = { organization: Organization, baseUrl: string }

export default observer((props: PropType) => {
    const {organization, baseUrl} = props;

    return <tr className="organizationRow" key={organization.id}>
        <td>{organization.name}</td>
        <td><Link to={`${baseUrl}/${organization.id}/repos`}>repositories</Link></td>
        <td><Link to={`${baseUrl}/${organization.id}/settings`}>settings</Link></td>
    </tr>
});