import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '079c8c7ea9934928b012ca75054cac58', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
