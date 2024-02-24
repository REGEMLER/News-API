import './news.css';
import { article } from '../../types/types';

interface INews {
    draw(data: article[]): void;
}

class News implements INews {
    public draw(data: article[]) {
        const news: article[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (newsItemTemp) {
            news.forEach((item: article, idx: number) => {
                const newsClone: Node | null = newsItemTemp.content.cloneNode(true);
                if (newsClone instanceof DocumentFragment) {
                    if (idx % 2) {
                        const newsItemElement: HTMLElement | null = newsClone.querySelector('.news__item');
                        if (newsItemElement) newsItemElement.classList.add('alt');
                    }

                    const newsMetaPhotoElement: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
                    if (newsMetaPhotoElement) {
                        newsMetaPhotoElement.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                    }
                    const newsMetaAuthorElement: HTMLElement | null = newsClone.querySelector('.news__meta-author');
                    if (newsMetaAuthorElement) newsMetaAuthorElement.textContent = item.author || item.source.name;

                    const newsMetaDateElement: HTMLElement | null = newsClone.querySelector('.news__meta-date');
                    if (newsMetaDateElement) {
                        newsMetaDateElement.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                    }
                    const newsDescriptionTitleElement: HTMLElement | null =
                        newsClone.querySelector('.news__description-title');
                    if (newsDescriptionTitleElement) newsDescriptionTitleElement.textContent = item.title;

                    const newsDescriptionSourceElement: HTMLElement | null =
                        newsClone.querySelector('.news__description-source');
                    if (newsDescriptionSourceElement) newsDescriptionSourceElement.textContent = item.source.name;

                    const newsDescriptionContentElement: HTMLElement | null =
                        newsClone.querySelector('.news__description-content');
                    if (newsDescriptionContentElement) newsDescriptionContentElement.textContent = item.description;

                    const newsDescriptionReadElement: HTMLElement | null =
                        newsClone.querySelector('.news__read-more a');
                    if (newsDescriptionReadElement) newsDescriptionReadElement.setAttribute('href', item.url);

                    fragment.append(newsClone);
                }
            });
        }
        const newsElement: HTMLElement | null = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
