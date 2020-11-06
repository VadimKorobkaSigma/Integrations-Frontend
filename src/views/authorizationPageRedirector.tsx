import * as React from "react";
import MainContext from "../services/mainContext";
import {observer} from "mobx-react";
import {BasicLoadingState} from "../services/loadingStates";

/**
 * Upon loading, determines OAuth redirection page URL for the current SCM.
 * Then redirects the browser to the URL.
 */
export default observer(class AuthorizationPageRedirector extends React.Component<any,any> {
    private readonly WORKING = 'Checking authorization parameters...';

    private readonly messageMap: { [prop in BasicLoadingState]: string } = {
        idle: '',
        completed: '',
        loading: this.WORKING,
        error: 'Unable to determine redirection URL.'
    }

    static contextType = MainContext;

    componentDidMount() {
        this.getCurrentScm()?.loadAuthServerPageUrl();
    }

    render() {
        const scm = this.getCurrentScm();
        let message: string;
        if (scm) {
            if (scm.authServerPageUrl) {
                message = this.startRedirection(scm.authServerPageUrl);
            } else {
                message = this.messageMap[scm.state];
            }
        } else {
            message = 'Invalid SCM.';
        }
        return <div>{message}</div>;

    }

    getCurrentScm = () => this.context.scmStore.getById(this.props.match.params.scmId);

    private startRedirection(authServerPageUrl) {
        // Although we've already got the URL, it may take a couple of seconds for the redirect
        // to complete => setting the message to WORKING.
        window.location.href = authServerPageUrl;
        return this.WORKING;
    }
});
