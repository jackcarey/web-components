class DetailsForcedOpen extends HTMLDetailsElement {
    #mediaObserver;
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ["open", "query", "mode"];
    }

    get open() {
        return this.hasAttribute("open");
    }

    set open(value) {
        if (value) {
            this.setAttribute("open", "");
        } else {
            this.removeAttribute("open");
        }
    }

    get query() {
        return this.getAttribute("matches");
    }

    set query(value) {
        if (!value) {
            this.removeAttribute("matches");
            return;
        }
        this.setAttribute("matches", value ?? "");
    }

    get mode() {
        return this.getAttribute("mode") ?? "window";
    }

    set mode(value) {
        if (["window", "container"].includes(value)) {
            this.setAttribute("mode", value);
        } else {
            this.removeAttribute("mode");
        }
    }

    #updateObserver = () => {
        if (!this.connectedCallback) return;
        if (!this.query) return;
        if (this.mode === "window") {
            this.#mediaObserver = window.matchMedia(this.query);
            this.#mediaObserver.addEventListener("change", this.#updateState);
            this.#updateState();
        }
        if (this.mode === "container") {
        }
    };

    #updateState = () => {};

    connectedCallback() {
        if (this.mode === "window") {
            this.#mediaObserver = window.matchMedia(this.query);

            this.#mediaObserver.addEventListener("change", this.#updateState);
            this.#updateState();
        }
    }

    disconnectedCallback() {
        if (this.#mediaObserver) {
            this.#mediaObserver.disconnect();
            this.#mediaObserver = null;
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "open") {
            this.open = true;
        }
    }
}

customElements.define("forced-open", DetailsForcedOpen, { extends: "details" });
