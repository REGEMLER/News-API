import News from './news/news';
import Sources from './sources/sources';
import SelectLang from './select/select';
import { articleData, sourceData } from '../types/types';

interface IAppView {
    news: News;
    sources: Sources;
    select: SelectLang;
    drawNews(data?: articleData): void;
    drawSources(data?: sourceData): void;
    drawSelect(data?: sourceData): void;
}

export class AppView implements IAppView {
    private readonly _news: News;
    private readonly _sources: Sources;
    private readonly _select: SelectLang;
    constructor() {
        this._news = new News();
        this._sources = new Sources();
        this._select = new SelectLang();
    }
    get news() {
        return this._news;
    }
    get sources() {
        return this._sources;
    }
    get select() {
        return this._select;
    }

    drawNews(data: articleData | undefined | null) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSelect(data: sourceData | undefined | null) {
        const values = data?.sources ? data?.sources : [];
        const countrys: string[] = [];
        values.forEach((item) => countrys.push(item.language));
        const result = [...new Set(countrys)];
        this.select.draw(result);
    }

    drawSources(data: sourceData | undefined | null) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
