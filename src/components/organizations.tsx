import React from "react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import MainContext from "../services/mainContext";

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
        return (
            <div>
                {this.renderHeader()}
                <h3>Organizations</h3>
                {this.renderOrgs()}
            </div>
        )
    }

    private renderHeader() {
        const {scmStore} = this.context;
        const {scmId} = this.props.match.params;
        const scm = scmStore.getById(scmId);
        return (scm && scm.name) ? <h2>{scm.name}</h2> : '';
    }

    renderOrgs() {
        let result;
        const {state} = this.context.orgStore;
        if (state === 'completed') {
            result = this.renderOrgList();
        } else {
            result = Organizations.renderLoadingMessage(state);
        }
        return result;
    }

    renderOrgList() {
        let result;
        const {organizations} = this.context.orgStore;
        if (!organizations || !organizations.length) {
            result = <p>No organizations found.</p>
        } else {
            result = <ul>{
                organizations.map(org =>
                    <li key={org.id}>
                        <Link to={`${this.props.match.url}/${org.name}/repos`}>{org.name}</Link>
                    </li>
                )
            }</ul>
        }
        return result;
    }

    static renderLoadingMessage(state: string) {
        let result;
        switch (state) {
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
})