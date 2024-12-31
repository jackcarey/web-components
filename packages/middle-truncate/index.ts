/**
 * A custom HTML element that truncates text in the middle to fit within a specified limit.
 * @module middle-truncate
 * @class MiddleTruncate
 * @extends HTMLElement
 * 
 * @attribute {string} value - The text content to be truncated.
 * @attribute {number} limit - The maximum number of characters to display.
 * @attribute {string} dir - The text direction, either 'ltr' (left-to-right) or 'rtl' (right-to-left).
 * 
 */
class MiddleTruncate extends HTMLElement {
    #resizeEntry: ResizeObserverEntry | undefined;
    #segments: unknown[] | undefined;
    #resizeObserver: ResizeObserver | undefined;

    static get observedAttributes() {
        return ['title', 'at'];
    }

    #resizeCallback = (entries: ResizeObserverEntry[]) => {
        this.#resizeEntry = entries.find(e => e.target === this);
        console.log(`resize`, { entries, resizeEntry: this.#resizeEntry });
        this.#render();
    };

    #disconnectedObserver = () => {
        if (this.#resizeObserver) {
            this.#resizeObserver.unobserve(this);
        }
    }

    connectedCallback() {
        if (!this.#resizeObserver) {
            this.#resizeObserver = new ResizeObserver(this.#resizeCallback);
        }
        this.#resizeObserver.observe(this);
        this.#render();
    }

    disconnectedCallback() {
        this.#disconnectedObserver();
    }

    attributeChangedCallback() {
        this.#render();
    }

    /**
     * The percentage of text to show the truncation at.
     */
    get at(): number {
        if (this.hasAttribute('at')) {
            try {
                return parseInt(this.getAttribute('at') || '50');
            } catch (e) {
                return 50;
            }
        }
        return 50;
    }

    /**
     * The percentage of text to show the truncation at.
     */
    set at(val: string | number | undefined | null) {
        if (!val) {
            this.removeAttribute('at');
        } else {
            const asNum = Math.max(0, Math.min(100, parseInt(String(val))));
            if (asNum) {
                this.setAttribute('at', String(asNum));
            }
        }
    }

    #render() {
        const isLtr = this.dir === "ltr";
        this.innerHTML = `<style>
        .container,.start,.end{
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            margin: 0;
            padding: 0;
        }
        .container{
            width: 100%;
            max-width: ${this.title.length}ch;
        }
        .start{
            text-overflow: ellipsis;
            text-align: start;
            max-width: calc(${this.at}% + 3em);
        }
        .end {
            display: inline-block;
            width: calc(${100 - this.at}% - 3em);
            transform: scaleX(-1);
            text-overflow: ellipsis;
            padding: 0;
            margin: 0;
            }
            .end-inner{
                display: inline-block;
                transform: scaleX(-1);
                text-align: start;
                text-overflow: ellipsis;
                padding: 0;
                margin: 0;
        }</style><span class="container"><span class="start">${this.title}</span><span class="end" aria-hidden="true"}><span class="end-inner">${this.title}<span></span></span>`;
    }
}

customElements.define('middle-truncate', MiddleTruncate);