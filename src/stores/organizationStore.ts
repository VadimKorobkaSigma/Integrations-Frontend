import {makeAutoObservable} from "mobx";
import Organization from "../dtos/organization";
import authStore from "./authStore";
import {OauthExtendedLoadingState} from "../services/loadingStates";
import {OrganizationService} from "../services/organizationService";

export default class OrganizationStore {
    organizations: Organization[] = [];
    state: OauthExtendedLoadingState = 'idle';
    orgService = new OrganizationService();

    constructor() {
        makeAutoObservable(this);
    }

    async loadOrganizationsByScm(scmId, authCode, stateFromCallbackUrl) {
        this.state = 'loading';
        this.organizations = [];

        if (authStore.isSameAsStoredState(stateFromCallbackUrl)) {
            try {
                const orgs = await this.orgService.getOrgs(scmId, authCode);
                this.setOrgs(orgs);
            } catch (e) {
                this.handleError();
            }
        } else {
            this.state = "invalidOAuthState";
        }
    }

    private handleError = () => {
        this.state = 'error';
    };

    /**
     * Normalize raw organizations
     * @param orgsFromResponse
     */
    private setOrgs = orgsFromResponse => {
        this.organizations = orgsFromResponse.map(org => ({id: org.id + '', name: org.login}));
        this.state = 'completed';
    };

    getOrganizationById(orgId): Organization {
        return this.organizations.find(org => org.id === orgId);
    }
}
