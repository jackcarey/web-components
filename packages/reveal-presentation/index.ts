import Reveal from "reveal.js";
import Monokai from "reveal.js/plugin/highlight/highlight.esm.js";
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Notes from "reveal.js/plugin/notes/notes.js";
import { config } from "./configObject";
/**
 * A custom element that initializes a Reveal.js presentation.
 * It sets up the Reveal.js options based on the attributes of the element.
 * The presentation can be customized with various options like background transition, slide number, controls, etc
 * * The element listens for the `resize` event to adjust the layout of the presentation.
 */
export class RevealPresentation extends HTMLElement {
    /**
     * List of attributes that are used to configure Reveal.js.
     * Ref: https://revealjs.com/config/
     */
    static revealJsConfigAttrs = Object.keys(config);
    /**
     * List of attributes that are excluded from the Reveal.js configuration.
     */
    static excludedAttrs = ['plugins', 'theme', 'width', 'height'];
    /**
     * The list of attributes that the custom element observes for changes.
     * @returns {string[]} An array of attribute names that the custom element observes.
     */
    static observedAttributes() {
        return [...RevealPresentation.revealJsConfigAttrs, ...RevealPresentation.excludedAttrs];
    }

    #shadowRoot: ShadowRoot;
    #deck: Reveal.Reveal | null = null;
    #mutationObserver: MutationObserver;
    #resizeObserver: ResizeObserver | null = null;
    #plugins: Reveal.Plugin[] = [Monokai, Markdown, Notes];
    #applyTheme() {
        console.log("Applying theme:", this.theme);
        //this sets the attributes to the default values if not set
        this.width = this.width;
        this.height = this.height;
        this.theme = this.theme;
    }
    #initShadowDom() {
        if (!this.#shadowRoot) {
            this.#shadowRoot = this.attachShadow({ mode: "open" });
            this.#shadowRoot.innerHTML = `<div class="reveal"><div class="slides"><slot></slot></div></div>`;
        }
    }
    #setupDeck() {
        this.#initShadowDom();
        const configOptions: Record<string, string> = {};
        for (const attr of this.attributes) {
            if (RevealPresentation.revealJsConfigAttrs.includes(attr.name) && !RevealPresentation.excludedAttrs.includes(attr.name)) {
                configOptions[attr.name] = attr.value;
            }
        }
        const fullInitConfig: Reveal.Options = {
            plugins: this.plugins,
            hash: true,
            preloadIframes: true,
            respondToHashChanges: true,
            disableLayout: true,
            progress: true,
            backgroundTransition:
                (configOptions?.backgroundTransition ?? configOptions?.transition ?? "fade") as "fade" | "slide" | "convex" | "concave" | "zoom",
            slideNumber: true,
            controls: true,
            controlsLayout: "edges",
            showNotes: false,
            autoAnimate: true,
            center: true,
            pdfMaxPagesPerSlide: 1,
            viewDistance: 1,
            mobileViewDistance: 1,
            embedded: true,
            ...configOptions,
        };

        this.#deck?.destroy();
        this.#deck = new Reveal(this.#shadowRoot.querySelector(".reveal"), fullInitConfig);
        this.#deck.initialize();
        this.#deck.layout();

    }

    connectedCallback() {
        this.#initShadowDom();
        if (!this.#mutationObserver) {
            this.#mutationObserver = new MutationObserver(() => {
                this.#setupDeck();
            });
        }
        if (!this.#resizeObserver) {
            this.#resizeObserver = new ResizeObserver(() => {
                this.#deck?.layout();
            });
            this.#resizeObserver.observe(this);
        }
        this.#mutationObserver.observe(this, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
        });
        this.#setupDeck();
        this.#applyTheme();
        window.addEventListener("resize", this.#deck.layout);
    }
    disconnectedCallback() {
        this.#mutationObserver?.disconnect();
        this.#resizeObserver?.disconnect();
        window.removeEventListener("resize", this.#deck.layout);
        this.#deck?.destroy();
        this.#deck = null;
    }

    attributeChangedCallback(name) {
        if (name === "theme") {
            this.#applyTheme();
        }
        if (RevealPresentation.revealJsConfigAttrs.includes(name) && !RevealPresentation.excludedAttrs.includes(name)) {
            this.#setupDeck();
        }
    }

    get plugins() {
        return this.#plugins;
    }

    set plugins(plugins: Reveal.Plugin[]) {
        this.#plugins = plugins;
        this.#setupDeck();
    }

    get theme() {
        return this.getAttribute("theme") || "black";
    }

    set theme(theme: string) {
        if (theme?.length) {
            this.setAttribute("theme", theme);
        } else {
            this.removeAttribute("theme");
        }
    }

    get width() {
        return this.getAttribute("width") || "100%";
    }

    set width(width: string) {
        if (width?.length) {
            this.setAttribute("width", width);
        } else {
            this.removeAttribute("width");
        }
    }

    get height() {
        return this.getAttribute("height") || "500px";
    }

    set height(height: string) {
        if (height?.length) {
            this.setAttribute("height", height);
        } else {
            this.removeAttribute("height");
        }
    }
}

if (customElements?.define && !customElements.get('reveal-presentation')) {
    customElements.define('reveal-presentation', RevealPresentation);
}