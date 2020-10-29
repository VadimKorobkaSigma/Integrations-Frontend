import {action, makeAutoObservable} from "mobx";

class OrganizationStore {
    organizations = []

    constructor() {
        makeAutoObservable(this);
    }

    getOrganizationsByScm(scmId) {
        console.info(`Getting organizations for the '${scmId}' SCM`);
        const assignOrgs = action(() => {
            this.organizations = [
                {id: 'org1', name: 'checkmarx-ltd'},
                {id: 'org3', name: 'example-com'},
                {id: 'org42', name: 'test-js'}
            ]
        })
        window.setTimeout(assignOrgs, 1000);
    }

    getOrganizationById(orgId) {
        return this.organizations.find(org => org.id === orgId);
    }
}

export default new OrganizationStore();