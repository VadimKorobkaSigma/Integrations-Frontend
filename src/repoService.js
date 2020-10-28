export default {
    getOrganizationRepos(scmId, orgId) {
        console.info(`Getting repos for ${scmId} organization ${orgId}`);
        return Promise.resolve([
            {id: 'id1', name: 'my-example-repo'},
            {id: 'id2', name: 'another-repo'},
        ]);
    }
}