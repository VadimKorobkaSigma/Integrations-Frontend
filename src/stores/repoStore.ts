import {makeAutoObservable} from "mobx";
import {Repository} from '../dtos/repository'
import {BasicLoadingState} from "../services/loadingStates";
import {RepoService} from '../services/repoService';
import RepoLocator from "../dtos/repoLocator";


export default class RepoStore {
    repos: Repository[] = []
    state: BasicLoadingState = 'initial';

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

    async setRepoWebhook(repoLocator: RepoLocator) {
        await this.repoService.setWebhook(repoLocator);
        const updatedRepo = this.repos.find(repo => repo.id === repoLocator.repoId);
        if (updatedRepo) {
            updatedRepo.webHookEnabled = true;
        }
    }
}