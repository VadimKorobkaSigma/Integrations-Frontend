import CombinedScmStore from "./combinedScmStore";
import OrganizationStore from "./organizationStore";
import RepoStore from "./repoStore";
import {OrgSettingsStore} from "./orgSettingsStore";

export class RootStore {
    readonly scmStore = new CombinedScmStore();
    readonly orgStore = new OrganizationStore();
    readonly orgSettingsStore = new OrgSettingsStore();
    readonly repoStore = new RepoStore();
}