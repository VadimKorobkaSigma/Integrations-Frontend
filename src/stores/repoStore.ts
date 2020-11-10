import {makeAutoObservable} from "mobx";
import {Repository} from '../dtos/repository'
import {BasicLoadingState} from "../services/loadingStates";
import {RepoService} from '../services/repoService';

export default class RepoStore {
    repos: Repository[] = []
    state: BasicLoadingState = 'initial';
    private readonly repoService = new RepoService();

    constructor() {
        makeAutoObservable(this);
    }

    async loadOrganizationRepos(scmId, orgName) {
        console.info(`Getting repos for the '${orgName}' ${scmId} organization`);
        this.state = 'loading';
        this.repos = [];

        try {
            const response = await this.repoService.getOrganizationRepos(scmId, orgName);
            this.setRepos(response);
        } catch (e) {
            this.handleError(e);
        }
    }

    private setRepos = response => {
        this.repos = response.data;
        this.state = 'completed';
    };

    private handleError = error => {
        console.error("Error getting organization repos.", error);
        this.state = 'error';
    };
}