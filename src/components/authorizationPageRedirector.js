import React from "react";
import scmService from "../services/scmService.ts";

export default class AuthorizationPageRedirector extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.location.href = scmService.getById(this.props.match.params.scmId)
            .getAuthServerPageUrl();
    }

    render() {
        return 'Checking authorization parameters...';
    }
}
