import './sources.css';
import { source } from '../../types/types';

interface ISources {
    draw(data: source[]): void;
}

class Sources implements ISources {
    public draw(data: source[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: source) => {
            const sourceClone: HTMLElement = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const sourceItemNameElement: HTMLElement = sourceClone.querySelector('.source__item-name') as HTMLElement;
            const sourceItemElement: HTMLElement = sourceClone.querySelector('.source__item') as HTMLElement;
            sourceItemNameElement.textContent = item.name;
            sourceItemElement.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        const sourcesElement: HTMLElement = document.querySelector('.sources') as HTMLElement;
        sourcesElement.append(fragment);
    }
}

export default Sources;
