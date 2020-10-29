import React from "react";
import MainContext from "../services/mainContext";

export default class AuthorizationPageRedirector extends React.Component {
    static contextType = MainContext;

    render() {
        const scm = this.context.scmStore.getById(this.props.match.params.scmId);
        const targetUrl = scm ? scm.getAuthServerPageUrl() : null
        let message;
        if (targetUrl) {
            message = 'Checking authorization parameters...';
            window.location.href = targetUrl;
        } else {
            message = 'Unable to determine redirection URL.'
        }
        return <div>{message}</div>;
    }
}
