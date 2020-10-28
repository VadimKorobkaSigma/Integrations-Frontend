import React from "react";
import oauthConfigs from "../services/oauthConfigs";

export default class AuthorizationPageRedirector extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {scmId} = this.props.match.params;
        window.location = oauthConfigs.find(scm => scm.id === scmId)
            .getAuthServerPageUrl();

    }

    render() {
        return 'Checking authorization parameters...';
    }
}
