export const UrlPaths = {
    config: ':scmId/config',
    organizations: ':scmId/user/orgs',
    repos: ':scmId/orgs/:orgId/repos',
    webhooks: {
        create: ':scmId/orgs/:orgId/repos/:repoId/webhooks',
        remove: ':scmId/orgs/:orgId/repos/:repoId/webhooks/:webhookId'
    }
}