export const UrlPaths = {
    config: ':scmId/config',
    organization: {
        list: ':scmId/user/orgs',
        settings: ':scmId/orgs/:orgId/settings'
    },
    repos: ':scmId/orgs/:orgId/repos',
    webhooks: {
        create: ':scmId/orgs/:orgId/repos/:repoId/webhooks',
        remove: ':scmId/orgs/:orgId/repos/:repoId/webhooks/:webhookId'
    }
}