import {makeAutoObservable} from "mobx";
import Organization from "../dtos/organization";
import axios from 'axios';
import authStore from "../stores/authStore";
import {OauthExtendedLoadingState} from "./loadingStates";
import domWrapper from "./domWrapper";

export default class OrganizationStore {
    organizations: Organization[] = [];
    state: OauthExtendedLoadingState = 'idle';

    constructor() {
        makeAutoObservable(this);
    }

    loadOrganizationsByScm(scmId, authCode, stateFromCallbackUrl) {
        this.state = 'loading';
        this.organizations = [];

        if (authStore.isSameAsStoredState(stateFromCallbackUrl)) {
            OrganizationStore.getOrgs(scmId, authCode)
                .then(this.setOrgs)
                .catch(this.handleError);
        } else {
            this.state = "invalidOAuthState";
        }
    }

    private static getOrgs(scmId, authCode) {
        const encodedScmId = domWrapper.encodePathSegment(scmId);

        // Using post, because this API both performs OAuth authorization and returns organizations.
        // These two calls should be separated in the future.
        return axios.post(`/api/${encodedScmId}/user/orgs`, null, {
            params: {
                code: authCode
            }
        });
    }

    private handleError = () => {
        this.state = 'error';
    };

    private setOrgs = response => {
        this.organizations = response.data.map(org => ({id: org.id + '', name: org.login}));
        this.state = 'completed';
    };

    getOrganizationById(orgId): Organization {
        return this.organizations.find(org => org.id === orgId);
    }
}
