import domWrapper from "./domWrapper";
import axios from "axios";
import {Repository} from "../dtos/repository";

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
}