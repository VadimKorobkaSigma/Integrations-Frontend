import * as React from "react";
import MainContext from "../services/mainContext";
import {observer} from "mobx-react";
import {BasicLoadingState} from "../services/loadingStates";
import domAdapter from "../services/domWrapper";
import {PropsWithScmId} from "../components/mainRoutes";
import domWrapper from "../services/domWrapper";


/**
 * Upon loading, determines OAuth redirection page URL for the current SCM.
 * Then redirects the browser to the URL.
 */
export default observer(class AuthorizationPageRedirector extends React.Component<PropsWithScmId> {
    private readonly WORKING = 'Checking authorization parameters...';

    private readonly messageMap: { [prop in BasicLoadingState]: string } = {
        initial: '',
        completed: this.WORKING,
        loading: this.WORKING,
        error: 'Unable to determine redirection URL.'
    }

    static contextType = MainContext;

    componentDidMount() {
        domWrapper.setWindowTitle('Authorization');
        this.getCurrentScm()?.loadAuthServerPageUrl();
    }

    render() {
        const scm = this.getCurrentScm();
        const message = (scm ? this.messageMap[scm.state] : 'Invalid SCM.');

        if (scm?.authServerPageUrl) {
            domAdapter.startRedirectingToExternalUrl(scm.authServerPageUrl);
        }

        return <div>{message}</div>;
    }

    getCurrentScm = () => this.context.scmStore.getById(this.props.match.params.scmId);
});
