


/**
 * MirrorElement copies content from an element given by a selector into itself.
 */
class MirrorElement extends HTMLElement {
    static get observedAttributes() {
        return ['selector', 'strip-ids'];
    }

    #mutationObserver: MutationObserver;

    connectedCallback(): void {
        this.#setupObserver();
        this.render();
    }

    disconnectedCallback(): void {
        this.#mutationObserver?.disconnect();
    }

    attributeChangedCallback(name): void {
        if (name === 'selector') {
            this.#setupObserver();
        }
        this.render();
    }

    #setupObserver() {
        if (!this.#mutationObserver) {
            this.#mutationObserver = new MutationObserver(() => {
                this.render();
            });
        }
        this.#mutationObserver?.disconnect();
    }

    get selector(): string | null {
        return this.getAttribute('selector');
    }

    set selector(value: string | null | undefined) {
        if (value?.length) {
            this.setAttribute('selector', value);
        } else {
            this.removeAttribute('selector');
        }
    }

    get stripIds(): boolean {
        return this.hasAttribute('strip-ids');
    }

    set stripIds(value: boolean) {
        if (value) {
            this.setAttribute('strip-ids', '');
        } else {
            this.removeAttribute('strip-ids');
        }
    }

    render() {
        this.innerHTML = '';
        if (!this.selector) return;
        const el = document.querySelector(this.selector);
        if (!el) return;
        this.innerHTML = el.innerHTML;
        if (this.stripIds) {
            this.querySelectorAll('[id]').forEach(el => {
                el.removeAttribute("id");
            });
        }
    }
}

export { MirrorElement }

if (customElements && !customElements.get("mirror-element")) {
    customElements.define("mirror-element", MirrorElement);
}