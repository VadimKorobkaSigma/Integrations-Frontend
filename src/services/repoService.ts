import {Repository} from "../dtos/repository";
import RepoLocator from "../dtos/repoLocator";
import httpClient from "./httpClient";

export class RepoService {
    async getOrganizationRepos(scmId, orgId): Promise<Repository[]> {
        const config = {pathParams: {scmId, orgId}};
        const response = await httpClient.get(`:scmId/orgs/:orgId/repos`, config);
        return response.data.map(this.toInternalRepo);
    }

    private toInternalRepo = (repoFromResponse): Repository => {
        const {name, webHookEnabled} = repoFromResponse;
        return {id: name, name, webHookEnabled};
    };

    setWebhook(repoLocator: RepoLocator) {
        let {scmId, orgId, repoId} = repoLocator;
        const config = {pathParams: {scmId, orgId, repoId}};
        return httpClient.post(':scmId/orgs/:orgId/repos/:repoId/webhook', null, config);
    }
}