import React from "react";
import MainContext from "../services/mainContext";
import {observer} from "mobx-react";

export default observer(class AuthorizationPageRedirector extends React.Component {
    static contextType = MainContext;
    context: any;
    props: any;

    componentDidMount() {
        this.getCurrentScm()?.loadAuthServerPageUrl();
    }

    render() {
        const scm = this.getCurrentScm();
        let message='';
        const WORKING = 'Checking authorization parameters...';
        if (scm) {
            if (scm.authServerPageUrl) {
                message = WORKING;
                window.location.href = scm.authServerPageUrl;
            } else {


                switch (scm.state) {
                    case 'loading':
                        message = WORKING;
                        break;
                    case 'error':
                        message = 'Unable to determine redirection URL.'
                        break;
                    default:
                        message = '';
                }
            }
        } else {
            message = 'Invalid SCM.';
        }
        return <div>{message}</div>;

    }

    getCurrentScm = () => this.context.scmStore.getById(this.props.match.params.scmId);
});
