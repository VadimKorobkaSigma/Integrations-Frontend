import {AxiosRequestConfig} from "axios";

/**
 * Extends axios request config to allow specifying params in URL path, e.g. /scm/:scmId/org/:orgId.
 * Axios itself only allows to use params in URL query string.
 */
export interface HttpRequestConfig extends AxiosRequestConfig {
    pathParams?: object
}