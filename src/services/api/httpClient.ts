const baseURL = process.env.API_URL;

class HttpClient {
    get(url: string, config?: RequestInit) {
        return fetch(`${baseURL}/${url}`, config)
            .then((r) => r.json())
            .then((data) => ({ data }));
    }

    post(url: string, config?: RequestInit, data: { [key: string]: any } = {}) {
        const body = new FormData();
        for (const name in data) {
            body.append(name, data[name]);
        }
        return fetch(`${baseURL}/${url}`, {
            ...config,
            method: 'post',
            body,
        });
    }

    request(url: string, config?: RequestInit, data: { [key: string]: any } = {}) {
        return fetch(`${baseURL}/${url}`, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            ...config,
        });
    }
}

export default new HttpClient();
