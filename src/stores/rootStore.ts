import CombinedScmStore from "./combinedScmStore";
import OrganizationStore from "../services/organizationStore";
import RepoStore from "../services/repoStore";

export class RootStore {
    readonly scmStore = new CombinedScmStore();
    readonly orgStore = new OrganizationStore();
    readonly repoStore = new RepoStore();
}