


/**
 * MirrorElement copies content from an element given by a selector into itself.
 */
class MirrorElement extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['selector', 'strip-ids', 'disabled'];
    }

    #mutationObserver: MutationObserver;

    connectedCallback(): void {
        this.#setupObserver();
        if (!this.disabled) {
            this.render();
        }
    }

    disconnectedCallback(): void {
        this.#mutationObserver?.disconnect();
    }

    attributeChangedCallback(name: string): void {
        if (name === 'selector' || name === 'disabled') {
            this.#setupObserver();
        }
        if (!this.disabled) {
            this.render();
        }
    }

    #setupObserver() {
        this.#mutationObserver?.disconnect();

        if (this.disabled) return;

        if (!this.#mutationObserver) {
            this.#mutationObserver = new MutationObserver(() => {
                this.render();
            });
        }

        if (this.selector) {
            const target = document.querySelector(this.selector);
            if (target) {
                this.#mutationObserver.observe(target, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    characterData: true,
                });
            }
        }
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

    get disabled(): boolean {
        return this.hasAttribute('disabled');
    }

    set disabled(value: boolean) {
        if (value) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute("disabled");
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