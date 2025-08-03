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
class RevealPresentation extends HTMLElement {
    #mutationObserver: MutationObserver;
    #setup() {
        const attrs: Record<string, string> = {};
        for (const attr of this.attributes) {
            attrs[attr.name] = attr.value;
        }
        // ref: https://revealjs.com/config/
        const fullInitConfig: Reveal.Options = {
            plugins: [Monokai, Markdown, Notes],
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
            ...attrs,
        };
        Reveal.initialize(fullInitConfig);
    }
    connectedCallback() {
        if (!this.#mutationObserver) {
            this.#mutationObserver = new MutationObserver(() => {
                this.#setup();
            });
        }
        this.#mutationObserver.observe(this, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
        });
        this.#setup();
    }
    disconnectedCallback() {
        this.#mutationObserver?.disconnect();
    }
}

window.addEventListener("resize", () => {
    Reveal.layout();
})

if (!customElements.get("reveal-presentation")) {
    customElements.define("reveal-presentation", RevealPresentation);
    setTimeout(() => Reveal.layout());
}