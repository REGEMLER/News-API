import AppLoader from './appLoader';
import { articleData, sourceData } from '../types/types';
enum endpoints {
    SOURSES = 'sources',
    EVERYTHING = 'everything',
}

class AppController extends AppLoader {
    getSources(callback: (data: sourceData) => void) {
        super.getResp<sourceData>(
            {
                endpoint: endpoints.SOURSES,
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: articleData) => void) {
        if (e.target instanceof HTMLElement && e.currentTarget instanceof HTMLElement) {
            let target: HTMLElement | null = e.target;
            const newsContainer: HTMLElement | null = e.currentTarget;

            while (target !== newsContainer && target) {
                if (target.classList.contains('source__item')) {
                    const sourceId: string | null = target.getAttribute('data-source-id');
                    if (typeof sourceId === 'string') {
                        if (newsContainer.getAttribute('data-source') !== sourceId) {
                            newsContainer.setAttribute('data-source', sourceId);
                            super.getResp<articleData>(
                                {
                                    endpoint: endpoints.EVERYTHING,
                                    options: {
                                        sources: sourceId,
                                    },
                                },
                                callback
                            );
                        }
                        return;
                    }
                }
                target = target.parentElement;
            }
        }
    }
}

export default AppController;
