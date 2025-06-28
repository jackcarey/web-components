import { ProviderMixin, ConsumerMixin } from "@open-wc/context-protocol";

type I18nData = Record<string, any>;

export class I18NProvider extends ProviderMixin(HTMLElement) {
    #failedToFetch: string[] = [];
    #i18nData: I18nData = {};

    contexts?: Record<PropertyKey, () => I18nData> | undefined = {
        i18n: () => {
            return this.#i18nData;
        }
    };

    static get observedAttributes(): string[] {
        return ["name", "src-template", "replacement", "lang", "fallback", "preload"];
    }

    async connectedCallback() {
        super.connectedCallback?.();
        this.fetchI18nData();
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
        super.attributeChangedCallback?.(name, oldValue, newValue);
        if (name === "src-template" || name === "replacement") {
            this.#failedToFetch = [];
        }
        if (name === "preload") {
            // If preload is set, fetch the languages immediately
            this.preload?.forEach(lang => this.fetchI18nData(lang));
        } else {
            this.fetchI18nData();
        }
    }

    get srcTemplate(): string | null {
        if (this.hasAttribute("src-template")) {
            return this.getAttribute("src-template");
        } else {
            return null;
        }
    }

    set srcTemplate(value: string | undefined | null) {
        if (value?.length) {
            this.setAttribute("src-template", value);
        } else {
            this.removeAttribute("src-template");
        }
    }

    get replacement(): string {
        const attrVal = this.getAttribute("replacement");
        return attrVal?.length ? attrVal : "%s";
    }

    set replacement(value: string | undefined | null) {
        if (value?.length) {
            this.setAttribute("replacement", value);
        } else {
            this.removeAttribute("replacement");
        }
    }

    /**
     * When no other language is available, what should the default language be?
     * This is used when the `lang` attribute is not set or when the specified language data cannot be fetched.
     * If the `fallback` attribute is not set, it defaults to the browser's language or "en".
     * @returns {string} The fallback language code.
     * @default "en" or the browser's language
     */
    get fallback(): string {
        if (this.hasAttribute("fallback")) {
            return this.getAttribute("fallback") || "en";
        } else {
            return navigator.language || "en";
        }
    }

    set fallback(value: string) {
        if (value?.length) {
            this.setAttribute("fallback", value);
        } else {
            this.removeAttribute("fallback");
        }
    }

    get preload(): string[] | undefined {
        if (this.hasAttribute("preload")) {
            const str = this.getAttribute("preload");
            if (!str?.length) return undefined;
            // Ensure the preload attribute is a comma-separated list of language codes
            const isValidStr = str && str.split(",").every(lang => /^[a-z]{2,3}(-[A-Z]{2})?$/.test(lang.trim()));
            if (!isValidStr) {
                console.warn("Invalid preload attribute format. Expected a comma-separated list of language codes.");
            }
            return str?.split(",").map(lang => lang.trim()).filter(lang => lang.length > 0) || undefined;
        } else {
            return undefined;
        }
    }
    set preload(value: string | null) {
        if (value?.length) {
            this.setAttribute("preload", value);
        } else {
            this.removeAttribute("preload");
        }
    }

    get lang(): string {
        const attrVal = this.getAttribute("lang");
        if (attrVal?.length) {
            return attrVal;
        } else {
            const userLangs = navigator.languages || [navigator.language];
            // Filter out languages that couldn't be fetched
            const availableLangs = userLangs.filter(lang => !this.#failedToFetch.includes(lang));
            if (availableLangs.length > 0) {
                return availableLangs[0];
            } else {
                return this.fallback;
            }
        }
    }

    set lang(value: string) {
        if (value?.length) {
            this.setAttribute("lang", value);
        } else {
            this.removeAttribute("lang");
        }
    }

    fetchI18nData(langCode?: string): void {
        if (!this.srcTemplate) return;
        if (!langCode) {
            langCode = this.lang ?? undefined;
        }
        if (!langCode || this.#failedToFetch.includes(langCode)) {
            console.warn(`Skipping fetch for language: ${langCode} (already failed or not specified)`);
            return;
        }
        const url = this.srcTemplate.replace(this.replacement, langCode);
        const failLang = (err?: Error) => {
            const method = err ? "error" : "warn";
            console[method](`Failed to fetch i18n data for language: ${langCode}`, err ?? '');
            this.#failedToFetch.push(langCode);
        }
        fetch(url).then(response => {
            if (!response.ok) {
                failLang();
                return;
            }
            return response.json();
        }).then(data => {
            if (data) {
                //@ts-expect-error This comes from the ProviderMixin
                this.updateContext("i18n", { ...(this.#i18nData ?? {}), [langCode]: data });
                console.log(`Successfully fetched i18n data for language: ${langCode}`);
            } else {
            }
        }).catch(failLang);
    };
}

export function defineI18NProvider(as: string = "i18n-provider") {
    if (!customElements.get(as)) {
        customElements.define(as, I18NProvider);
    } else {
        console.warn(`Custom element '${as}' is already defined.`);
    }
}

export function I18nConsumerMixin<T extends ReturnType<typeof ConsumerMixin>>(
    Class: T
) {
    return class extends ConsumerMixin(Class) {
        protected translations: Record<string, any> = {};

        get lang(): string {
            const attrVal = this.getAttribute("lang");
            if (attrVal?.length) {
                return attrVal;
            } else {
                const userLangs = navigator.languages || [navigator.language];
                return userLangs[0] || "en";
            }
        }

        public contexts = {
            // Fetch contexts that we care about and subscribe to any changes.
            "i18n": (data: I18nData) => {
                const langRecord = data[this.lang];
                if (langRecord) {
                    this.translations = langRecord;
                }
            },
        };
    }
}