import {makeAutoObservable} from "mobx";
import Organization from "../dtos/organization";
import axios from 'axios';
import authStore from "./authStore";

export default class OrganizationStore {
    organizations: Organization[] = [];
    state: 'loading' | 'completed' | 'invalidOAuthState' | 'generalError' = 'completed';

    constructor() {
        makeAutoObservable(this);
    }

    getOrganizationsByScm(scmId, authCode, state) {
        this.state = 'loading';
        this.organizations = [];

        if (authStore.isSameAsStoredState(state)) {
            OrganizationStore.getOrgs(scmId, authCode)
                .then(this.setOrgs)
                .catch(this.handleError);
        } else {
            this.state = "invalidOAuthState";
        }
    }

    private static getOrgs(scmId, authzCode) {
        const encodedScmId = window.encodeURIComponent(scmId);

        // Using post, because this API both performs OAuth authorization and returns organizations.
        // These two calls should be separated in the future.
        return axios.post(`/api/${encodedScmId}/user/orgs`, null, {
            params: {
                code: authzCode
            }
        });
    }

    private handleError = () => {
        this.state = 'generalError';
    };

    private setOrgs = response => {
        this.organizations = response.data.map(org => ({id: org.id + '', name: org.login}));
        this.state = 'completed';
    };

    getOrganizationById(orgId): Organization {
        return this.organizations.find(org => org.id === orgId);
    }
}
