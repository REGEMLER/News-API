import './select.css';

interface ISelectLang {
    draw(data: string[]): void;
}

class SelectLang implements ISelectLang {
    public draw(data: string[]) {
        const options: string[] = data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#selectItemTemp');
        if (newsItemTemp) {
            const selectClone: Node | null = newsItemTemp.content.cloneNode(true);
            options.forEach((item: string) => {
                if (selectClone instanceof DocumentFragment) {
                    const select: Element | null = selectClone.querySelector('#selectID');
                    const option: HTMLOptionElement = document.createElement('option');
                    option.textContent = item;
                    option.value = item;
                    if (select) {
                        select.append(option);
                    }
                }
            });
            const h2: HTMLHeadingElement = document.createElement('h2');
            h2.textContent = 'Select news language';
            fragment.append(h2);
            fragment.append(selectClone);
        }
        const selectsElement: HTMLElement | null = document.querySelector('.selects');
        if (selectsElement) {
            selectsElement.innerHTML = '';
            selectsElement.appendChild(fragment);
        }
    }
}

export default SelectLang;
