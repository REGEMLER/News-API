type op = (data?: cbData) => void;
type Options = { sources?: string; apiKey?: string };
type respParams = { endpoint: string; options?: Options };
type source = {
    id: string;
    category: string;
    country: string;
    description: string;
    language: string;
    name: string;
    url: string;
};
type article = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    urlToImage: string;
    url: string;
    source: { id: string; name: string };
};
type cbData = { status: string; totalResults?: number; sources?: source[]; articles?: article[] };

export interface ILoader {
    baseLink: string;
    options: Options;
    getResp(params: respParams, callback: op): void;
    errorHandler(res: Response): Response | void;
    makeUrl(options: Options, endpoint: string): string;
    load(method: string, endpoint: string, callback: (data: cbData) => void, options: Options): void;
}

class Loader implements ILoader {
    constructor(
        public baseLink: string,
        public options: Options
    ) {}

    getResp(
        params: respParams,
        callback: op = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', params.endpoint, callback, params.options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Options, endpoint: string): string {
        const urlOptions: Options = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        const urlStrings: [string, string][] = Object.entries(urlOptions);

        urlStrings.forEach((item: [string, string]) => {
            const key = item[0];
            const value = item[1];
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: cbData) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
