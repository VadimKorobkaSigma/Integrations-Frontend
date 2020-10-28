import React from "react";
import scmService from "../services/scmService.ts";

export default class AuthorizationPageRedirector extends React.Component {
    constructor(props) {
        super(props);

        const scm = scmService.getById(this.props.match.params.scmId);
        this.state = {
            redirectTo: scm ? scm.getAuthServerPageUrl() : null
        }
    }

    componentDidMount() {
        if (this.state.redirectTo) {
            window.location.href = this.state.redirectTo;
        }
    }

    render() {
        return this.state.redirectTo ? 'Checking authorization parameters...' : 'SCM not found.';
    }
}
