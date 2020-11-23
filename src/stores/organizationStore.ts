import {makeAutoObservable} from "mobx";
import Organization from "../dtos/organization";
import authStore from "./authStore";
import {OauthExtendedLoadingState} from "../services/loadingStates";
import {OrganizationService} from "../services/organizationService";

export default class OrganizationStore {
    organizations: Organization[] = [];
    state: OauthExtendedLoadingState = 'initial';
    private readonly orgService = new OrganizationService();

    constructor() {
        makeAutoObservable(this);
    }

    async loadOrganizationsByScm(scmId, authCode, stateFromCallbackUrl) {
        this.state = 'loading';
        this.organizations = [];

        if (authStore.isSameAsStoredState(stateFromCallbackUrl)) {
            await this.doLoadOrganizations(scmId, authCode);
        } else {
            this.state = "invalidOAuthState";
        }
    }

    // TODO: this method relies on existing state: SCM orgs must already be loaded.
    // Orgs cannot be loaded without an auth code => fix this method when the auth flow changes.
    getById(orgId: string): Organization | undefined {
        return this.organizations.find(org => org.id === orgId);
    }

    private async doLoadOrganizations(scmId, authCode) {
        try {
            const orgs = await this.orgService.getOrgs(scmId, authCode);
            this.completeLoading(orgs);
        } catch (e) {
            this.state = 'error';
        }
    }

    private completeLoading(orgs) {
        this.organizations = orgs;
        this.state = 'completed';
    }
}
