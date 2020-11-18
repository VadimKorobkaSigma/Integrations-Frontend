import {ScmService} from "../dtos/scmService";
import GitHubService from "../services/gitHubService";
import GitLabService from "../services/gitLabService";
import {BasicLoadingState} from "../services/loadingStates";
import configService from "../services/configService";
import {makeAutoObservable} from "mobx";
import ScmConfiguration from "../dtos/scmConfiguration";

export default class ScmStore {
    private readonly innerStores: ScmService[] = [
        new GitHubService(),
        new GitLabService(),
    ];

    state: BasicLoadingState = 'initial';
    authServerPageUrl: string;

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Start generating authorization page URL for the specified SCM.
     * The page is used in OAuth flow.
     */
    async loadAuthorizationPageUrl(scmId: string) {
        console.info(`Loading authorization page URL for the '${scmId}' SCM.`);
        const scm = this.prepareForLoading(scmId);
        if (scm) {
            await this.loadPageUrlUsingConfig(scm);
        } else {
            console.error(`Unable to generate auth page URL. Invalid SCM ID: ${scmId}`);
            this.handleError();
        }
    }

    getById(id: string): ScmService | undefined {
        return this.innerStores.find(store => store.id === id);
    }

    getAll(): ScmService[] {
        return this.innerStores;
    }

    private prepareForLoading(scmId: string) {
        this.state = 'loading';
        this.authServerPageUrl = null;
        return this.getById(scmId);
    }

    private async loadPageUrlUsingConfig(scm: ScmService) {
        try {
            const config = await configService.getConfiguration(scm.id);
            this.completeLoading(config, scm);
        } catch {
            console.error(`Error getting configuration for the '${scm.id}' SCM.`);
            this.handleError();
        }
    }

    private handleError() {
        this.state = 'error';
    }

    private completeLoading(config: ScmConfiguration, scm: ScmService) {
        this.authServerPageUrl = scm.generatePageUrl(config);
        this.state = 'completed';
    }
}