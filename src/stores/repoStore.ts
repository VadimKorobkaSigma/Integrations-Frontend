import {action, makeAutoObservable} from "mobx";
import {Repository} from '../dtos/repository'


export default class RepoStore {
    repos: Repository[] = []

    constructor() {
        makeAutoObservable(this);
    }

    getOrganizationRepos(scmId, orgId) {
        console.info(`Getting repos for ${scmId} organization ${orgId}`);
        const assignRepos = action(() => {
            console.info('Assigning repos.');
            this.repos = [
                {id: 'id1', name: 'my-example-repo'},
                {id: 'id2', name: 'another-repo'},
            ];
        });
        assignRepos();
    }
}