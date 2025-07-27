import { diffWords, diffChars, diffWordsWithSpace, diffLines, diffSentences, diffCss, diffJson, diffArrays } from 'diff';

// https://github.com/kpdecker/jsdiff#change-objects
type ChangeObject = {
    value: string;
    added: boolean;
    removed: boolean;
    count: number;
};

const DIFF_MODES = {
    word: diffWords,
    chars: diffChars,
    wordsWithSpaces: diffWordsWithSpace,
    lines: diffLines,
    sentences: diffSentences,
    css: diffCss,
    json: diffJson,
    arrays: diffArrays,
};

type DiffMode = keyof typeof DIFF_MODES;

type DiffTextOptions<FuncType extends (...any) => any> = Parameters<FuncType>[3];

type AnyDiffOptions = DiffTextOptions<typeof diffWords> | DiffTextOptions<typeof diffChars> | DiffTextOptions<typeof diffWordsWithSpace> | DiffTextOptions<typeof diffLines> | DiffTextOptions<typeof diffSentences> | DiffTextOptions<typeof diffCss> | DiffTextOptions<typeof diffJson> | DiffTextOptions<typeof diffArrays>;

export class DiffText extends HTMLElement {
    static get setupAttrs() { return ['original', 'changed', 'original-src', 'changed-src', 'refetch']; }
    static get observedAttributes() {
        const jsDiffAttrs = ['mode', 'ignore-case'];
        return [...jsDiffAttrs, ...DiffText.setupAttrs, 'compare'];
    }

    static get jsdiff() {
        return {
            word: diffWords,
            chars: diffChars,
            wordsWithSpaces: diffWordsWithSpace,
            lines: diffLines,
            sentences: diffSentences,
            css: diffCss,
            json: diffJson,
            arrays: diffArrays,
        };
    };

    #originalMutationObserver: MutationObserver | null = null;
    #changedMutationObserver: MutationObserver | null = null;
    #refetchIntervalListener: ReturnType<typeof setInterval> | null = null;
    #originalValue: string | undefined;
    #changedValue: string | undefined;
    #changes: ChangeObject[] = [];
    #animationFrame: number | null = null;
    #jsDiffOptions: AnyDiffOptions | null = null;

    get changes() {
        return this.#changes as ChangeObject[];
    }

    get mode(): DiffMode {
        return (this.getAttribute('mode') || 'word') as DiffMode;
    }

    set mode(value: DiffMode) {
        if (!value?.length) {
            this.setAttribute('mode', value);
        } else {
            this.removeAttribute('mode');
        }
    }

    get ignoreCase() {
        return this.getAttribute('ignore-case') === 'true';
    }

    set ignoreCase(value: boolean) {
        if (value) {
            this.setAttribute('ignore-case', '');
        } else {
            this.removeAttribute('ignore-case');
        }
    }

    get original() {
        return this.getAttribute('original') || '';
    }

    set original(value: string) {
        if (value?.length) {
            this.setAttribute('original', value);
        } else {
            this.removeAttribute('original');
        }
    }

    get changed() {
        return this.getAttribute('changed') || '';
    }

    set changed(value: string) {
        if (value?.length) {
            this.setAttribute('changed', value);
        } else {
            this.removeAttribute('changed');
        }
    }

    get originalSrc() {
        return this.getAttribute('original-src') || '';
    }

    set originalSrc(value: string) {
        if (value?.length) {
            this.setAttribute('original-src', value);
        } else {
            this.removeAttribute('original-src');
        }
    }

    get changedSrc() {
        return this.getAttribute('changed-src') || '';
    }

    set changedSrc(value: string) {
        if (value?.length) {
            this.setAttribute('changed-src', value);
        } else {
            this.removeAttribute('changed-src');
        }
    }

    get refetch(): number | undefined {
        const refetchAttr = this.getAttribute('refetch');
        if (refetchAttr) {
            const refetchNum = parseInt(refetchAttr, 10);
            if (isNaN(refetchNum) || refetchNum <= 0) {
                return undefined;
            }
            return refetchNum;
        }
        return undefined;
    }

