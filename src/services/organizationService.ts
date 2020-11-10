import Organization from "../dtos/organization";
import domWrapper from "./domWrapper";
import axios from "axios";

export class OrganizationService {
    async getOrgs(scmId: string, authCode: string): Promise<Organization[]> {
        const encodedScmId = domWrapper.encodePathSegment(scmId);

        // Using post, because this API both performs OAuth authorization and returns organizations.
        // These two calls should be separated in the future.
        const response = await axios.post(`/api/${encodedScmId}/user/orgs`, null, {
            params: {
                code: authCode
            }
        });

        return response.data;
    }
}