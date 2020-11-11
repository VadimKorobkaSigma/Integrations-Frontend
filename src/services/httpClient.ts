import {AxiosRequestConfig} from "axios";
import axios from "axios";
import domWrapper from "./domWrapper";

export interface HttpRequestConfig extends AxiosRequestConfig {
    pathParams?: object
}

class HttpClient {
    private readonly axiosInstance;

    constructor() {
        const baseURL = `${domWrapper.getCurrentOrigin()}/api`;
        this.axiosInstance = axios.create({baseURL});

        this.axiosInstance.interceptors.request.use(
            (config: HttpRequestConfig) => this.expandPathParams(config));
    }

    get(url: string, config?: HttpRequestConfig) {
        return this.axiosInstance.get(url, config);
    }

    private expandPathParams(config: HttpRequestConfig) {
        if (config.url) {
            const initialUrl = config.url;

            Object.entries(config.pathParams || {})
                .forEach(this.expandParameter(config));

            console.debug(`Request URL expansion: before: ${initialUrl}, after: ${config.url}`);
        }
        return config;
    }

    private expandParameter(config: HttpRequestConfig) {
        return ([paramName, paramValue]) => {
            const encodedValue = domWrapper.encodePathSegment(paramValue as string);
            config.url = config.url.replace(`:${paramName}`, encodedValue)
        };
    }
}

export default new HttpClient();