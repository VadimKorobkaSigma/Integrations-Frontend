import {makeAutoObservable} from "mobx";
import {Repository} from '../dtos/repository'
import {BasicLoadingState} from "../services/loadingStates";
import {RepoService} from '../services/repoService';
import RepoLocator from "../dtos/repoLocator";


export default class RepoStore {
    repos: Repository[] = []
    state: BasicLoadingState = 'initial';
    currentWebhookOperation: { state: BasicLoadingState, repoId: string } = {state: 'initial', repoId: ''}

    private readonly repoService = new RepoService();

    constructor() {
        makeAutoObservable(this);
    }

    async loadOrganizationRepos(scmId, orgId) {
        console.info(`Getting repos for the '${orgId}' ${scmId} organization`);
        this.setState('loading');
        this.repos = [];

        try {
            this.repos = await this.repoService.getOrganizationRepos(scmId, orgId);
            this.setState('completed');
        } catch (e) {
            this.setState('error');
        }
    }

    async createRepoWebhook(repoLocator: RepoLocator) {
        console.log('Creating repo webhook.', repoLocator);
        this.switchIntoLoadingState(repoLocator);
        try {
            const createdWebhookId = await this.repoService.createWebhook(repoLocator);
            console.log(`Created a webhook with ID '${createdWebhookId}'`);
            this.updateRepoLocally(repoLocator, true, createdWebhookId);
            this.setWebhookState('completed');
        } catch (e) {
            this.setWebhookState('error');
        }
    }

    async removeRepoWebhook(repoLocator: RepoLocator) {
        console.log('Removing repo webhook.', repoLocator);
        this.switchIntoLoadingState(repoLocator);
        try {
            await this.repoService.removeWebhook(repoLocator);
            this.updateRepoLocally(repoLocator, false);
            this.setWebhookState('completed');
        } catch (e) {
            this.setWebhookState('error');
        }
    }

    private setState(value: BasicLoadingState) {
        this.state = value;
    }

    private setWebhookState(value: BasicLoadingState) {
        this.currentWebhookOperation.state = value;
    }

    private switchIntoLoadingState(repoLocator: RepoLocator) {
        this.currentWebhookOperation = {state: 'loading', repoId: repoLocator.repoId};
    }

    private updateRepoLocally(repoLocator: RepoLocator, isEnabled: boolean, webhookId: string = '') {
        const targetRepo = this.repos.find(repo => repo.id === repoLocator.repoId);
        if (targetRepo) {
            console.debug(`Setting webHookEnabled to ${isEnabled} for the ${targetRepo.name} repo.`);
            targetRepo.webhookEnabled = isEnabled;

            // It's important to have webhook ID for the case when user wants to remove
            // this webhook without leaving the view.
            targetRepo.webhookId = webhookId;
        } else {
            console.warn('Target repo was not found among the loaded repos.');
        }
    }
}