import domWrapper from './domWrapper';
import { HttpRequestConfig } from './httpRequestConfig';

const baseURL = process.env.API_URL;
class HttpClient {
    get(url: string, config?: HttpRequestConfig) {
        if (config) {
            url = this.expandPathParams(url, config);
            delete config.pathParams;
        }
        return fetch(url, config)
            .then((r) => r.json())
            .then((data) => ({ data }));
    }

    post(url: string, config: HttpRequestConfig, data: { [key: string]: any } = {}) {
        url = this.expandPathParams(url, config);
        delete config.pathParams;
        const body = new FormData();
        for (const name in data) {
            body.append(name, data[name]);
        }
        return fetch(url, { ...config, method: 'post', body });
    }

    request(url: string, config: HttpRequestConfig, data: { [key: string]: any } = {}) {
        url = this.expandPathParams(url, config);
        delete config.pathParams;
        const body = new FormData();
        for (const name in data) {
            body.append(name, data[name]);
        }
        return fetch(url, { ...config, body });
    }

    private expandPathParams(url: string, config: HttpRequestConfig) {
        if (url && config.pathParams) {
            const params = config.pathParams;
            for (const name in params) {
                const value = params[name];
                url = url.replace(`:${name}`, domWrapper.encodePathSegment(value));
            }
        }

        return `${baseURL}/${url}`;
    }
}

export default new HttpClient();
