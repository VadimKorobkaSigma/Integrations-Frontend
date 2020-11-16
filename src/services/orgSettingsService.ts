import OrgSettings from "../dtos/orgSettings";
import httpClient from "./httpClient";
import {UrlPaths} from "./urlPaths";
import {HttpRequestConfig} from "./httpRequestConfig";

export class OrgSettingsService {
    async getSettings(scmId: string, orgId: string): Promise<OrgSettings> {
        const config: HttpRequestConfig = {pathParams: {scmId, orgId}}
        const response = await httpClient.get(UrlPaths.organization.settings, config);
        return response?.data;
    }

    async saveSettings(scmId: string, orgId: string, settings: OrgSettings): Promise<void> {
        const config: HttpRequestConfig = {
            method: 'put',
            url: UrlPaths.organization.settings,
            pathParams: {scmId, orgId},
            data: settings
        };
        httpClient.request(config);
        return Promise.resolve();
    }
}