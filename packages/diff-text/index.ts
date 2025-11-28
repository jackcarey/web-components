import { diffWords, diffChars, diffWordsWithSpace, diffLines, diffSentences, diffCss, diffJson, diffArrays } from 'diff';

// https://github.com/kpdecker/jsdiff#change-objects
/**
 * Represents a single change in a diff operation.
 *
 * @property value - The text content associated with this change.
 * @property added - Indicates if this segment was added.
 * @property removed - Indicates if this segment was removed.
 * @property count - The number of characters or items in this change.
 */
type ChangeObject = {
    value: string;
    added: boolean;
    removed: boolean;
    count: number;
};

/**
 * A mapping of diff mode names to their corresponding diffing functions.
 *
 * Each key represents a diff mode, such as 'word', 'chars', 'lines', etc.,
 * and maps to a function that performs the diff operation for that mode.
 *
 * Available diff modes:
 * - `word`: Diffs by words.
 * - `chars`: Diffs by individual characters.
 * - `wordsWithSpaces`: Diffs by words, preserving spaces.
 * - `lines`: Diffs by lines.
 * - `sentences`: Diffs by sentences.
 * - `css`: Diffs CSS code.
 * - `json`: Diffs JSON objects.
 * - `arrays`: Diffs arrays.
 *
 * @remarks
 * The diffing functions (e.g., `diffWords`, `diffChars`) must be defined and imported in the module.
 */
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

type DiffTextOptions<FuncType extends (...params: any) => any> = Parameters<FuncType>[3];

type AnyDiffOptions = DiffTextOptions<typeof diffWords> | DiffTextOptions<typeof diffChars> | DiffTextOptions<typeof diffWordsWithSpace> | DiffTextOptions<typeof diffLines> | DiffTextOptions<typeof diffSentences> | DiffTextOptions<typeof diffCss> | DiffTextOptions<typeof diffJson> | DiffTextOptions<typeof diffArrays>;

/**
 * A custom HTML element for displaying and updating text differences ("diffs") between two sources.
 * 
 * The `DiffText` web component compares two text sources (either from attributes, DOM elements, or remote URLs)
 * and renders the differences using customizable diff modes (e.g., word, character, line, or JSON).
 * It supports live updates via MutationObservers or periodic refetching from remote sources.
 * 
 * ## Attributes
 * - `original`: CSS selector for the original text element, or direct text value.
 * - `changed`: CSS selector for the changed text element, or direct text value.
 * - `original-src`: URL to fetch the original text from.
 * - `changed-src`: URL to fetch the changed text from.
 * - `refetch`: Interval (in seconds) to periodically refetch remote sources.
 * - `mode`: Diff mode to use (`word`, `char`, `line`, `json`, etc.).
 * - `ignore-case`: If present, performs a case-insensitive diff.
 * - `compare`: Property or attribute name to use for extracting text from elements.
 * 
 * ## Properties
 * - `changes`: The current array of diff change objects.
 * - `mode`: The current diff mode.
 * - `ignoreCase`: Whether to ignore case when diffing.
 * - `original`: The original text or selector.
 * - `changed`: The changed text or selector.
 * - `originalSrc`: The URL for the original text.
 * - `changedSrc`: The URL for the changed text.
 * - `refetch`: The refetch interval in seconds.
 * - `compare`: The property or attribute to use for comparison.
 * - `options`: Additional options for the diff algorithm.
 * 
 * ## Methods
 * - `refresh()`: Manually refreshes the diff by re-fetching sources and re-rendering.
 * 
 * ## Events
 * - Dispatches a `diff-text` CustomEvent whenever the diff changes, with details about the diff and current options.
 * 
 * ## Usage Example
 * ```html
 * <diff-text original="#old" changed="#new" mode="word"></diff-text>
 * ```
 * 
 * @element diff-text
 * @fires diff-text - Fired when the diff changes.
 * @public
 */
