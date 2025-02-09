const defaultAriaDatasetKey = 'searchDomAriaHidden';
const defaultDisplayDatasetKey = 'searchDomDisplay';

/**
 * A custom element that wraps an input and filters other DOM elements when its value changes.
 * @param target ['ul'] - A CSS selector for the parent element containing items.
 * @param items ['items'] - A CSS selector for items within the parent. Items that have `textContent` that includes the value of the inner `input` element will remain visible. Other items will be hidden.
 * @param mode ['matchCase'] - How to filter item text content. `normal`/omitted or `matchCase`. Default: `normal`.
 * 
 * @example
 * ```
 *     <search-dom target="#parent" items=".item">
 *         <input type="search"/>
 *     <search-dom>
 *     <ul id="parent">
 *      <li class=".item">hello</li>
 *      <li class=".item">world</li>
 *     </ul>
 * ```
 */
export default class SearchDOM extends HTMLElement implements EventTarget {
    static observedAttributes = ["target", "items", "mode"];
    #mutationObserver: MutationObserver | null;
    #inputListener: EventListener = () => {
        const tgtSelector = this.getAttribute("target");
        const itemSelector = this.getAttribute("items");
        if (tgtSelector && itemSelector) {
            this.dispatchEvent(new CustomEvent("search-dom", {
                detail: {
                    type: "input",
                    value: this.#inputEl?.value
                }
            }));
            const inputVal = this.#inputEl?.value;
            document.querySelectorAll(tgtSelector).forEach(tgtEl => {
                this.dispatchEvent(new CustomEvent("search-dom", {
                    detail: {
                        type: "target",
                        value: tgtEl
                    }
                }));
                tgtEl.querySelectorAll(itemSelector).forEach(itemEl => {

                    let storedAriaHiddenValue = (itemEl as HTMLElement).dataset[defaultAriaDatasetKey];
                    let storedDisplayValue = (itemEl as HTMLElement).dataset[defaultDisplayDatasetKey];

                    if (!storedAriaHiddenValue) {
                        (itemEl as HTMLElement).dataset[defaultAriaDatasetKey] = String(Boolean(itemEl.ariaHidden));
                    }
                    if (!storedDisplayValue) {
                        (itemEl as HTMLElement).dataset[defaultDisplayDatasetKey] = getComputedStyle(itemEl).display;
                    }

                    storedAriaHiddenValue = (itemEl as HTMLElement).dataset[defaultAriaDatasetKey];
                    storedDisplayValue = (itemEl as HTMLElement).dataset[defaultDisplayDatasetKey];

                    const hasInputVal = Boolean(inputVal?.length);

                    const testContent = this.mode === "matchCase" ? itemEl.textContent : itemEl.textContent?.toLowerCase();
                    const testVal = this.mode === "matchCase" ? inputVal : inputVal?.toLowerCase();
                    const hasMatch = Boolean(testContent?.includes(String(testVal)));
                    const isHidden = hasInputVal && !hasMatch;

                    if (isHidden) {
                        //hide the element
                        itemEl.ariaHidden = "true";
                        (itemEl as HTMLElement).style.display = 'none';
                    } else {
                        //unhide the element
                        if (storedAriaHiddenValue === "false") {
                            itemEl.removeAttribute('aria-hidden');
                        } else {
                            itemEl.ariaHidden = storedAriaHiddenValue ?? "false";
                        }
                        (itemEl as HTMLElement).style.display = storedDisplayValue ?? 'inherit';
                        if (itemEl.getAttribute('style') === `display: ${storedDisplayValue};`) {
                            itemEl.removeAttribute('style');
                        }
                    }

                    this.dispatchEvent(new CustomEvent("search-dom", {
                        detail: {
                            type: "item",
                            value: this.#inputEl?.value,
                            target: itemEl,
                            isHidden
                        }
                    }));
                });
            });
        }
    };

    constructor() {
        super();
    }

    connectedCallback() {
        this.#mutationObserver?.disconnect();
        this.#mutationObserver = new MutationObserver((_) => {
            this.#setUpInputListener();
        });
        this.#mutationObserver.observe(this);
        this.#setUpInputListener();
    }

    disconnectedCallback() {
        this.#mutationObserver?.disconnect();
    }

    attributeChangedCallback() {
        this.#setUpInputListener();
    }

    get #inputEl() {
        return (this.querySelector("input[type='search']") || this.querySelector("input")) as HTMLInputElement | undefined;
    }

    #setUpInputListener() {
        if (this.#inputEl) {
            this.#inputEl.addEventListener("input", this.#inputListener);
        }
    }

    run() {
        this.#inputListener(new Event("input", {}));
    }

    get target(): string | null {
        return this.getAttribute("target");
    }

    set target(val: string | undefined | null) {
        if (val) {
            this.setAttribute("target", val);
        } else {
            this.removeAttribute("target");
        }
    }

    get items(): string | null {
        return this.getAttribute("target");
    }

    set items(val: string | undefined | null) {
        if (val) {
            this.setAttribute("items", val);
        } else {
            this.removeAttribute("items");
        }
    }

    get mode(): string | null {
        return this.getAttribute("mode") ?? "normal";
    }

    set mode(val: string | undefined | null) {
        const validVal = val && ["normal", "matchCase"].includes(val) ? val : undefined;
        if (validVal?.length) {
            this.setAttribute("mode", validVal);
        } else {
            this.removeAttribute("mode");
        }
    }
}

customElements.define("search-dom", SearchDOM);