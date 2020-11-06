import {ScmStore} from "../dtos/scmStore";
import GitHubStore from "./gitHubStore";
import GitLabStore from "./gitLabStore";

export default class CombinedScmStore {
    private readonly innerStores: ScmStore[] = [
        new GitHubStore(),
        new GitLabStore(),
    ];

    getById(id: string): ScmStore | undefined {
        return this.innerStores.find(store => store.id === id);
    }

    getAll(): ScmStore[] {
        return this.innerStores;
    }
}