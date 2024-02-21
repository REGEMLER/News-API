import News from './news/news';
import Sources from './sources/sources';
import { articleData, sourceData } from '../types/types';

interface IAppView {
    news: News;
    sources: Sources;
    drawNews(data?: articleData): void;
    drawSources(data?: sourceData): void;
}

export class AppView implements IAppView {
    private readonly _news: News;
    private readonly _sources: Sources;
    constructor() {
        this._news = new News();
        this._sources = new Sources();
    }
    get news() {
        return this._news;
    }
    get sources() {
        return this._sources;
    }

    drawNews(data?: articleData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data?: sourceData) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
