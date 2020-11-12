import {makeAutoObservable} from "mobx";
import {Repository} from '../dtos/repository'
import {BasicLoadingState} from "../services/loadingStates";
import {RepoService} from '../services/repoService';
import RepoLocator from "../dtos/repoLocator";


export default class RepoStore {
    repos: Repository[] = []
    state: BasicLoadingState = 'initial';
    currentWebhookOperation: { state: BasicLoadingState, repoId: string } = {state: 'initial', repoId: null}

    private readonly repoService = new RepoService();

    constructor() {
        makeAutoObservable(this);
    }

    async loadOrganizationRepos(scmId, orgId) {
        console.info(`Getting repos for the '${orgId}' ${scmId} organization`);
        this.state = 'loading';
        this.repos = [];

        try {
            this.repos = await this.repoService.getOrganizationRepos(scmId, orgId);
            this.state = 'completed';
        } catch (e) {
            this.state = 'error';
        }
    }

    createRepoWebhook = async (repoLocator: RepoLocator) => this.changeRepoWebhook(repoLocator, 'create');

    removeRepoWebhook = async (repoLocator: RepoLocator) => this.changeRepoWebhook(repoLocator, 'remove');

    async changeRepoWebhook(repoLocator: RepoLocator, action: ('create' | 'remove')) {
        console.info(`Starting to ${action} webhook for the repo:`, repoLocator);
        const operation = this.switchIntoLoadingState(repoLocator);

        try {
            const methodName = (action === 'create' ? 'createWebhook' : 'removeWebhook');
            await this.repoService[methodName](repoLocator);

            this.setWebhookStateLocally(repoLocator, action === 'create');
            operation.state = 'completed';
        } catch (e) {
            console.error(`Failed to ${action} repo webhook.`, e);
            this.currentWebhookOperation.state = 'error';
        }
    }

    private switchIntoLoadingState(repoLocator: RepoLocator) {
        const operation = this.currentWebhookOperation;
        operation.state = 'loading';
        operation.repoId = repoLocator.repoId;
        return operation;
    }

    private setWebhookStateLocally(repoLocator: RepoLocator, isEnabled) {
        const updatedRepo = this.repos.find(repo => repo.id === repoLocator.repoId);
        if (updatedRepo) {
            console.debug(`Setting webHookEnabled to ${isEnabled} for the ${updatedRepo.name} repo.`);
            updatedRepo.webhookEnabled = isEnabled;
        } else {
            console.warn('Target repo was not found among the loaded repos.');
        }
    }
}