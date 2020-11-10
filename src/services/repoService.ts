import domWrapper from "./domWrapper";
import axios from "axios";

export class RepoService {
    async getOrganizationRepos(scmId, orgName) {
        const safeScmId = domWrapper.encodePathSegment(scmId);
        const safeOrgName = domWrapper.encodePathSegment(orgName);

        // Using organization name (and not id) to conform to GitHub requirements.
        // This may be changed later with the introduction of other SCM support.
        return await axios.get(`/api/${safeScmId}/orgs/${safeOrgName}/repos1`);
    }
}