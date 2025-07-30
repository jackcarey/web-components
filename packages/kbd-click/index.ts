class KBDClick extends HTMLElement {

    static get observedAttributes() {
        return ['allow-repeat', 'filter', 'capture', 'passive'];
    }

    #setupListener() {

        this.removeEventListener('keydown', this.#handleKeyDown);

        const options: AddEventListenerOptions = {
            capture: this.hasAttribute('capture'),
            passive: this.hasAttribute('passive'),
            once: false,
        };
        this.addEventListener('keydown', this.#handleKeyDown, options);
    }

    #handleKeyDown = (event: KeyboardEvent) => {
        const { type, code, repeat } = event;
        if (type !== 'keydown' || !code) {
            return;
        }
        if (!this.allowRepeat && repeat) {
            return;
        }
        const filterArray = this.filter.split(',').map(item => item.trim()).filter(Boolean);
        const isFilteredIn = filterArray.length == 0 || !filterArray.includes(code);
        if (!isFilteredIn) {
            return;
        }
        const kbdEls = this.querySelectorAll('kbd');
        if (kbdEls.length === 0) {
            return;
        }
        kbdEls.forEach(kbdEl => {
            const elCode = kbdEl.getAttribute('data-code') ?? kbdEl.innerText.trim();
            const matchesEvent = elCode === code;
            if (matchesEvent) {
                kbdEl.dispatchEvent(new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                }));
            }
        }
        );
    }

    connectedCallback() {
        this.#setupListener();
    }

    disconnectedCallback() {
        this.removeEventListener('keydown', this.#handleKeyDown);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const setupAttrs = ['capture', 'passive'];
        if (setupAttrs.includes(name)) {
            this.#setupListener();
        }
    }

    get allowRepeat() {
        return this.hasAttribute('allow-repeat');
    }

    set allowRepeat(value) {
        if (value) {
            this.setAttribute('allow-repeat', '');
        } else {
            this.removeAttribute('allow-repeat');
        }
    }

    get filter() {
        return this.getAttribute('filter') || '';
    }

    set filter(value) {
        if (value) {
            this.setAttribute('filter', value);
        } else {
            this.removeAttribute('filter');
        }
    }

    get capture() {
        return this.hasAttribute('capture');
    }

    set capture(value) {
        if (value) {
            this.setAttribute('capture', '');
        } else {
            this.removeAttribute('capture');
        }
    }

    get passive() {
        return this.hasAttribute('passive');
    }

    set passive(value) {
        if (value) {
            this.setAttribute('passive', '');
        } else {
            this.removeAttribute('passive');
        }
    }

}

export default KBDClick;

if (!customElements.get('kbd-click')) {
    customElements.define('kbd-click', KBDClick);
}