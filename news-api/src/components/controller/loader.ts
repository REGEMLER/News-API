import { option, respParams, fullData } from '../types/types';

type cb = (data: fullData) => void;

export interface ILoader {
    baseLink: string;
    options: option;
    getResp(params: respParams, callback: cb): void;
    errorHandler(res: Response): Response;
    makeUrl(options: option, endpoint: string): string;
    load(method: string, endpoint: string, callback: cb, options: option): void;
}

class Loader implements ILoader {
    constructor(
        readonly baseLink: string,
        readonly options: option
    ) {}

    getResp<T>(
        params: respParams,
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', params.endpoint, callback, params.options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: option, endpoint: string): string {
        const urlOptions: option = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        const urlStrings: [string, string][] = Object.entries(urlOptions);

        urlStrings.forEach((item: [string, string]) => {
            const key: string = item[0];
            const value: string = item[1];
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, endpoint: string, callback: (data: T) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
