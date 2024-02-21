import AppController from '../controller/controller';
import { AppView } from '../view/appView';

interface IApp {
    controller: AppController;
    view: AppView;
    start(): void;
}

class App implements IApp {
    private readonly _controller: AppController;
    private readonly _view: AppView;
    constructor() {
        this._controller = new AppController();
        this._view = new AppView();
    }
    get controller() {
        return this._controller;
    }
    get view() {
        return this._view;
    }

    start() {
        const sourcesElement: HTMLElement = document.querySelector('.sources') as HTMLElement;
        sourcesElement.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
