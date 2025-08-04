/**
 * Cite List Web Component
 * This component observes elements in the DOM and collects <cite> elements based on a selector.
 * It can limit the number of <cite> elements displayed and optionally link them to their original elements.
 * The component uses a MutationObserver to update the list dynamically when the DOM changes.
 * It renders the collected <cite> elements in an ordered list format.
 * @element cite-list
 * @attribute {string} selector - The CSS selector to observe for <cite> elements.
 * @attribute {number} limit - The maximum number of <cite> elements to display.
 * @attribute {boolean} link - If true, clicking on a list item scrolls to the corresponding <cite> element.
 * @example
 * <cite-list selector="article p" limit="5" link></cite-list>
 * This will create a list of up to 5 <cite> elements found within <article> paragraphs.
 */
export class CiteList extends HTMLElement {
    #mutationObserver: MutationObserver;
    static get observedAttributes() {
        return ['selector', 'limit', 'link'];
    }

    get selector(): string | null {
        return this.getAttribute('selector');
    }

    set selector(selector: string) {
        if (selector?.length) {
            this.setAttribute('selector', selector);
        } else {
            this.removeAttribute('selector');
        }
    }

    get limit(): number {
        try {
            const limit = parseInt(this.getAttribute("limit") || '0', 10);
            if (isNaN(limit) || limit <= 0) {
                return 0;
            }
            return limit;
        } catch (e) {
            return 0;
        }
    }

    set limit(limit: number) {
        if (limit >= 0) {
            this.setAttribute('limit', limit.toString());
        } else {
            this.removeAttribute('limit');
        }
    }

    get link(): boolean {
        return this.hasAttribute('link');
    }

    set link(value: boolean) {
        if (value) {
            this.setAttribute('link', '');
        } else {
            this.removeAttribute('link');
        }
    }

    get observedElements(): Array<Element> {
        if (!this.selector) return [document.body];
        return Array.from(this.querySelectorAll(this.selector));
    }

    get citeElements(): Array<Element> {
        const parents = this.observedElements;
        if (parents.length === 0) return [];
        const cites: Element[] = [];
        parents.forEach(parent => {
            parent.querySelectorAll('cite').forEach(citeEl => {
                if (!cites.includes(citeEl)) {
                    cites.push(citeEl);
                }
            });
        });
        return !this.limit ? cites : cites.slice(0, this.limit);
    }

    #setupObserver() {
        if (!this.#mutationObserver) {
            this.#mutationObserver = new MutationObserver(() => {
                this.#render();
            });
        }
        this.#mutationObserver?.disconnect();
        const observedElements = this.querySelectorAll(this.selector || 'cite');
        if (observedElements.length > 0) {
            observedElements.forEach(el => {
                this.#mutationObserver?.observe(el, {
                    attributes: true,
                    childList: true,
                    subtree: true,
                    characterData: true
                });
            });
        }
    }

    #render() {
        this.innerHTML = '';
        const cites = this.citeElements;
        const orderedListEl = document.createElement('ol');
        this.appendChild(orderedListEl);
        if (cites.length > 0) {
            orderedListEl.setAttribute('data-cite-count', cites.length.toString());
            const scrollToArgs: ScrollIntoViewOptions = { behavior: 'smooth', block: 'center', inline: 'center' };
            cites.forEach(cite => {
                const listItem = document.createElement('li');
                orderedListEl.appendChild(listItem);
                listItem.textContent = (cite as HTMLElement).innerText || '';
                if (cite.id) {
                    listItem.setAttribute('data-cite-id', cite.id);
                }
                if (this.link) {
                    listItem.addEventListener("click", () => {
                        cite.scrollIntoView(scrollToArgs);
                    });
                    listItem.classList.add('cite-link');
                }
            });
        }
    }

    connectedCallback() {
        this.#render();
        this.#setupObserver();
    }

    disconnectedCallback() {
        this.#mutationObserver?.disconnect();
    }

    attributeChangedCallback(name: string, _oldValue: string | null | undefined, _newValue: string | null | undefined) {
        if (name === "selector") {
            this.#setupObserver();
        }

        this.#render();
    }
}

if (customElements && !customElements.get('cite-list')) {
    customElements.define('cite-list', CiteList);
}