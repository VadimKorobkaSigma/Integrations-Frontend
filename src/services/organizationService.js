export default {
    getOrganizations: function () {
        return new Promise(resolve => resolve([
            {id: 'org1', name: 'checkmarx-ltd'},
            {id: 'org3', name: 'example-com'},
            {id: 'org42', name: 'test-js'},
        ]));
    }
}