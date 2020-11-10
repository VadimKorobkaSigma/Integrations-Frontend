import CombinedScmStore from "./combinedScmStore";
import OrganizationStore from "./organizationStore";
import RepoStore from "../services/repoStore";

export class RootStore {
    readonly scmStore = new CombinedScmStore();
    readonly orgStore = new OrganizationStore();
    readonly repoStore = new RepoStore();
}