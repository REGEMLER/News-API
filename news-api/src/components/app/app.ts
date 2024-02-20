import AppController from '../controller/controller';
import { AppView } from '../view/appView';

interface IApp {
    controller: AppController;
    view: AppView;
    start(): void;
}

class App implements IApp {
    public controller: AppController;
    public view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sourcesElement = document.querySelector('.sources') as HTMLElement;
        sourcesElement.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
