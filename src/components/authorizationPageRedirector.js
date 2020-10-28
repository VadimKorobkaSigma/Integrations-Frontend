import React from "react";
import scmConfigs from "../services/scmConfigs.ts";

export default class AuthorizationPageRedirector extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {scmId} = this.props.match.params;
        window.location.href = scmConfigs.find(scm => scm.id === scmId)
            .getAuthServerPageUrl();

    }

    render() {
        return 'Checking authorization parameters...';
    }
}
