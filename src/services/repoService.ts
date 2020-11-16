import {Repository} from "../dtos/repository";
import RepoLocator from "../dtos/repoLocator";
import httpClient from "./httpClient";
import {HttpRequestConfig} from "./httpRequestConfig";
import {UrlPaths} from "./urlPaths";

export class RepoService {
    async getOrganizationRepos(scmId, orgId): Promise<Repository[]> {
        const config = {pathParams: {scmId, orgId}};
        const response = await httpClient.get(UrlPaths.repos, config);
        return response.data;
    }

    // returns new webhook ID
    async createWebhook(repoLocator: RepoLocator): Promise<string> {
        let {scmId, orgId, repoId} = repoLocator;
        const config = {pathParams: {scmId, orgId, repoId}};
        const response = await httpClient.post(UrlPaths.webhooks.create, null, config);
        return response.data;
    }

    async removeWebhook(repoLocator: RepoLocator) {
        let {scmId, orgId, repoId, webhookId} = repoLocator;

        const config: HttpRequestConfig = {
            method: 'delete',
            url: UrlPaths.webhooks.remove,
            pathParams: {scmId, orgId, repoId, webhookId}
        };
        return httpClient.request(config);
    }
}