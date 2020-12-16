const baseURL = process.env.API_URL;

const handleError = async (response: Response) => {
    if (!response.ok) {
        try {
            const result = await response.json();
            if (result && result.message) {
                throw new Error(result?.message || response.statusText);
            }
        } catch (error) {
            throw new Error(error?.message || response.statusText);
        }
    }
    return response;
};

class HttpClient {
    get(url: string, config?: RequestInit) {
        return fetch(`${baseURL}/${url}`, config)
            .then(handleError)
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
        }).then(handleError);
    }

    request(url: string, config?: RequestInit, data: { [key: string]: any } = {}) {
        return fetch(`${baseURL}/${url}`, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            ...config,
        }).then(handleError);
    }
}

export default new HttpClient();
