import ScmStore from "./scmStore";
import OrganizationStore from "./organizationStore";
import RepoStore from "./repoStore";

export class RootStore {
    scmStore = new ScmStore();
    orgStore = new OrganizationStore();
    repoStore = new RepoStore();
}