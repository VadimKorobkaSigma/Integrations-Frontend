import Organization from "../dtos/organization";
import httpClient from "./httpClient";
import {HttpRequestConfig} from "./httpRequestConfig";
import {UrlPaths} from "./urlPaths";

export class OrganizationService {
    async getOrgs(scmId: string, authCode: string): Promise<Organization[]> {

        const requestConfig: HttpRequestConfig = {
            params: {authCode},
            pathParams: {scmId}
        };

        // Using post, because this API both performs OAuth authorization and returns organizations.
        // These two calls should be separated in the future.
        const response = await httpClient.post(UrlPaths.organizations, null, requestConfig)

        return response.data;
    }
}