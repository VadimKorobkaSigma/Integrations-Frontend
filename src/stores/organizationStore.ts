import {makeAutoObservable} from "mobx";
import Organization from "../dtos/organization";
import axios from 'axios';

export default class OrganizationStore {
    organizations: Organization[] = [];
    state: 'loading' | 'completed' | 'invalidOAuthState' | 'generalError' = 'completed';

    constructor() {
        makeAutoObservable(this);
    }

    getOrganizationsByScm(scmId, authzCode) {
        this.state = 'loading';
        this.organizations = [];

        OrganizationStore.getOrgs(scmId, authzCode)
            .then(this.setOrgs)
            .catch(this.handleError);
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
