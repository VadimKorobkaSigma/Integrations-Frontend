import {ScmStore} from "../dtos/scmStore";
import GitHubStore from "./gitHubStore";
import GitLabStore from "./gitLabStore";
import {BasicLoadingState} from "../services/loadingStates";
import configService from "../services/configService";
import {makeAutoObservable} from "mobx";
import ScmConfiguration from "../dtos/scmConfiguration";

export default class CombinedScmStore {
    private readonly innerStores: ScmStore[] = [
        new GitHubStore(),
        new GitLabStore(),
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

    private prepareForLoading(scmId: string) {
        this.state = 'loading';
        this.authServerPageUrl = null;
        return this.getById(scmId);
    }

    private async loadPageUrlUsingConfig(scm: ScmStore) {
        try {
            const config = await configService.getConfiguration(scm.id);
            this.completeLoading(config, scm);
        } catch {
            console.error(`Error getting configuration for the '${scm.id}' SCM.`);
            this.handleError();
        }
    }

    getById(id: string): ScmStore | undefined {
        return this.innerStores.find(store => store.id === id);
    }

    getAll(): ScmStore[] {
        return this.innerStores;
    }

    private handleError() {
        this.state = 'error';
    }

    private completeLoading(config: ScmConfiguration, scm: ScmStore) {
        this.authServerPageUrl = scm.generatePageUrl(config);
        this.state = 'completed';
    }
}