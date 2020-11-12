import httpClient from "./httpClient";
import ScmConfiguration from "../dtos/scmConfiguration";
import {UrlPaths} from "./urlPaths";

class ConfigService {
    /**
     * Receives configuration for the provided SCM using an API call.
     */
    async getConfiguration(scmId: string): Promise<ScmConfiguration> {
        const response = await httpClient.get(UrlPaths.config, {pathParams: {scmId}});
        return response.data;
    }
}

export default new ConfigService();