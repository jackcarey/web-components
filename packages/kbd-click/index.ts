
/**
 * Listens on the `document` for key presses then fires clicks on any inner `kbd` elements where the `data-key` or `innerText` match. This is useful for implementing keyboard shortcuts.
 * Example usage:
 * ```html
 * <kbd-click filter="a, b, c">
 *   <kbd data-key="a">A</kbd>
 *   <kbd data-key="b">B</kbd>
 *   <kbd data-key="c">C</kbd>
 * </kbd-click>
 * ```
 * This will trigger a click on the respective `kbd` element when the corresponding key is pressed, but ignore all keypresses that are not 'a', 'b', or 'c'.
 */
class KBDClick extends HTMLElement {

    static get observedAttributes(): string[] {
        return ['allow-repeat', 'filter', 'capture', 'passive', 'case-sensitive', 'ignore-visibility', 'disabled'];
    }

    #setupListener(): void {
        document.removeEventListener('keydown', this.#handleKeyDown);

        const options: AddEventListenerOptions = {
            capture: this.hasAttribute('capture'),
            passive: this.hasAttribute('passive'),
            once: false,
        };
        if (!this.disabled) {
            document.addEventListener('keydown', this.#handleKeyDown, options);
        }
    }

    #handleKeyDown = (event: KeyboardEvent): void => {
        if (this.disabled) return;
        const { type, key, repeat } = event;
        if (type !== 'keydown' || !key) {
            return;
        }
        if (!this.allowRepeat && repeat) {
            return;
        }
        const usingFilter = this.caseSensitive ? this.filter : this.filter.toLowerCase();
        const usingKey = this.caseSensitive ? key : key.toLowerCase();
        const filterArray = usingFilter.split(',').map(item => item.trim()).filter(Boolean);
        const isFilteredIn = !(filterArray?.length) || filterArray.includes(usingKey);
        if (!isFilteredIn) {
            return;
        }
        const els = this.querySelectorAll('kbd,[accesskey]');
        if (els.length === 0) {
            return;
        }
        const ignoreVisibility = this.ignoreVisibility;
        els.forEach(el => {
            const isKbd = el.tagName.toLowerCase() === 'kbd';
            const elCode = (el.getAttribute('accesskey') ?? isKbd ? (el as HTMLElement).innerText.trim() : '').trim();
            const usingElCode = this.caseSensitive ? elCode : elCode.toLowerCase();
            const matchesEvent = usingElCode === usingKey;
            const isVisible = ignoreVisibility || el.checkVisibility();
            if (matchesEvent && isVisible) {
                el.dispatchEvent(new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                }));
                (el as HTMLElement).focus();
            }
        });
    }

    connectedCallback(): void {
        this.#setupListener();
    }

    disconnectedCallback(): void {
        document.removeEventListener('keydown', this.#handleKeyDown);
    }

    attributeChangedCallback(name: string): void {
        const setupAttrs = ['capture', 'passive', 'disabled'];
        if (setupAttrs.includes(name)) {
            this.#setupListener();
        }
    }

    get allowRepeat(): boolean {
        return this.hasAttribute('allow-repeat');
    }

    set allowRepeat(value: boolean) {
        if (value) {
            this.setAttribute('allow-repeat', '');
        } else {
            this.removeAttribute('allow-repeat');
        }
    }

    get filter(): string {
        return this.getAttribute('filter') || '';
    }

    set filter(value: string | null | undefined) {
        if (value?.length) {
            this.setAttribute('filter', value);
        } else {
            this.removeAttribute('filter');
        }
    }

    get capture(): boolean {
        return this.hasAttribute('capture');
    }

    set capture(value: boolean) {
        if (value) {
            this.setAttribute('capture', '');
        } else {
            this.removeAttribute('capture');
        }
    }

    get passive(): boolean {
        return this.hasAttribute('passive');
    }

    set passive(value: boolean) {
        if (value) {
            this.setAttribute('passive', '');
        } else {
            this.removeAttribute('passive');
        }
    }

    get caseSensitive(): boolean {
        return this.hasAttribute('case-sensitive');
    }

    set caseSensitive(value: boolean) {
        if (value) {
            this.setAttribute('case-sensitive', '');
        } else {
            this.removeAttribute('case-sensitive');
        }
    }

    get ignoreVisibility(): boolean {
        return this.hasAttribute('ignore-visibility');
    }

    set ignoreVisibility(value: boolean) {
        if (value) {
            this.setAttribute('ignore-visibility', '');
        } else {
            this.removeAttribute('ignore-visibility');
        }
    }

    get disabled(): boolean {
        return this.hasAttribute('disabled');
    }

    set disabled(value: boolean) {
        if (value) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

}

export default KBDClick;

if (!customElements.get('kbd-click')) {
    customElements.define('kbd-click', KBDClick);
}