export class DiffText extends HTMLElement {
    static get setupAttrs(): string[] { return ['original-selector', 'changed-selector', 'original-src', 'changed-src', 'refetch']; }
    static get observedAttributes(): string[] {
        const jsDiffAttrs = ['mode', 'ignore-case'];
        return [...jsDiffAttrs, ...DiffText.setupAttrs, 'original', 'changed', 'compare'];
    }

    #originalMutationObserver: MutationObserver | null = null;
    #changedMutationObserver: MutationObserver | null = null;
    #refetchIntervalListener: ReturnType<typeof setInterval> | null = null;
    #originalValue: string | undefined;
    #changedValue: string | undefined;
    #changes: ChangeObject[] = [];
    #animationFrame: number | null = null;
    #jsDiffOptions: AnyDiffOptions | null = null;

    get changes(): ChangeObject[] {
        return this.#changes;
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

    get ignoreCase(): boolean {
        return this.getAttribute('ignore-case') === 'true';
    }

    set ignoreCase(value: boolean) {
        if (value) {
            this.setAttribute('ignore-case', '');
        } else {
            this.removeAttribute('ignore-case');
        }
    }

    get original(): string {
        return this.getAttribute('original') || '';
    }

    set original(value: string) {
        if (value?.length) {
            this.setAttribute('original', value);
        } else {
            this.removeAttribute('original');
        }
    }

    get changed(): string {
        return this.getAttribute('changed') || '';
    }

    set changed(value: string) {
        if (value?.length) {
            this.setAttribute('changed', value);
        } else {
            this.removeAttribute('changed');
        }
    }

    get originalSelector(): string {
        return this.getAttribute('original-selector') || '';
    }

    set originalSelector(value: string) {
        if (value?.length) {
            this.setAttribute('original-selector', value);
        } else {
            this.removeAttribute('original-selector');
        }
    }

    get changedSelector(): string {
        return this.getAttribute('changed-selector') || '';
    }

    set changedSelector(value: string) {
        if (value?.length) {
            this.setAttribute('changed-selector', value);
        } else {
            this.removeAttribute('changed-selector');
        }
    }

    get originalSrc(): string {
        return this.getAttribute('original-src') || '';
    }

    set originalSrc(value: string) {
        if (value?.length) {
            this.setAttribute('original-src', value);
        } else {
            this.removeAttribute('original-src');
        }
    }

    get changedSrc(): string {
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

    get compare(): string | null {
        return this.getAttribute('compare');
    }

    set compare(value: string | null) {
        if (value?.length) {
            this.setAttribute('compare', value);
        } else {
            this.removeAttribute('compare');
        }
    }

    get debug(): boolean {
        return this.hasAttribute("debug");
    }

    set debug(val: boolean) {
        if (val) {
            this.setAttribute("debug", "");
        } else {
            this.removeAttribute("debug");
        }
    }

    #debugLog(...message: any[]) {
        if (this.debug) {
            console.log(...message);
        }
    }

    connectedCallback(): void {
        this.#setup();
        this.#render();
    }

    disconnectedCallback(): void {
        this.#originalMutationObserver?.disconnect();
        this.#originalMutationObserver = null;
        this.#changedMutationObserver?.disconnect();
        this.#changedMutationObserver = null;
        if (this.#refetchIntervalListener) {
            clearInterval(this.#refetchIntervalListener);
            this.#refetchIntervalListener = null;
        }
    }

    #fetchSrcs(): void {
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
        const compareProp = this.compare;
        if (!compareProp?.length) {
            return el.innerText;
        }
        const comparePropValue = compareProp in el ? (el as any)[compareProp] : null;
        if (compareProp) {
            return comparePropValue;
        }
        const compareAttrValue = el.getAttribute(compareProp);
        if (compareAttrValue) {
            return compareAttrValue;
        }
        if (el instanceof DiffText) {
            const joinChar = this.mode === "lines" ? "\n" : "";
            const elText = Array.from(el.children)
                .filter(child => !child.classList.contains('diff-text-removed'))
                .map(child => (child as HTMLElement).innerText)
                .join(joinChar);
            return elText;
        }
        const innerText = el.innerText;
        return innerText;
    }

    #setup(): void {
        this.disconnectedCallback();
        const usingOriginalSrc = Boolean(this.getAttribute('original-src'));
        const usingChangedSrc = Boolean(this.getAttribute('changed-src'));
        const refetchAttr = this.getAttribute('refetch');
        const refetchNum = refetchAttr ? parseInt(refetchAttr, 10) : 0
        const usingRefetch = (usingOriginalSrc || usingChangedSrc) && Boolean(refetchNum);

        const usingOriginalEl = !usingOriginalSrc && Boolean(this.originalSelector);
        const usingChangedEl = !usingChangedSrc && Boolean(this.changedSelector);

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
            if (this.#originalMutationObserver) {
                this.#originalMutationObserver.disconnect();
            } else if (this.originalSelector) {
                this.#originalMutationObserver = new MutationObserver(() => {
                    const originalEl = document.querySelector<HTMLElement>(this.originalSelector);
                    this.#originalValue = this.#getElementValue(originalEl as HTMLElement);
                    this.#render();
                });
            }
            if (this.originalSelector) {
                const originalEl = document.querySelector<HTMLElement>(this.originalSelector);
                if (originalEl) {
                    this.#originalMutationObserver?.observe(originalEl, observerOptions);
                    originalEl.addEventListener('input', () => {
                        this.#originalValue = this.#getElementValue(originalEl as HTMLElement);
                        this.#render();
                    });
                    this.#originalValue = this.#getElementValue(originalEl);
                }
            }
        }

        if (usingChangedEl) {
            if (this.#changedMutationObserver) {
                this.#changedMutationObserver.disconnect();
            } else if (this.changedSelector) {
                this.#changedMutationObserver = new MutationObserver(() => {
                    console.log('changed mutation observer');
                    const changedEl = document.querySelector(this.changedSelector);
                    this.#changedValue = this.#getElementValue(changedEl as HTMLElement);
                    this.#render();
                });
            }
            if (this.changedSelector) {
                const changedEl = document.querySelector<HTMLElement>(this.changedSelector);
                if (changedEl) {
                    this.#changedMutationObserver?.observe(changedEl, observerOptions);
                    changedEl.addEventListener('input', () => {
                        this.#changedValue = this.#getElementValue(changedEl as HTMLElement);
                        this.#render();
                    });
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
        const oldChanges = structuredClone(this.#changes);
        const newChanges = modeFn(this.#originalValue ?? '', this.#changedValue ?? '', {
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

        this.#debugLog({
            mode: this.mode,
            original: this.#originalValue,
            changed: this.#changedValue,
            newChanges,
            hasChanged
        })

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

            this.#debugLog('diff-text emitted event');
        }
        return hasChanged;
    }

    #render(): void {
        // canceling the previous animation frame ensures only one render per frame
        if (this.#animationFrame) {
            cancelAnimationFrame(this.#animationFrame);
        }
        this.#animationFrame = requestAnimationFrame(() => {
            const changed = this.#updateDiff();
            if (changed) {
                this.innerHTML = '';
                this.#debugLog('rendering changes', this.#changes);
                this.#changes.forEach(change => {
                    const elName = change.added ? 'ins' : change.removed ? 'del' : 'span';
                    const el = document.createElement(elName);
                    el.textContent = change.value;
                    if (change.removed) {
                        el.setAttribute("contenteditable", "false");
                    }
                    el.dataset.diffTextCount = change.count.toString();
                    this.appendChild(el);
                });
            }
        });
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
        if (name === 'mode' && newValue?.length && !DIFF_MODES[newValue as keyof typeof DIFF_MODES]) {
            this.setAttribute('mode', 'word');
            return;
        }
        if (name === 'original') {
            this.#originalValue = newValue;
        }
        if (name === 'changed') {
            this.#changedValue = newValue;
        }
        const requiresNewSetup = DiffText.setupAttrs.includes(name);
        if (requiresNewSetup) {
            this.#setup();
        }

        this.#render();
    }

    refresh(): void {
        this.#setup();
        this.#render();
    }
}

if (customElements?.define && !customElements.get('diff-text')) {
    customElements.define('diff-text', DiffText);
}
