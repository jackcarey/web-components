class DetailsForcedOpen extends HTMLDetailsElement {
    #observer;
    #currentWidth;
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ["open", "threshold"];
    }

    get threshold() {
        return this.getAttribute("threshold") ?? "0";
    }

    set threshold(value) {
        if (value && parseInt(value) > 0) {
            this.setAttribute("threshold", value);
        } else {
            this.removeAttribute("threshold");
        }
    }

    #updateOpenState = () => {
        const val = parseInt(this.threshold);
        if (isNaN(val)) {
            this.open = true;
            return;
        }
        if (this.#currentWidth >= val) {
            this.open = true;
        } else {
            this.open = false;
        }
    };

    #updateObserver = () => {
        if (!this.connectedCallback) {
            this.#observer = null;
            return;
        }
        this.#observer = new ResizeObserver((entries) => {
            this.#currentWidth = entries[0].contentRect.width;
            this.#updateOpenState();
        });
        this.#observer.observe(this);
    };

    connectedCallback() {
        this.#updateObserver();
        this.#currentWidth = this.getBoundingClientRect().width;
        this.#updateOpenState();
    }

    disconnectedCallback() {
        this.#updateObserver();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "threshold") {
            this.#updateObserver();
        }
        if (name === "open") {
            this.#updateOpenState();
        }
    }
}

customElements.define("forced-open", DetailsForcedOpen, { extends: "details" });
