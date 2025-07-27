import { diffWords, diffChars, diffWordsWithSpace, diffLines, diffSentences, diffCss, diffJson, diffArrays } from 'jsdiff';

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

export class DiffText extends HTMLElement {
    static get setupAttrs() { return ['original', 'changed', 'original-src', 'changed-src', 'refresh']; }
    static get observedAttributes() {
        const jsDiffAttrs = ['mode', 'ignore-case', 'segmenter'];
        return [...jsDiffAttrs, ...DiffText.setupAttrs];
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
    #refreshIntervalListener: ReturnType<typeof setInterval> | null = null;
    #originalValue: string | null = null;
    #changedValue: string | null = null;
    #changes: ChangeObject[] = [];
    #animationFrame: number | null = null;

    get changes() {
        return this.#changes as ChangeObject[];
    }

    get mode() {
        return this.getAttribute('mode') || 'word';
    }

    set mode(value: string) {
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

    get intlSegmenter() {
        return this.getAttribute('segmenter') === 'true';
    }

    set intlSegmenter(value: boolean) {
        if (value) {
            this.setAttribute('segmenter', '');
        } else {
            this.removeAttribute('segmenter');
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

    get refresh(): number | undefined {
        const refreshAttr = this.getAttribute('refresh');
        if (refreshAttr) {
            const refreshNum = parseInt(refreshAttr, 10);
            if (isNaN(refreshNum) || refreshNum <= 0) {
                return undefined;
            }
            return refreshNum;
        }
        return undefined;
    }

    set refresh(value: string) {
        if (value?.length) {
            try {
                const parsedNum = parseInt(value, 10);
                if (parsedNum) {
                    this.setAttribute('refresh', value);
                } else {
                    this.removeAttribute('refresh');
                }
            } catch (_e) {
                this.removeAttribute('refresh');
            }
        } else {
            this.removeAttribute('refresh');
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
        if (this.#refreshIntervalListener) {
            clearInterval(this.#refreshIntervalListener);
            this.#refreshIntervalListener = null;
        }
    }

    #fetchSrcs() {
        const originalSrc = this.getAttribute('original-src');
        const changedSrc = this.getAttribute('changed-src');

        if (originalSrc) {
            fetch(originalSrc)
                .then(response => response.text())
                .then(text => {
                    this.#originalValue = text;
                    this.#render();
                });
        }

        if (changedSrc) {
            fetch(changedSrc)
                .then(response => response.text())
                .then(text => {
                    this.#changedValue = text;
                    this.#render();
                });
        }
    }

    #setup() {
        this.disconnectedCallback();
        const usingOriginalSrc = Boolean(this.getAttribute('original-src'));
        const usingChangedSrc = Boolean(this.getAttribute('changed-src'));
        const refreshAttr = this.getAttribute('refresh');
        const refreshNum = refreshAttr ? parseInt(refreshAttr, 10) : 0
        const usingRefresh = (usingOriginalSrc || usingChangedSrc) && Boolean(refreshNum);

        const usingOriginalEl = !usingOriginalSrc && Boolean(this.getAttribute('original'));
        const usingChangedEl = !usingChangedSrc && Boolean(this.getAttribute('changed'));

        if (usingOriginalSrc || usingChangedSrc) {
            this.#fetchSrcs();
        }

        if (usingRefresh) {
            if (this.#refreshIntervalListener) {
                clearInterval(this.#refreshIntervalListener);
            }
            this.#refreshIntervalListener = setInterval(() => {
                this.#render();
            }, refreshNum);
        }

        if (usingOriginalEl) {
            if (!this.#originalMutationObserver) {
                this.#originalMutationObserver = new MutationObserver(() => {
                    if (originalSelector) {
                        this.#originalMutationObserver = new MutationObserver(() => { this.#render(); });
                    }
                });
            }
            const originalSelector = this.getAttribute('original');
            if (originalSelector) {
                const originalEl = this.querySelector(originalSelector);
                if (originalEl) {
                    this.#originalMutationObserver.observe(originalEl, { childList: true, subtree: true });
                    this.#originalValue = originalEl.textContent || originalEl.innerHTML || '';
                }
            }
        }

        if (usingChangedEl) {
            if (!this.#changedMutationObserver) {
                this.#changedMutationObserver = new MutationObserver(() => {
                    if (changedSelector) {
                        this.#changedMutationObserver = new MutationObserver(() => { this.#render(); });
                    }
                });
            }
            const changedSelector = this.getAttribute('changed');
            if (changedSelector) {
                const originalEl = this.querySelector(changedSelector);
                if (originalEl) {
                    this.#changedMutationObserver.observe(originalEl, { childList: true, subtree: true });
                    this.#changedValue = originalEl.textContent || originalEl.innerHTML || '';
                }
            }
        }
    }

    #updateChanges() {
        const modeFn = DIFF_MODES[this.mode] || diffWords;
        let a = this.#originalValue || '';
        let b = this.#changedValue || '';
        if (this.ignoreCase) {
            a = a.toLowerCase();
            b = b.toLowerCase();
        }
        //todo: handle passing options to jsdiff
        this.#changes = modeFn(a, b);
    }

    #render() {
        if (this.#animationFrame) {
            cancelAnimationFrame(this.#animationFrame);
        }
        this.#animationFrame = requestAnimationFrame(() => {
            this.#updateChanges();
            this.innerHTML = '';
            this.#changes.forEach(change => {
                const span = document.createElement('span');
                span.textContent = change.value;
                if (change.added) {
                    span.classList.add('diff-text-added');
                } else if (change.removed) {
                    span.classList.add('diff-text-removed');
                }
                this.appendChild(span);
            });
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
}

if (customElements && customElements?.define) {
    customElements.define('diff-text', DiffText);
}
