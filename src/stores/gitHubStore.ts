import {ScmStore} from "../dtos/scmStore";
import {makeAutoObservable} from "mobx";
import authStore from "./authStore";
import {BasicLoadingState} from "../services/loadingStates";
import domWrapper from "../services/domWrapper";
import httpClient from "../services/httpClient";

export default class GitHubStore implements ScmStore {
    id = 'github'
    name = 'GitHub'
    authServerPageUrl = null
    state: BasicLoadingState = 'initial';

    constructor() {
        makeAutoObservable(this);
    }

    loadAuthServerPageUrl() {
        this.state = 'loading';
        httpClient.get(`:id/config`, {pathParams: {id: this.id}})
            .then(response => this.setPageUrl(response))
            .catch(() => {
                this.state = 'error';
            });
    }

    private setPageUrl(configResponse) {
        const config = configResponse.data;
        const origin = domWrapper.getCurrentOrigin();
        const query = {
            client_id: config.clientId,
            redirect_uri: `${origin}/scm/${this.id}/organizations`,
            state: authStore.createAndRememberState(),
            scope: config.scope
        };
        const queryString = new URLSearchParams(query);
        this.authServerPageUrl = `https://github.com/login/oauth/authorize?${queryString}`;
        this.state = 'completed';
    }
}