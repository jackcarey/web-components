import RSSParser from 'rss-parser/dist/rss-parser.min.js';
class RssFeed extends HTMLElement {
    #shadowRoot: ShadowRoot;
    static get observedAttributes() {
        //todo: check if the TTL could be updated per feed,so this one only acts as a fallback
        return ['disabled', 'ttl', 'proxy', 'loading', 'sort-by', 'sort-order', 'element', 'link', 'customFields'];
    }
    #intersectionObserver: IntersectionObserver;
    #isVisible: boolean;
    #mutationObserver: MutationObserver;
    #globalTimeoutId: number | undefined;
    #feedDataProxy: typeof Proxy;
    #animFrame: number | null;

    get disabled(): boolean {
        return this.hasAttribute('disabled');
    }

    set disabled(val: boolean) {
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get ttl(): number {
        return parseInt(this.getAttribute('refetch') ?? '0');
    }

    set ttl(val: number) {
        if (!val || isNaN(parseInt(String(val))) || Number(val) <= 0) {
            this.removeAttribute('refetch');
        } else {
            this.setAttribute('refetch', val.toString());
        }
    }

    get proxy(): string | null {
        return this.getAttribute('proxy');
    }

    set proxy(val: string | null | undefined) {
        if (!val) {
            this.removeAttribute('proxy');
        } else {
            this.setAttribute('proxy', val.toString());
        }
    }

    get loading(): string | null {
        return this.getAttribute('loading');
    }

    set loading(val: 'lazy' | null) {
        if (!val || val !== 'lazy') {
            this.removeAttribute('loading');
        } else {
            this.setAttribute('loading', String(val));
        }
    }

    get sortBy(): string {
        return this.getAttribute('sort-by') ?? 'pubDate';
    }

    set sortBy(val: string | null) {
        if (!val) {
            this.removeAttribute('sort-by');
        } else {
            this.setAttribute('sort-by', val);
        }
    }

    get sortOrder(): string {
        return this.getAttribute('sort-order') ?? 'asc';
    }

    set sortOrder(val: string) {
        const allowed = ['asc', 'desc'];
        if (!val || !allowed.includes(val)) {
            this.removeAttribute('sort-order');
        } else {
            this.setAttribute('sort-order', val);
        }
    }

    get #sortedItems(): RSSParser.Item[] {
        const allItems = Object.values(this.#feedDataProxy).map(({ items }) => items).flat().filter((item) => item) as RSSParser.Item[];
        return allItems.sort((a, b) => {
            let sortResult = 0;
            if (this.sortBy === 'categories') {
                const aCats = a[this.sortBy]?.join(',') ?? '';
                const bCats = b[this.sortBy]?.join(',') ?? '';
                sortResult = aCats.localeCompare(bCats);
            }
            if (this.sortBy === 'enclosure') {
                const aUrl = a[this.sortBy]?.url ?? '';
                const bUrl = b[this.sortBy]?.url ?? '';
                sortResult = aUrl.localeCompare(bUrl);
            } else {
                sortResult = a[this.sortBy]?.localeCompare(b[this.sortBy]);
            }
            return this.sortOrder === 'asc' ? sortResult : sortResult ? -sortResult : 0;
        });
    }

    get element(): string | null {
        return this.getAttribute('element');
    }

    set element(val: string | null) {
        if (!val) {
            this.removeAttribute('element');
        } else {
            this.setAttribute('element', val);
        }
    }

    get link(): string | null {
        return this.getAttribute('link');
    }

    set link(val: boolean) {
        if (val) {
            this.setAttribute('link', '');
        } else {
            this.removeAttribute('link');
        }
    }

    get customFields(): string[] {
        return (this.getAttribute('customFields') ?? '').split(',').map((field) => field.trim()).filter((field) => field);
    }

    set customFields(val: string[]) {
        if (!val || !val.length) {
            this.removeAttribute('customFields');
        } else {
            this.setAttribute('customFields', val.join(','));
        }
    }

    get errors(): { [url: string]: Error } {
        const withErrors = Object.entries(this.#feedDataProxy).filter(([_, { err }]) => err);
        return Object.fromEntries(withErrors.map(([url, { err }]) => [url, err]) as [string, Error][]);
    }

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#mutationObserver = new MutationObserver(() => this.#updateFeeds());
        this.#intersectionObserver = new IntersectionObserver((entries) => {
            this.#isVisible = entries.some(({ isIntersecting }) => isIntersecting);
            this.#updateFeeds();
        });
        // @ts-expect-error TS expects a 'revocable' property
        this.#feedDataProxy = new Proxy({}, {
            get: (target, prop) => {
                return target[prop as string];
            },
            set: (target, prop, value) => {
                target[prop as string] = value;
                this.#render();
                return true;
            }
        });
        this.#updateFeeds();
    }

    connectedCallback(): void {
        this.#updateFeeds();
        this.#mutationObserver.observe(this, { childList: true });
        if (this.loading) {
            this.#intersectionObserver.observe(this);
        }
    }

    disconnectedCallback(): void {
        this.#mutationObserver.disconnect();
        this.#intersectionObserver.disconnect();
        if (this.#globalTimeoutId) {
            clearTimeout(this.#globalTimeoutId);
            this.#globalTimeoutId = undefined;
        }
        if (this.#animFrame) {
            cancelAnimationFrame(this.#animFrame);
        }
    }

    attributeChangedCallback(name: string): void {
        if (name === 'disabled') {
            if (this.disabled) {
                this.#mutationObserver.disconnect();
            } else {
                this.#mutationObserver.observe(this, { childList: true });
            }
        }
        if (name === 'loading') {
            if (this.loading === 'lazy') {
                this.#intersectionObserver.observe(this);
            } else {
                this.#intersectionObserver.disconnect();
            }
        }
        this.#updateFeeds();
    }

    #updateFeed(url: string): void {
        const fullUrl = this.proxy ? `${this.proxy}${url}` : url;
        new RSSParser({
            customFields: {
                item: this.customFields ?? [],
            }
        }).parseURL(fullUrl, (err, feed) => {
            if (err) {
                this.#feedDataProxy[url] = { ...this.#feedDataProxy[url], lastFetched: new Date(), err, items: null };
                return;
            }
            this.#feedDataProxy[url] = { ...this.#feedDataProxy[url], lastFetched: new Date(), items: feed.items };
        });
    }

    #updateFeeds(): void {
        const shouldLazyPause = this.loading === 'lazy' && !this.#isVisible;
        if (this.disabled || shouldLazyPause) {
            return;
        }
        const sources = Array.from(this.querySelectorAll('source')).map((source) => source.getAttribute('src')).filter((src) => src) as string[];
        Object.keys(this.#feedDataProxy).forEach((url) => {
            if (!sources.includes(url)) {
                delete this.#feedDataProxy[url];
            }
        });
        if (sources.length) {
            sources.forEach((url) => {
                const hasEntry = Boolean(this.#feedDataProxy[url]);
                const hasData = Boolean(this.#feedDataProxy[url]?.items);
                const isRecent = (new Date().getTime() - this.#feedDataProxy[url]?.lastFetched.getTime()) < this.ttl;
                if (!hasEntry || !hasData || !isRecent) {
                    this.#updateFeed(url);
                }
            });
        }
        if (!this.errors.length) {
            this.removeAttribute('errors');
        } else {
            this.setAttribute('errors', this.errors.length.toString());
        }
        if (this.#globalTimeoutId) {
            clearTimeout(this.#globalTimeoutId);
        }
        if (this.ttl) {
            this.#globalTimeoutId = setTimeout(() => {
                this.#updateFeeds();
            }, this.ttl * 1000) as unknown as number;
        }
    }

    #render(): void {
        if (this.#animFrame) {
            cancelAnimationFrame(this.#animFrame);
        }
        this.#animFrame = requestAnimationFrame(() => {
            const template = this.querySelector('template');
            if (!template || !this.#sortedItems.length) {
                // fallback to showing light DOM content
                this.#shadowRoot.innerHTML = '<slot></slot>';
                return;
            }
            this.#shadowRoot.innerHTML = '';
            this.#sortedItems.forEach((item) => {
                if (this.element) {
                    const element = document.createElement(this.element);
                    Object.entries(item).forEach(([key, value]) => {
                        if (key in element) {
                            (element as any)[key] = value;
                        } else {
                            const attrValue = ['string', 'number'].includes(typeof value) ? String(value) : JSON.stringify(value);
                            element.setAttribute(key, attrValue);
                        }
                    });
                    this.#shadowRoot.appendChild(element);
                } else {
                    const instance = template.content.cloneNode(true) as DocumentFragment;
                    instance.querySelectorAll('slot').forEach((slot) => {
                        const slotName = slot.getAttribute('name');
                        if (slotName && item[slotName]) {
                            switch (slotName) {
                                case 'enclosure':
                                    const { url, type } = item?.enclosure ?? {};
                                    if (url && type) {
                                        if (type.startsWith('image')) {
                                            const img = document.createElement('img');
                                            img.src = url;
                                            slot.replaceWith(img);
                                        } else if (type.startsWith('audio')) {
                                            const audio = document.createElement('audio');
                                            audio.src = url;
                                            slot.replaceWith(audio);
                                        } else if (type.startsWith('video')) {
                                            const video = document.createElement('video');
                                            video.src = url;
                                            slot.replaceWith(video);
                                        } else {
                                            // fallback to the browser's default behavior
                                            const embed = document.createElement('embed');
                                            embed.src = url;
                                            slot.replaceWith(embed);
                                        }
                                    }
                                    break;
                                case 'categories':
                                    const categories = item.categories;
                                    if (categories) {
                                        slot.replaceWith(categories.join(', '));
                                    }
                                    break;
                                default:
                                    const slotContent = item[slotName];
                                    const contentString = ['string', 'number'].includes(typeof slotContent) ? slotContent : JSON.stringify(slotContent);
                                    if (slotContent) {
                                        slot.replaceWith(contentString);
                                    }
                                    break;
                            }
                        }
                    });
                    if (this.link) {
                        const link = document.createElement('a');
                        link.href = item.link;
                        link.title = item.title;
                        link.target = this.link;
                        link.appendChild(instance);
                        this.#shadowRoot.appendChild(link);
                    } else {
                        this.#shadowRoot.appendChild(instance);
                    }
                }
            });
        });
    }
}

customElements.define('rss-feed', RssFeed);
