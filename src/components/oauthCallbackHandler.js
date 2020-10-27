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
        const queryString = new URLSearchParams(window.location.search);

        authService.getAccessToken(queryString.get('code'))
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
