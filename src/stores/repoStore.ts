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
        const operation = this.currentWebhookOperation;
        operation.state = 'loading';
        operation.repoId = repoLocator.repoId;
        try {
            await this.repoService.createWebhook(repoLocator);
            const updatedRepo = this.repos.find(repo => repo.id === repoLocator.repoId);
            if (updatedRepo) {
                updatedRepo.webhookEnabled = true;
            } else {
                console.warn('Target repo was not found among the loaded repos.');
            }
            operation.state = 'completed';
        } catch (e) {
            operation.state = 'error';
            console.error('Error setting repo webhook', e);
        }
    }
}