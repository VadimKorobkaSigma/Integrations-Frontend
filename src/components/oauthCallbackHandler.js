import React from 'react';
import authService from "../services/authService";

class OAuthCallbackHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null
        }
    }

    componentDidMount() {
        authService.getAccessToken()
            .then(result => this.setState({token: result}));
    }

    render() {
        return (
            <div>
                Access token: {this.state.token || 'loading...'}
            </div>
        );
    }
}

export default OAuthCallbackHandler;
