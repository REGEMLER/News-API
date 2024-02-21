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
    readonly news: News;
    readonly sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
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
