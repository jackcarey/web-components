import list from "./feature-list";

class CanIuseComponent extends HTMLElement {
    static get observedAttributes() {
        return ["feature"];
    }
    #root: ShadowRoot | undefined;
    connectedCallback() {
        if (!this.#root) {
            this.#root = this.attachShadow({ mode: "open" });
        }
        this.render();
    }
    disconnectedCallback() {
        this.#root = undefined;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (name === "feature") {
            if (!list.includes(newValue)) {
                this.feature = oldValue;
            }
        }
        this.render();
    }
    get feature() {
        return this.getAttribute("feature") ?? "custom-elementsv1";
    }
    set feature(value) {
        if (!value) {
            this.removeAttribute("feature");
        } else {
            this.setAttribute("feature", value);
        }
    }
    get periods() {
        return this.getAttribute("periods") ?? "future_1,current,past_1,past_2";
    }
    set periods(value) {
        if (!value) {
            this.removeAttribute("periods");
        } else {
            this.setAttribute("periods", value);
        }
    }
    get accessibleColours() {
        return this.getAttribute("accessible-colours") ?? "false";
    }
    set accessibleColours(value) {
        if (!value) {
            this.removeAttribute("accessible-colours");
        } else {
            this.setAttribute("accessible-colours", String(value ? true : false));
        }
    }
    render() {
        if (!this.#root) return;
        this.#root.innerHTML = `<p class="ciu_embed" data-feature="${this.feature}" data-periods="${
            this.periods
        }" data-accessible-colours="${this.accessibleColours ? true : false}">
        <picture>
        <source type="image/webp" srcset="https://caniuse.bitsofco.de/image/${this.feature}.webp">
        <source type="image/png" srcset="https://caniuse.bitsofco.de/image/${this.feature}.png">
        <img src="https://caniuse.bitsofco.de/image/${
            this.feature
        }.jpg" alt="Data on support for the ${
            this.feature
        } feature across the major browsers from caniuse.com">
        </picture>
        </p>`;
    }
}

customElements.define("can-i-use", CanIuseComponent);

export default CanIuseComponent;
