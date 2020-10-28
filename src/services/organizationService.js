import {action, makeAutoObservable} from "mobx";

class OrganizationService {
    organizations = []

    constructor() {
        makeAutoObservable(this);
    }

    getOrganizations(scmId) {
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

    getById(orgId) {
        return Promise.resolve({id: orgId, name: 'checkmarx-ltd'});
    }
}

export default new OrganizationService();