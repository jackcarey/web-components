/**
   * @module
   * This module contains a custom element to render data from caniuse.com
   *
+  * @example
+  * ```html
+  * <script src="https://esm.sh/jsr/@web-components/can-i-use"></script>
+  * <can-i-use feature="custom-elementsv1"></can-i-use>
+  * ```
   */

import list from "./feature-list";

/**
 * !function(){document.addEventListener("DOMContentLoaded",function(){for(var e=document.getElementsByClassName("ciu_embed"),t=0;t<e.length;t++){var a=e[t],i=a.getAttribute("data-feature"),n=a.getAttribute("data-periods"),s=a.getAttribute("data-accessible-colours")||"false",r=a.getAttribute("data-image-base")||"none";if(i){var o="https://caniuse.bitsofco.de/embed/index.html",d='<iframe src="'+o+"?feat="+i+"&periods="+n+"&accessible-colours="+s+"&image-base="+r+'" frameborder="0" width="100%" height="400px"></iframe>';a.innerHTML=d}else a.innerHTML="A feature was not included. Go to <a href='https://caniuse.bitsofco.de/#how-to-use'>https://caniuse.bitsofco.de/#how-to-use</a> to generate an embed."}var c=window.addEventListener?"addEventListener":"attachEvent";(0,window[c])("attachEvent"==c?"onmessage":"message",function(t){var a=t.data;if("string"==typeof a&&a.indexOf("ciu_embed")>-1)for(var i=a.split(":")[1],n=a.split(":")[2],s=0;s<e.length;s++){var r=e[s];if(r.getAttribute("data-feature")===i){var o=parseInt(n)+30;r.childNodes[0].height=o+"px";break}}},!1)})}();
 */

/**
 * Represents a custom web component that displays information about browser support for a specific feature.
 */
class CanIuseComponent extends HTMLElement {
    /**
     * Returns the list of attributes that the component observes for changes.
     */
    static get observedAttributes(): string[] {
        return ["feature"];
    }

    #root: ShadowRoot | undefined;

    /**
     * Called when the component is connected to the DOM.
     */
    connectedCallback(): void {
        if (!this.#root) {
            this.#root = this.attachShadow({ mode: "open" });
        }
        this.#render();
    }

    /**
     * Called when the component is disconnected from the DOM.
     */
    disconnectedCallback(): void {
        this.#root = undefined;
    }

    /**
     * Called when an observed attribute has changed.
     * @param name - The name of the attribute that changed.
     * @param oldValue - The previous value of the attribute.
     * @param newValue - The new value of the attribute.
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (oldValue === newValue) return;
        if (name === "feature") {
            if (!list.includes(newValue)) {
                this.feature = oldValue;
            }
        }
        this.#render();
    }

    /**
     * Gets the value of the "feature" attribute.
     * @returns The value of the "feature" attribute, or "custom-elementsv1" if not set.
     */
    get feature(): string {
        return this.getAttribute("feature") ?? "custom-elementsv1";
    }

    /**
     * Sets the value of the "feature" attribute.
     * @param value - The new value for the "feature" attribute.
     */
    set feature(value: string) {
        if (!value) {
            this.removeAttribute("feature");
        } else {
            this.setAttribute("feature", value);
        }
    }

    /**
     * Gets the value of the "periods" attribute.
     * @returns The value of the "periods" attribute, or "future_1,current,past_1,past_2" if not set.
     */
    get periods(): string {
        return this.getAttribute("periods") ?? "future_1,current,past_1,past_2";
    }

    /**
     * Sets the value of the "periods" attribute.
     * @param value - The new value for the "periods" attribute.
     */
    set periods(value: string) {
        if (!value) {
            this.removeAttribute("periods");
        } else {
            this.setAttribute("periods", value);
        }
    }

    /**
     * Gets the value of the "accessible-colours" attribute.
     * @returns The value of the "accessible-colours" attribute, or "false" if not set.
     */
    get accessibleColours(): string {
        return this.getAttribute("accessible-colours") ?? "false";
    }

    /**
     * Sets the value of the "accessible-colours" attribute.
     * @param value - The new value for the "accessible-colours" attribute.
     */
    set accessibleColours(value: string) {
        if (!value) {
            this.removeAttribute("accessible-colours");
        } else {
            this.setAttribute("accessible-colours", String(value ? true : false));
        }
    }

    get mode(): string {
        return this.getAttribute("mode") ?? "iframe";
    }

    set mode(value: string) {
        const isValid = ["iframe", "image"].includes(value);
        if (!value || !isValid) {
            this.removeAttribute("mode");
        } else {
            this.setAttribute("mode", value);
        }
    }

    #render(): void {
        if (!this.#root) return;
        if (this.mode === "iframe") {
            this.#root.innerHTML = `<iframe src="https://caniuse.bitsofco.de/embed/index.html?feat=${
                this.feature
            }&periods=${this.periods}&accessible-colours=${
                this.accessibleColours === "true" ? "true" : "false"
            }" frameborder="0" width="100%" height="400px"></iframe>`;
        } else if (this.mode === "image") {
            this.#root.innerHTML = `<picture>
              <source type="image/webp" srcset="https://caniuse.bitsofco.de/image/${this.feature}.webp">
              <source type="image/png" srcset="https://caniuse.bitsofco.de/image/${this.feature}.png">
              <img src="https://caniuse.bitsofco.de/image/${this.feature}.jpg" alt="Data on support for the ${this.feature} feature across the major browsers from caniuse.com">
              </picture>`;
        }
    }
}

customElements.define("can-i-use", CanIuseComponent);

export default CanIuseComponent;
