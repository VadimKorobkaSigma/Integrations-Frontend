import {makeAutoObservable} from "mobx";
import Organization from "../dtos/organization";
import axios from 'axios';
import oauthState from "../services/oauthState";

export default class OrganizationStore {
    organizations: Organization[] = [];
    state: 'loading' | 'completed' | 'invalidOAuthState' | 'generalError' = 'completed';

    constructor() {
        makeAutoObservable(this);
    }

    getOrganizationsByScm(scmId, authCode, state) {
        this.state = 'loading';
        this.organizations = [];

        if (oauthState.isSameAsStored(state)) {
            OrganizationStore.getOrgs(scmId, authCode)
                .then(this.setOrgs)
                .catch(this.handleError);
        } else {
            this.state = "invalidOAuthState";
        }
    }

    private static getOrgs(scmId, authzCode) {
        const encodedScmId = window.encodeURIComponent(scmId);
        return axios.get(`/api/${encodedScmId}/user/orgs`, {
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
