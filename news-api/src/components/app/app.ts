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
        const sourcesElement: HTMLElement | null = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e) =>
                this.controller.getNews(e, (data) => this.view.drawNews(data))
            );
        } else {
            throw new Error('Something went wrong! Try again!');
        }
        const selectsElement: HTMLElement | null = document.querySelector('.selects');
        if (selectsElement) {
            selectsElement.addEventListener('change', (e) => {
                if (e.target instanceof HTMLSelectElement) {
                    const selectedLang = e.target.value;
                    if (selectedLang && typeof selectedLang === 'string') {
                        this.controller.getSources((data) => {
                            if (selectedLang === 'all') {
                                this.view.drawSources(data);
                                return;
                            }
                            const selectedData = {
                                ...data,
                                sources: data.sources.filter((item) => {
                                    return item.language === selectedLang;
                                }),
                            };
                            this.view.drawSources(selectedData);
                        });
                    }
                }
            });
        } else {
            throw new Error('Something went wrong! Try again!');
        }
        this.controller.getSources((data) => this.view.drawSources(data));
        this.controller.getSources((data) => this.view.drawSelect(data));
    }
}

export default App;