    set refetch(value: string) {
        if (value?.length) {
            try {
                const parsedNum = parseInt(value, 10);
                if (parsedNum) {
                    this.setAttribute('refetch', value);
                } else {
                    this.removeAttribute('refetch');
                }
            } catch (_e) {
                this.removeAttribute('refetch');
            }
        } else {
            this.removeAttribute('refetch');
        }
    }

    get compare() {
        return this.getAttribute('compare');
    }

    set compare(value: string | null) {
        if (value?.length) {
            this.setAttribute('compare', value);
        } else {
            this.removeAttribute('compare');
        }
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.#setup();
        this.#render();
    }

    disconnectedCallback() {
        this.#originalMutationObserver?.disconnect();
        this.#originalMutationObserver = null;
        this.#changedMutationObserver?.disconnect();
        this.#changedMutationObserver = null;
        if (this.#refetchIntervalListener) {
            clearInterval(this.#refetchIntervalListener);
            this.#refetchIntervalListener = null;
        }
    }

    #fetchSrcs() {
        const originalSrc = this.getAttribute('original-src');
        const changedSrc = this.getAttribute('changed-src');

        const promises: Promise<number | void>[] = [];
        const errors: Error[] = [];

        if (originalSrc) {
            promises.push(fetch(originalSrc)
                .then(response => {
                    if (this.mode === 'json') {
                        return response.json();
                    }
                    return response.text();
                })
                .then(text => {
                    this.#originalValue = text;
                }).catch((e: Error) => errors.push(e)));
        }

        if (changedSrc) {
            promises.push(fetch(changedSrc)
                .then(response => {
                    if (this.mode === 'json') {
                        return response.json();
                    }
                    return response.text();
                })
                .then(text => {
                    this.#changedValue = text;
                }).catch((e: Error) => errors.push(e)));
        }

        //only throw errors after both fetches have been attempted.
        Promise.allSettled(promises).then(() => {
            if (errors.length) {
                console.error('Error fetching diff text sources:');
                errors.forEach(error => console.error(error));
            }
            this.#render();
        });
    }

