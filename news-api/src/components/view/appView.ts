import News from './news/news';
import Sources from './sources/sources';

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
type source = {
    id: string;
    category: string;
    country: string;
    description: string;
    language: string;
    name: string;
    url: string;
};
type data = { status: string; totalResults?: number; articles?: article[]; sources?: source[] };

interface IAppView {
    news: News;
    sources: Sources;
    drawNews(data?: data): void;
    drawSources(data?: data): void;
}

export class AppView implements IAppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data?: data) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data?: data) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
