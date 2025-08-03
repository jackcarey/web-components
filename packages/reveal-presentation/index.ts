import Reveal from "reveal.js";
import Monokai from "reveal.js/plugin/highlight/highlight.esm.js";
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Notes from "reveal.js/plugin/notes/notes.js";

/**
 * A custom element that naively initializes a Reveal.js presentation.
 * It sets up the Reveal.js options based on the attributes of the element.
 * The presentation can be customized with various options like background transition, slide number, controls, etc
 * * The element listens for the `resize` event to adjust the layout of the presentation.
 */
export class RevealPresentation extends HTMLElement {
    #deck: Reveal.Reveal | null = null;
    #mutationObserver: MutationObserver;
    #resizeObserver: ResizeObserver | null = null;
    #plugins: Reveal.Plugin[] = [Monokai, Markdown, Notes];
    #setupDeck() {
        const excludedAttrs = ['plugins'];
        const attrs: Record<string, string> = {};
        for (const attr of this.attributes) {
            if (excludedAttrs.includes(attr.name)) {
                continue;
            }
            attrs[attr.name] = attr.value;
        }
        //this could be more explicit, but this is a quick way to get all of the attributes
        // ref: https://revealjs.com/config/
        const fullInitConfig: Reveal.Options = {
            plugins: this.plugins,
            hash: true,
            preloadIframes: true,
            respondToHashChanges: true,
            disableLayout: true,
            progress: true,
            backgroundTransition:
                (attrs?.backgroundTransition ?? attrs?.transition ?? "fade") as "fade" | "slide" | "convex" | "concave" | "zoom",
            slideNumber: true,
            controls: true,
            controlsLayout: "edges",
            showNotes: false,
            autoAnimate: true,
            center: true,
            embedded: true,
            pdfMaxPagesPerSlide: 1,
            viewDistance: 1,
            mobileViewDistance: 1,
            ...attrs,
        };
        this.#deck?.destroy();
        this.#deck = new Reveal(this, fullInitConfig);
    }
    connectedCallback() {
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
        window.addEventListener("resize", this.#deck.layout.bind);
    }
    disconnectedCallback() {
        this.#mutationObserver?.disconnect();
        this.#resizeObserver?.disconnect();
        window.removeEventListener("resize", this.#deck.layout);
        this.#deck?.destroy();
        this.#deck = null;
    }

    get plugins() {
        return this.#plugins;
    }

    set plugins(plugins: Reveal.Plugin[]) {
        this.#plugins = plugins;
        this.#setupDeck();
    }
}

if (!customElements.get("reveal-presentation")) {
    customElements.define("reveal-presentation", RevealPresentation);
}