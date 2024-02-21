import './news.css';
import { article } from '../../types/types';

interface INews {
    draw(data: article[]): void;
}

class News implements INews {
    public draw(data: article[]) {
        const news: article[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: article, idx: number) => {
            const newsClone: HTMLElement = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) {
                const newsItemElement: HTMLElement = newsClone.querySelector('.news__item') as HTMLElement;
                newsItemElement.classList.add('alt');
            }

            const newsMetaPhotoElement: HTMLElement = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            newsMetaPhotoElement.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const newsMetaAuthorElement: HTMLElement = newsClone.querySelector('.news__meta-author') as HTMLElement;
            newsMetaAuthorElement.textContent = item.author || item.source.name;

            const newsMetaDateElement: HTMLElement = newsClone.querySelector('.news__meta-date') as HTMLElement;
            newsMetaDateElement.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsDescriptionTitleElement: HTMLElement = newsClone.querySelector(
                '.news__description-title'
            ) as HTMLElement;
            newsDescriptionTitleElement.textContent = item.title;

            const newsDescriptionSourceElement: HTMLElement = newsClone.querySelector(
                '.news__description-source'
            ) as HTMLElement;
            newsDescriptionSourceElement.textContent = item.source.name;

            const newsDescriptionContentElement: HTMLElement = newsClone.querySelector(
                '.news__description-content'
            ) as HTMLElement;
            newsDescriptionContentElement.textContent = item.description;

            const newsDescriptionReadElement: HTMLElement = newsClone.querySelector(
                '.news__read-more a'
            ) as HTMLElement;
            newsDescriptionReadElement.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement: HTMLElement = document.querySelector('.news') as HTMLElement;
        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
