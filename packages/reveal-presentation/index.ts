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
    static revealJsConfigAttrs: string[] = Object.keys(config);
    /**
     * List of attributes that are excluded from the Reveal.js configuration.
     */
    static excludedAttrs: string[] = ['plugins', 'theme', 'width', 'height'];
    /**
     * The list of attributes that the custom element observes for changes.
     * @returns {string[]} An array of attribute names that the custom element observes.
     */
    static get observedAttributes(): string[] {
        return [...RevealPresentation.revealJsConfigAttrs, ...RevealPresentation.excludedAttrs];
    }

    #deck: Reveal.Reveal | null = null;
    #resizeObserver: ResizeObserver | null = null;
    #plugins: Reveal.Plugin[] = [Monokai, Markdown, Notes];

    #setupDeck() {
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
        this.#deck = new Reveal(this.querySelector(".reveal"), fullInitConfig);
        this.#deck.initialize();
        this.#deck?.layout();
    }

    #setupDom() {
        if (!this.querySelector('.reveal .slides')) {
            this.innerHTML = `<div class="reveal" style="width: ${this.width}; height: ${this.height}">
                <div class="slides">
                    ${this.innerHTML}
                </div>
            </div>`;
        }
    }

    connectedCallback(): void {
        this.#setupDom();
        if (!this.#resizeObserver) {
            this.#resizeObserver = new ResizeObserver(() => {
                this.#deck?.layout();
            });
            this.#resizeObserver.observe(this);
        }
        window.addEventListener("resize", () => {
            this.#deck?.layout();
        });
        this.#setupDeck();
    }
    disconnectedCallback(): void {
        this.#resizeObserver?.disconnect();
        window.removeEventListener("resize", () => {
            this.#deck?.layout();
        });
        this.#deck?.destroy();
        this.#deck = null;
    }

    attributeChangedCallback(name: string, _oldValue: string | null | undefined, newValue: string | null | undefined): void {
        if (RevealPresentation.revealJsConfigAttrs.includes(name) && !RevealPresentation.excludedAttrs.includes(name)) {
            this.#setupDeck();
        }
        if (name === 'theme' && newValue?.length) {
            const hasRevealCSS = document.querySelector('link[href*="reveal.css"]');
            const hasThemeCSS = document.querySelector(`link[href*="${newValue}.css"]`);
            if (!hasRevealCSS) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://esm.sh/reveal.js/dist/reveal.css';
                document.head.appendChild(link);
            }
            if (!hasThemeCSS) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `https://esm.sh/reveal.js/dist/theme/${newValue}.css`;
                document.head.appendChild(link);
            }
        }
        if (['width', 'height'].includes(name) && newValue?.length) {
            if (!this.querySelector('.reveal .slides')) {
                this.innerHTML = `<div class="reveal" style="width: ${this.width}; height: ${this.height}">
                <div class="slides">
                    ${this.innerHTML}
                </div>
            </div>`;
            }
            (this.querySelector('.reveal')! as HTMLElement).style.width = this.width;
            (this.querySelector('.reveal')! as HTMLElement).style.height = this.height;
        }
    }

    get plugins(): Reveal.Plugin[] {
        return this.#plugins;
    }

    set plugins(plugins: Reveal.Plugin[]) {
        this.#plugins = plugins;
        this.#setupDeck();
    }

    get width(): string {
        return this.getAttribute("width") || "100%";
    }

    set width(width: string) {
        if (width?.length) {
            this.setAttribute("width", width);
        } else {
            this.removeAttribute("width");
        }
    }

    get height(): string {
        return this.getAttribute("height") || "500px";
    }

    set height(height: string) {
        if (height?.length) {
            this.setAttribute("height", height);
        } else {
            this.removeAttribute("height");
        }
    }

    get theme(): string | null {
        return this.getAttribute("theme");
    }

    set theme(theme: string) {
        if (theme?.length) {
            this.setAttribute("theme", theme);
        } else {
            this.removeAttribute("theme");
        }
    }
}

if (customElements?.define && !customElements.get('reveal-presentation')) {
    customElements.define('reveal-presentation', RevealPresentation);
}