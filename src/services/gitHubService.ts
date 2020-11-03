import {ScmConfig} from "../dtos/scmConfig";
import {makeAutoObservable} from "mobx";
import axios from "axios";
import authStore from "./authStore";
import {SimpleLoadingState} from "./simpleLoadingState";

export default class GitHubService implements ScmConfig {
    id = 'github'
    name = 'GitHub'
    authServerPageUrl = null
    state: SimpleLoadingState = 'idle';

    constructor() {
        makeAutoObservable(this);
    }

    loadAuthServerPageUrl() {
        this.state = 'loading';
        axios.get(`/api/${this.id}/config`)
            .then(response => this.setPageUrl(response))
            .catch(() => {
                this.state = 'error';
            });
    }

    private setPageUrl(configResponse) {
        const config = configResponse.data;
        const query = {
            client_id: config.clientId,
            redirect_uri: `${window.location.origin}/scm/${this.id}/organizations`,
            state: authStore.createAndRememberState(),
            scope: config.scope
        };
        const queryString = new URLSearchParams(query);
        this.authServerPageUrl = `https://github.com/login/oauth/authorize?${queryString}`;
        this.state = 'idle';
    }
}