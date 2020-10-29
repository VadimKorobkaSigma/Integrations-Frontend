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
        const authzCode = query.get('code');
        this.context.orgStore.getOrganizationsByScm(scmId, authzCode);
    }

    render() {
        console.log('Render');
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
                result = 'Loading...';
                break;
            case 'invalidOAuthState':
                result = 'Invalid OAuth state.';
                break;
            case 'generalError':
                result = 'An error has occurred.';
                break;
            default:
                result = '';
        }

        return <div>{result}</div>;

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