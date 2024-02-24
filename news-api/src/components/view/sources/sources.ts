import './sources.css';
import { source } from '../../types/types';

interface ISources {
    draw(data: source[]): void;
}

class Sources implements ISources {
    public draw(data: source[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (sourceItemTemp) {
            data.forEach((item: source) => {
                const sourceClone: Node | null = sourceItemTemp.content.cloneNode(true);
                if (sourceClone instanceof DocumentFragment) {
                    const sourceItemNameElement: HTMLElement | null = sourceClone.querySelector('.source__item-name');
                    if (sourceItemNameElement) sourceItemNameElement.textContent = item.name;
                    const sourceItemElement: HTMLElement | null = sourceClone.querySelector('.source__item');
                    if (sourceItemElement) sourceItemElement.setAttribute('data-source-id', item.id);
                    fragment.append(sourceClone);
                }
            });
        }
        const sourcesElement: HTMLElement | null = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.innerHTML = '';
            sourcesElement.append(fragment);
        }
    }
}

export default Sources;
