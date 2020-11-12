import Organization from "../dtos/organization";
import httpClient from "./httpClient";
import {HttpRequestConfig} from "./httpRequestConfig";

export class OrganizationService {
    async getOrgs(scmId: string, authCode: string): Promise<Organization[]> {

        const requestConfig: HttpRequestConfig = {
            params: {authCode},
            pathParams: {scmId}
        };

        // Using post, because this API both performs OAuth authorization and returns organizations.
        // These two calls should be separated in the future.
        const response = await httpClient.post(':scmId/user/orgs', null, requestConfig)

        return response.data.map(this.toInternalOrg);
    }

    /**
     * Normalize raw organizations to an internal DTO. This should actually be done on the backend.
     */
    private toInternalOrg = (orgFromResponse): Organization => ({
        id: orgFromResponse.login,
        name: orgFromResponse.login
    });
}