import ScmStore from "./scmStore";
import OrganizationStore from "./organizationStore";
import RepoStore from "./repoStore";

export class RootStore {
    readonly scmStore = new ScmStore();
    readonly orgStore = new OrganizationStore();
    readonly repoStore = new RepoStore();
}