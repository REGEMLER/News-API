import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        if (typeof process.env.API_URL === 'string') {
            super(process.env.API_URL, {
                apiKey: process.env.API_KEY,
            });
        } else {
            throw new Error('Get your own API KEY!');
        }
    }
}

export default AppLoader;
