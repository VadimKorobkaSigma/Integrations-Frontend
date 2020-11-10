import domWrapper from "./domWrapper";
import axios from "axios";
import {Repository} from "../dtos/repository";
import RepoLocator from "../dtos/repoLocator";

export class RepoService {
    async getOrganizationRepos(scmId, orgId): Promise<Repository[]> {
        const safeScmId = domWrapper.encodePathSegment(scmId);
        const safeOrgId = domWrapper.encodePathSegment(orgId);

        const response = await axios.get(`/api/${safeScmId}/orgs/${safeOrgId}/repos`);
        return response.data.map(this.toInternalRepo);
    }

    private toInternalRepo = (repoFromResponse): Repository => {
        const {name, webHookEnabled} = repoFromResponse;
        return {id: name, name, webHookEnabled};
    };

    async setWebhook(repoLocator: RepoLocator) {
        let {scmId, orgId, repoId} = repoLocator;
        scmId = domWrapper.encodePathSegment(scmId);
        orgId = domWrapper.encodePathSegment(orgId);
        repoId = domWrapper.encodePathSegment(repoId);
        await axios.post(`/api/${scmId}/orgs/${orgId}/repos/${repoId}/webhook`);
    }
}