import {Repository} from "../dtos/repository";
import RepoLocator from "../dtos/repoLocator";
import httpClient from "./httpClient";

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
}