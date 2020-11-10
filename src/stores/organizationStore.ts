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

    private async doLoadOrganizations(scmId, authCode) {
        try {
            this.organizations = await this.orgService.getOrgs(scmId, authCode);
            this.state = 'completed';
        } catch (e) {
            this.state = 'error';
        }
    }
}
