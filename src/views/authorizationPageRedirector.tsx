import * as React from "react";
import MainContext from "../services/mainContext";
import {observer} from "mobx-react";
import {BasicLoadingState} from "../services/loadingStates";
import domAdapter from "../services/domWrapper";
import domWrapper from "../services/domWrapper";
import {PropsWithScmId} from "../components/mainRoutes";


/**
 * Upon loading, determines OAuth redirection page URL for the current SCM.
 * Then redirects the browser to the URL.
 */
export default observer(class AuthorizationPageRedirector extends React.Component<PropsWithScmId> {
    static contextType = MainContext;

    private readonly WORKING = 'Checking authorization parameters...';

    private readonly messageMap: { [prop in BasicLoadingState]?: string } = {
        loading: this.WORKING,
        // using 'WORKING' here, because we start redirection immediately after the state becomes 'completed'.
        completed: this.WORKING,
        error: 'Unable to determine redirection URL.'
    }

    componentDidMount() {
        domWrapper.setWindowTitle('Authorization');
        const {scmId} = this.props.match.params;
        this.context.scmStore.loadAuthorizationPageUrl(scmId);
    }

    render() {
        const {scmStore} = this.context;

        if (scmStore.authServerPageUrl) {
            domAdapter.startRedirectingToExternalUrl(scmStore.authServerPageUrl);
        }

        const message = this.messageMap[scmStore.state] || '';
        return <div>{message}</div>;
    }
});