    #getElementValue = (el: HTMLElement): string => {
        const innerText = el.innerText;
        const compareProp = this.compare;
        if (!compareProp?.length) {
            return innerText;
        }
        const comparePropValue = compareProp in el ? el[compareProp] : null;
        if (compareProp) {
            return comparePropValue;
        }
        const compareAttrValue = el.getAttribute(compareProp);
        if (compareAttrValue) {
            return compareAttrValue;
        }
        return comparePropValue || compareAttrValue || innerText;
    }

    #setup() {
        this.disconnectedCallback();
        const usingOriginalSrc = Boolean(this.getAttribute('original-src'));
        const usingChangedSrc = Boolean(this.getAttribute('changed-src'));
        const refetchAttr = this.getAttribute('refetch');
        const refetchNum = refetchAttr ? parseInt(refetchAttr, 10) : 0
        const usingRefetch = (usingOriginalSrc || usingChangedSrc) && Boolean(refetchNum);

        const usingOriginalEl = !usingOriginalSrc && Boolean(this.original);
        const usingChangedEl = !usingChangedSrc && Boolean(this.changed);

        if (usingOriginalSrc || usingChangedSrc) {
            this.#fetchSrcs();
        }

        if (usingRefetch) {
            if (this.#refetchIntervalListener) {
                clearInterval(this.#refetchIntervalListener);
            }
            if (this.#refetchIntervalListener) {
                clearInterval(this.#refetchIntervalListener);
                this.#refetchIntervalListener = null;
            }
            this.#refetchIntervalListener = setInterval(() => {
                this.#fetchSrcs();
                this.#render();
            }, Math.max(1000, refetchNum * 1000));
        }

        const observerOptions = { childList: true, subtree: true, attributes: true, characterData: true };
        if (usingOriginalEl) {
            const originalSelector = this.getAttribute('original');
            if (this.#originalMutationObserver) {
                this.#originalMutationObserver.disconnect();
            } else if (this.original) {
                this.#originalMutationObserver = new MutationObserver(() => {
                    const originalEl = document.querySelector<HTMLElement>(this.original);
                    this.#originalValue = this.#getElementValue(originalEl as HTMLElement);
                    this.#render();
                });
            }
            if (originalSelector) {
                const originalEl = document.querySelector<HTMLElement>(originalSelector);
                if (originalEl) {
                    this.#originalMutationObserver?.observe(originalEl, observerOptions);
                    this.#originalValue = this.#getElementValue(originalEl);
                }
            }
        }

        if (usingChangedEl) {
            const changedSelector = this.getAttribute('changed');
            if (this.#changedMutationObserver) {
                this.#changedMutationObserver.disconnect();
            } else if (this.changed) {
                this.#changedMutationObserver = new MutationObserver(() => {
                    const changedEl = document.querySelector(this.changed);
                    this.#changedValue = this.#getElementValue(changedEl as HTMLElement);
                    this.#render();
                });
            }
            if (changedSelector) {
                const changedEl = document.querySelector<HTMLElement>(changedSelector);
                if (changedEl) {
                    this.#changedMutationObserver?.observe(changedEl, observerOptions);
                    this.#changedValue = this.#getElementValue(changedEl);
                }
            }
        }
    }

    get options(): AnyDiffOptions {
        return this.#jsDiffOptions || undefined;
    }

    set options(newValue: AnyDiffOptions | null | undefined) {
        if (newValue) {
            this.#jsDiffOptions = newValue as AnyDiffOptions;
        } else {
            this.#jsDiffOptions = null;
        }
        this.#render();
    }

    #updateDiff(): boolean {
        const modeFn = (DIFF_MODES[this.mode] || diffWords) as Function;
        const a = this.#originalValue;
        const b = this.#changedValue;
        const oldChanges = structuredClone(this.#changes);
        const newChanges = modeFn(a ?? '', b ?? '', {
            ignoreCase: Boolean(this.ignoreCase),
            ...(this.options ?? {}),
            //the callback cannot be passed as a jsDiff option as this makes the call async
            //promise.try() could be used here in the future when there's greater usage
            callback: undefined,
        }) as ChangeObject[];

        const hasChanged = newChanges.length !== oldChanges.length || newChanges.some((change, index) => {
            const oldChange = oldChanges[index];
            return !oldChange || change.value !== oldChange.value || change.added !== oldChange.added || change.removed !== oldChange.removed || change.count !== oldChange.count;
        });

        if (hasChanged) {
            this.#changes = newChanges;

            //handling the options callback provides compatibility with the jsDiff API
            //@ts-expect-error - callback type isn't inferred
            if (this.options && this.options?.callback && typeof this.options?.callback === 'function') {
                //@ts-expect-error - callback type isn't inferred
                this.options?.callback(this.#changes);
            }
            const eventDetail = {
                ...Object.fromEntries(DiffText.observedAttributes.map(attr => {
                    return [attr, this.getAttribute(attr)];
                })),
                options: this.options,
                original: this.#originalValue,
                changed: this.#changedValue,
                changes: this.#changes,
            }
            this.dispatchEvent(new CustomEvent('diff-text', {
                detail: eventDetail,
                bubbles: true,
                composed: true,
                cancelable: true,
            }));
        }
        return hasChanged;
    }

    #render() {
        if (this.#animationFrame) {
            cancelAnimationFrame(this.#animationFrame);
        }
        this.#animationFrame = requestAnimationFrame(() => {
            const changed = this.#updateDiff();
            if (changed) {
                this.innerHTML = '';
                this.#changes.forEach(change => {
                    const span = document.createElement('span');
                    span.textContent = change.value;
                    if (change.added) {
                        span.classList.add('diff-text-added');
                    } else if (change.removed) {
                        span.classList.add('diff-text-removed');
                    }
                    span.dataset.diffTextCount = change.count.toString();
                    this.appendChild(span);
                });
            }
        });
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        if (name === 'mode' && newValue?.length && !DIFF_MODES[newValue]) {
            this.setAttribute('mode', 'word');
            return;
        }
        const requiresNewSetup = DiffText.setupAttrs.includes(name);
        if (requiresNewSetup) {
            this.#setup();
        }

        this.#render();
    }

    refresh() {
        this.#setup();
        this.#render();
    }
}

if (customElements && customElements?.define) {
    customElements.define('diff-text', DiffText);
}
