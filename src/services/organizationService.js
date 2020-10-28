export default {
    getOrganizations: function (scmId) {
        console.info(`Getting organizations for the '${scmId}' SCM`);

        return Promise.resolve([
            {id: 'org1', name: 'checkmarx-ltd'},
            {id: 'org3', name: 'example-com'},
            {id: 'org42', name: 'test-js'}
        ]);
    },

    getById: function (orgId) {
        return Promise.resolve({id: orgId, name: 'checkmarx-ltd'});
    }
}