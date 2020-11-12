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

    async createRepoWebhook(repoLocator: RepoLocator) {
        console.info('Creating webhook for the repo:', repoLocator);
        this.switchIntoLoadingState(repoLocator);
        try {
            await this.repoService.createWebhook(repoLocator);
            this.setWebhookStateLocally(repoLocator, true);
            this.currentWebhookOperation.state = 'completed';
        } catch (e) {
            this.currentWebhookOperation.state = 'error';
            console.error('Error setting repo webhook', e);
        }
    }

    async removeRepoWebhook(repoLocator: RepoLocator) {
        console.info('Removing webhook for the repo:', repoLocator);
        this.switchIntoLoadingState(repoLocator);
        try {
            await this.repoService.removeWebhook(repoLocator);
            this.setWebhookStateLocally(repoLocator, false);
            this.currentWebhookOperation.state = 'completed';
        } catch (e) {
            this.currentWebhookOperation.state = 'error';
            console.error('Error removing repo webhook', e);
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