import {Repository} from "../dtos/repository";
import RepoLocator from "../dtos/repoLocator";
import httpClient from "./httpClient";
import {HttpRequestConfig} from "./httpRequestConfig";

export class RepoService {
    async getOrganizationRepos(scmId, orgId): Promise<Repository[]> {
        const config = {pathParams: {scmId, orgId}};
        const response = await httpClient.get(`:scmId/orgs/:orgId/repos`, config);
        return response.data;
    }

    createWebhook(repoLocator: RepoLocator) {
        let {scmId, orgId, repoId} = repoLocator;
        const config = {pathParams: {scmId, orgId, repoId}};
        return httpClient.post(':scmId/orgs/:orgId/repos/:repoId/webhooks', null, config);
    }

    async removeWebhook(repoLocator: RepoLocator) {
        let {scmId, orgId, repoId, webhookId} = repoLocator;

        const config: HttpRequestConfig = {
            method: 'delete',
            url: ':scmId/orgs/:orgId/repos/:repoId/webhooks/:webhookId',
            pathParams: {scmId, orgId, repoId, webhookId}
        };
        return httpClient.request(config);
    }
}