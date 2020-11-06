import {makeAutoObservable} from "mobx";
import {Repository} from '../dtos/repository'
import axios from 'axios';
import {BasicLoadingState} from "./loadingStates";
import domWrapper from "./domWrapper";


export default class RepoStore {
    repos: Repository[] = []
    state: BasicLoadingState = 'idle';

    constructor() {
        makeAutoObservable(this);
    }

    getOrganizationRepos(scmId, orgName) {
        console.info(`Getting repos for the '${orgName}' ${scmId} organization`);
        this.state = 'loading';
        this.repos = [];

        RepoStore.getOrgs(scmId, orgName)
            .then(this.setRepos)
            .catch(this.handleError);
    }

    private static getOrgs(scmId, orgName) {
        const safeScmId = domWrapper.encodePathSegment(scmId);
        const safeOrgName = domWrapper.encodePathSegment(orgName);

        // Using organization name (and not id) to conform to GitHub requirements.
        // This may be changed later with the introduction of other SCM support.
        return axios.get(`/api/${safeScmId}/orgs/${safeOrgName}/repos`);
    }

    private setRepos = response => {
        this.repos = response.data;
        this.state = 'completed';
    };

    private handleError = () => {
        this.state = 'error';
    };
}