import axios, {AxiosInstance} from "axios";
import domWrapper from "./domWrapper";
import {HttpRequestConfig} from "./httpRequestConfig";

class HttpClient {
    private readonly axiosInstance: AxiosInstance;

    constructor() {
        const baseURL = `${domWrapper.getCurrentOrigin()}/api`;
        this.axiosInstance = axios.create({baseURL});

        this.axiosInstance.interceptors.request.use(
            (config: HttpRequestConfig) => this.expandPathParams(config));
    }

    get(url: string, config?: HttpRequestConfig) {
        return this.axiosInstance.get(url, config);
    }

    post(url: string, data, config: HttpRequestConfig) {
        return this.axiosInstance.post(url, data, config);
    }

    request(config: HttpRequestConfig) {
        return this.axiosInstance(config);
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
            const encodedValue = domWrapper.encodePathSegment(paramValue);
            config.url = (config.url || '').replace(`:${paramName}`, encodedValue)
        };
    }
}

export default new HttpClient();