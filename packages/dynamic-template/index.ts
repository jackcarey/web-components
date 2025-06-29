export class DynamicTemplate extends HTMLElement {
    static datasetAttribute = 'dynamic-template';
    #observer: MutationObserver | null;
    constructor() {
        super();
    }
    connectedCallback() {
        if (!this.#observer) {
            this.#observer = new MutationObserver(() => {
                this.#render();
            });
        }
        this.#observer.observe(document.body, { childList: true, subtree: true });
        this.#render();
    }
    disconnectedCallback() {
        if (this.#observer) {
            this.#observer.disconnect();
            this.#observer = null;
        }
    }
    #render() {
        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open',
                delegatesFocus: true
            });
        }
        const dataEl = this.closest(`[data-${DynamicTemplate.datasetAttribute}]`);
        const templateName = (dataEl as HTMLElement).dataset.dynamicTemplate;
        const tagName = this.tagName.toLowerCase();
        const templateId = templateName ? `${templateName}-${tagName}` : undefined;
        const template = templateId ? document.querySelector(`template[id=${templateId}]`) as HTMLTemplateElement | null : null;

        const exportedParts = template?.getAttribute('exportparts');
        if (exportedParts) {
            this.setAttribute('exportparts', exportedParts);
        } else {
            this.removeAttribute('exportparts');
        }

        if (template) {
            const clone = template.content.cloneNode(true) as DocumentFragment;
            this.shadowRoot!.innerHTML = '';
            this.shadowRoot!.appendChild(clone);
        } else {
            this.shadowRoot!.innerHTML = `<slot></slot>`;
        }
    }
}