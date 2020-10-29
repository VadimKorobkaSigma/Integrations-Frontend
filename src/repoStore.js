import {action, makeAutoObservable} from "mobx";

class RepoStore {
    repos = []

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

export default new RepoStore();