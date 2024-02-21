import AppLoader from './appLoader';
import { articleData, sourceData } from '../types/types';
enum endpoints {
    SOURSES = 'sources',
    EVERYTHING = 'everything',
}

class AppController extends AppLoader {
    getSources(callback: (data?: sourceData) => void) {
        super.getResp<sourceData>(
            {
                endpoint: endpoints.SOURSES,
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data?: articleData) => void) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer && target) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
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
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
