import './sources.css';
import { source } from '../../types/types';

interface ISources {
    draw(data: source[]): void;
}

class Sources implements ISources {
    draw(data: source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const sourceItemNameElement = sourceClone.querySelector('.source__item-name') as HTMLElement;
            const sourceItemElement = sourceClone.querySelector('.source__item') as HTMLElement;
            sourceItemNameElement.textContent = item.name;
            sourceItemElement.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        const sourcesElement = document.querySelector('.sources') as HTMLElement;
        sourcesElement.append(fragment);
    }
}

export default Sources;
