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
     * Normalize raw organizations to an internal DTO. This should actually be done on the backend.
     */
    private setOrgs = orgsFromResponse => {
        this.organizations = orgsFromResponse.map(org => ({id: org.id + '', name: org.login}));
        this.state = 'completed';
    };
}
