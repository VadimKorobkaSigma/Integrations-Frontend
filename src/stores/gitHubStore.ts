import {ScmStore} from "../dtos/scmStore";
import {makeAutoObservable} from "mobx";
import authStore from "./authStore";
import {BasicLoadingState} from "../services/loadingStates";
import domWrapper from "../services/domWrapper";
import ScmConfiguration from "../dtos/scmConfiguration";
import configService from '../services/configService';

export default class GitHubStore implements ScmStore {
    readonly id = 'github'
    readonly name = 'GitHub'
    authServerPageUrl = null
    state: BasicLoadingState = 'initial';

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Start generating GitHub authorization page URL. The page is used in OAuth flow.
     */
    async loadAuthServerPageUrl() {
        this.state = 'loading';
        this.authServerPageUrl = null;
        try {
            const config = await configService.getConfiguration(this.id);
            this.authServerPageUrl = this.generatePageUrl(config);
            this.state = 'completed';
        } catch {
            this.state = 'error';
        }
    }

    private generatePageUrl(config: ScmConfiguration) {
        const origin = domWrapper.getCurrentOrigin();
        const query = {
            client_id: config.clientId,
            scope: config.scope,
            redirect_uri: `${origin}/scm/${this.id}/organizations`,
            state: authStore.createAndRememberState()
        };
        const queryString = new URLSearchParams(query);
        return `https://github.com/login/oauth/authorize?${queryString}`;
    }
}