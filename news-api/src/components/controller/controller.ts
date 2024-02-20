import AppLoader from './appLoader';
type op = (data?: cbData) => void;
type source = {
    id: string;
    category: string;
    country: string;
    description: string;
    language: string;
    name: string;
    url: string;
};
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
type cbData = { status: string; totalResults?: number; sources?: source[]; articles?: article[] };

class AppController extends AppLoader {
    getSources(callback: op) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: op) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer && target) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
