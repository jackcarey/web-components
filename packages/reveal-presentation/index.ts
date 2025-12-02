import Reveal from "reveal.js";
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Notes from "reveal.js/plugin/notes/notes.js";
import Appearance from 'reveal.js-appearance';
import { config } from "./configObject";

const addPreloadLink = (url: string | URL | null, as: string) => {
    if (!url) return;
    const existing = document.querySelector(`link[href="${url}"]`);
    if (!existing) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = as;
        link.href = String(url);
        document.head.appendChild(link);
    }
};

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
    static excludedAttrs: string[] = ['plugins', 'theme', 'width', 'height', 'appearance', 'preload'];
    /**
     * The list of attributes that the custom element observes for changes.
     * @returns {string[]} An array of attribute names that the custom element observes.
     */
    static get observedAttributes(): string[] {
        return [...RevealPresentation.revealJsConfigAttrs, ...RevealPresentation.excludedAttrs];
    }

    #deck: Reveal.Reveal | null = null;
    #resizeObserver: ResizeObserver | null = null;
    #plugins: Reveal.Plugin[] = [Markdown, Notes];

    #setupDeck() {
        this.removeAttribute("ready");
        const booleanConfigOpts = Object.entries(config).filter(([_, value]) => typeof value === 'boolean').map(([key]) => key);;
        const configOptions: Record<string, string | boolean> = {};
        for (const attr of this.attributes) {
            if (RevealPresentation.revealJsConfigAttrs.includes(attr.name) && !RevealPresentation.excludedAttrs.includes(attr.name)) {
                if (booleanConfigOpts.includes(attr.name)) {
                    configOptions[attr.name] = attr.value === 'true';
                } else {
                    configOptions[attr.name] = attr.value;
                }
            }
        }
        const fullInitConfig: Reveal.Options & { appearance: Record<any, any> } = {
            plugins: [...this.plugins, this.appearance ? Appearance : null].filter(Boolean) as Reveal.Plugin[],
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
            scrollActivationWidth: 500,
            scrollProgress: true,
            appearance: {
                cssautoload: true,
                autoappear: true,
                hideagain: true,
                delay: 300,
            },
            ...configOptions,
        };

        const initDeck = () => {
            this.#deck?.destroy();
            // @ts-expect-error Reveal types are not up to date
            this.#deck = new Reveal(this.querySelector(".reveal"), fullInitConfig);
            this.#deck.initialize().then(() => {
                this.#deck?.layout();
                this.setAttribute("ready", "");
            });
        };

        if (document.readyState === 'complete') {
            initDeck();
        } else {
            document.addEventListener("readystatechange", (event) => {
                if (document.readyState === "complete") {
                    initDeck();
                }
            }, { once: true, passive: true });
        }
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

    #preloadResources() {
        if (!this.isConnected) return;
        if (this.getAttribute("preload") === null) return;
        const selector = '[data-background-image], img[src]:not([loading="lazy"])';
        this.querySelectorAll(selector).forEach((el) => {
            const srcSet = el.getAttribute("srcset");
            if (srcSet) {
                const urls = srcSet
                    .split(",")
                    .map((part) => part.trim().split(" ")[0])
                    .filter(Boolean);
                urls.forEach((srcUrl) => addPreloadLink(srcUrl, "image"));
            } else {
                const url =
                    el.getAttribute("data-background-image") ??
                    el.getAttribute("src") ??
                    el.getAttribute("srcset");
                if (el.tagName.toLowerCase() === "img" && !el.getAttribute("loading")) {
                    el.setAttribute("loading", "eager");
                }
                addPreloadLink(url, "image");
            }
        });
        this.querySelectorAll("video").forEach((el) => {
            if (!el.getAttribute("preload")) {
                el.setAttribute("preload", "auto");
            }
            const url = el.getAttribute("src");
            addPreloadLink(url, "video");
            const posterSrc = el.getAttribute("poster");
            if (posterSrc) {
                addPreloadLink(posterSrc, "image");
            }
            const trackEls = el.querySelectorAll("track[src]");
            trackEls.forEach((trackEl) => {
                const trackUrl = trackEl.getAttribute("src");
                addPreloadLink(trackUrl, "track");
            });
        });
        this.querySelectorAll("audio").forEach((el) => {
            if (!el.getAttribute("preload")) {
                el.setAttribute("preload", "auto");
            }
            const url = el.getAttribute("src");
            addPreloadLink(url, "audio");
        });
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
        this.removeAttribute("ready");
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
        // make sure the "ready" attribute is in sync with the deck's state
        if (name === "ready") {
            const isReady = this.#deck.isReady();
            if (isReady) {
                if (!this.hasAttribute("ready")) {
                    this.setAttribute("ready", "");
                }
            } else {
                if (this.hasAttribute("ready")) {
                    this.removeAttribute("ready");
                }
            }
        }
        if (this.isConnected && name === "preload" && newValue !== null) {
            this.#preloadResources();
        }
    }

    get deck(): Reveal.Reveal | null {
        return this.#deck;
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

    get appearance(): boolean {
        return this.hasAttribute("appearance");
    }

    set appearance(appearance: boolean) {
        if (appearance) {
            this.setAttribute("appearance", "");
        } else {
            this.removeAttribute("appearance");
        }
    }
}

if (customElements?.define && !customElements.get('reveal-presentation')) {
    customElements.define('reveal-presentation', RevealPresentation);
}
