import React from "react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import MainContext from "../services/mainContext";
import Organization from "../dtos/organization";

export default observer(class Organizations extends React.Component {
    static contextType = MainContext;
    private context;
    private props;

    componentDidMount() {
        const {scmId} = this.props.match.params;
        const query = new URLSearchParams(window.location.search);
        const authCode = query.get('code');
        const state = query.get('state');
        this.context.orgStore.getOrganizationsByScm(scmId, authCode, state);
    }

    render() {
        const {scmStore, orgStore} = this.context;
        return (
            <div>
                <h2>{scmStore.getById(this.props.match.params.scmId).name}</h2>
                <h3>Organizations</h3>
                {this.renderOrgs(orgStore)}
            </div>
        )
    }

    renderOrgs(orgStore) {
        let result;

        switch (orgStore.state) {
            case 'completed':
                result = this.renderOrgList(orgStore.organizations);
                break;
            case 'loading':
                result = <div>Loading...</div>;
                break;
            case 'invalidOAuthState':
                result = <div>Invalid OAuth state. You can try again from <Link to={'/'}>here</Link>.</div>;
                break;
            case 'generalError':
                result = <div>An error has occurred. You can try again from <Link to={'/'}>here</Link></div>;
                break;
            default:
                result = '';
        }
        return result;
    }

    renderOrgList(orgs: Organization[]) {
        let result;
        if (!orgs || !orgs.length) {
            result = <p>No organizations found.</p>
        } else {
            result = <ul>{
                orgs.map(org =>
                    <li key={org.id}>
                        <Link to={`${this.props.match.url}/${org.id}/repos`}>{org.name}</Link>
                    </li>
                )
            }</ul>
        }
        return result;
    }
})