export const parseQuery = (queryString: string) => {
    const query: { [key: string]: string | null } = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    pairs.forEach((pairRaw) => {
        const pair = pairRaw.split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    });
    return query;
};

export const normalizeString = (str: string) =>
    Array.from(str)
        .map((char) => char.replace(/[\+\*\?\{\}\(\)\[\]\.\\\|]/, `\\${char}`))
        .join('');
