type SegmentDataWithLength = Intl.SegmentData & {
    length: number;
};

class DimensionProxy {
    #elLen: number;
    #dividerLen: number;
    #maxTextLen: number;
    #maxChLen: number;
    #onChange: (object: DimensionProxy) => void;
    constructor(onChange: (object: DimensionProxy) => void, initialValue?: object) {
        const { elLen = 0, dividerLen = 0, maxTextLen = 0, maxChLen = 0 } = (initialValue as DimensionProxy) ?? {};
        this.#elLen = elLen;
        this.#dividerLen = dividerLen;
        this.#maxTextLen = maxTextLen;
        this.#maxChLen = maxChLen;
        this.#onChange = onChange;
    }
    get elLen(): number {
        return this.#elLen;
    };
    set elLen(val: number) {
        if (val !== this.#elLen) {
            this.#elLen = val;
            this.#onChange(this);
        }
    }
    get dividerLen() {
        return this.#dividerLen;
    }
    set dividerLen(val) {
        if (val !== this.#dividerLen) {
            this.#dividerLen = val;
            this.#onChange(this);
        }
    }
    get maxTextLen() {
        return this.#maxTextLen;
    }
    set maxTextLen(val) {
        if (val !== this.#maxTextLen) {
            this.#maxTextLen = val;
            this.#onChange(this);
        }
    }
    get maxChLen() {
        return this.#maxChLen;
    }
    set maxChLen(val) {
        if (val !== this.#maxChLen) {
            this.#maxChLen = val;
            this.#onChange(this);
        }
    }
}

/**
 * A custom HTML element that truncates text in the middle to fit within a specified limit.
 * @module middle-truncate
 * @class MiddleTruncate
 * @extends HTMLElement
 * 
 * @attribute {string} value - The text content to be truncated.
 * @attribute {number} limit - The maximum number of characters to display.
 * @attribute {string} dir - The text direction, either 'ltr' (left-to-right) or 'rtl' (right-to-left).
 * 
 */
class MiddleTruncate extends HTMLElement {
    #segmenter: Intl.Segmenter;
    #segments: SegmentDataWithLength[] = [];
    #dimensionUpdateLockId: ReturnType<typeof requestIdleCallback> | undefined;
    #redrawLock: ReturnType<typeof requestAnimationFrame> | undefined;
    #defaultDivider: string = '…';
    #windowFocused = true;
    #resizeObserver: ResizeObserver | undefined;
    #dimensions: DimensionProxy;
    #internals: ElementInternals;

    static get observedAttributes() {
        return ['title', 'at', 'divider', 'disabled', 'ms', 'truncated'];
    }

    constructor() {
        super();
        window.addEventListener("resize", () => {
            this.#render();
        });
        window.addEventListener("focus", () => {
            this.#windowFocused = true;
            this.#render();
        });
        window.addEventListener("blur", () => {
            this.#windowFocused = false;
            this.#cancelNextRender();
        });
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                this.#cancelNextRender();
            } else {
                this.#render();
            }
        });
        this.#dimensions = new DimensionProxy((_dimProxy) => {
            this.#redraw();
        });

        // Attach an ElementInternals to get states property
        this.#internals = this.attachInternals();
    }

    get #canUpdate() {
        if (!this || !this.#windowFocused || !this.isConnected || document.hidden) return false;
        const rect = this.getBoundingClientRect();
        //this isVisible check has a pixel buffer around the screen size
        const bufferPx = 10;
        const isVisible = rect.top >= -bufferPx && rect.bottom <= window.innerHeight + bufferPx && rect.left >= -bufferPx && rect.right <= window.innerWidth + bufferPx;
        return isVisible;
    }

    #cancelNextRender() {
        if (this.#dimensionUpdateLockId) {
            cancelIdleCallback(this.#dimensionUpdateLockId);
            this.#dimensionUpdateLockId = undefined;
        }
        if (this.#redrawLock) {
            cancelAnimationFrame(this.#redrawLock);
            this.#redrawLock = undefined;
        }
    }

    connectedCallback() {
        if (!this.#resizeObserver) {
            this.#resizeObserver = new ResizeObserver((entries) => {
                const { contentBoxSize } = entries[0];
                const { inlineSize } = contentBoxSize[0];
                if (inlineSize) {
                    this.#dimensions.elLen = inlineSize;
                }
            });
        }
        this.#resizeObserver.observe(this);
        this.#render();
    }

    disconnectedCallback() {
        this.#cancelNextRender();
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
    }

    attributeChangedCallback(attrName, _oldVal, newVal) {
        if (attrName === 'title') {
            this.ariaLabel = newVal;
            if (!this.#segmenter) {
                this.#segmenter = new Intl.Segmenter();
            }
            if (!newVal) {
                this.#segments = [];
            } else {
                Array.from(this.#segmenter.segment(newVal)).forEach((segData, idx) => {
                    this.#segments[idx] = {
                        ...segData,
                        input: '', //the input is stored in this.title. No need to duplicate it in memory here
                        length: this.#segments[idx]?.length ?? 0
                    };
                });
            }
        }
        // 'truncated' is read-only and should always match the internal value
        if (attrName === 'truncated') {
            this.#setTruncated(this.truncated);
        }
        this.#render();
    }

    /**
     * The percentage of text to show the truncation at.
     */
    get at(): number {
        const fallback = 50;
        if (this.hasAttribute('at')) {
            try {
                return parseInt(String(this.getAttribute('at')));
            } catch (e) {
                return fallback;
            }
        }
        return fallback;
    }

    /**
     * The percentage of text to show the truncation at.
     */
    set at(val: string | number | undefined | null) {
        if (val === undefined || val === null) {
            this.removeAttribute('at');
        } else {
            const asNum = Math.max(0, Math.min(100, parseInt(String(val))));
            if (asNum) {
                this.setAttribute('at', String(asNum));
            }
        }
    }

    /**
 * The maximum number of milliseconds to wait before recalculating dimensions
 */
    get ms(): number {
        const fallback = 16; //at 60fps 16ms is roughly 1 frame
        if (this.hasAttribute('at')) {
            try {
                return parseInt(String(this.getAttribute('at')));
            } catch (e) {
                return fallback;
            }
        }
        return fallback;
    }

    /**
     * The maximum number of milliseconds to wait before recalculating dimensions
     */
    set ms(val: string | number | undefined | null) {
        if (!val) {
            this.removeAttribute('ms');
        } else {
            const asNum = Math.max(0, parseInt(String(val)));
            if (asNum) {
                this.setAttribute('ms', String(asNum));
            }
        }
    }

    get divider() {
        return this.getAttribute('divider') ?? this.#defaultDivider;
    }

    set divider(val) {
        if (!val?.length) {
            this.removeAttribute('divider');
        } else {
            this.setAttribute('divider', val);
        }
    }

    get truncated() {
        return this.#internals.states.has('truncated');
    }

    #setTruncated(isTruncated: boolean) {
        const hasInternal = this.#internals.states.has('truncated');
        const hasAttr = this.hasAttribute('truncated');
        if (isTruncated && !hasInternal) {
            this.#internals.states.add('truncated');
        } else {
            this.#internals.states.delete('truncated');
        }
        if (isTruncated && !hasAttr) {
            this.setAttribute('truncated', '');
        } else if (this.hasAttribute('truncated')) {
            this.removeAttribute('truncated');
        }
    }

    #redraw() {
        //this is the latest update, it's the only one that should be applied.
        if (this.#redrawLock) {
            cancelAnimationFrame(this.#redrawLock);
            this.#redrawLock = undefined;
        }
        const updateInnerText = (newText: string): boolean => {
            if (this.innerText !== newText) {
                this.innerText = newText ?? '';
                return true;
            };
            return false;
        };
        const redraw = () => {
            if (this && (!this.isConnected || this.hasAttribute('disabled'))) {
                updateInnerText(this.title);
            } else {
                //there's no point rendering elements that aren't seen, so only continue while the element is in view
                if (!this.#canUpdate) return;
                const noTitle = !this.title || !this.#segments?.length;
                this.#setTruncated(this.#dimensions.elLen < this.#dimensions.maxTextLen);
                const useFullText = noTitle || !this.#dimensions.elLen || !this.truncated;
                if (useFullText) {
                    updateInnerText(this.title);
                    return;
                }
                //if the text is too small to display  anything more than the divider
                if (this.#dimensions.elLen <= this.#dimensions.dividerLen) {
                    updateInnerText(this.divider);
                    return;
                }
                const availableSpace = Math.floor(this.#dimensions.elLen - this.#dimensions.dividerLen - this.#dimensions.maxChLen);
                const startMaxPx = Math.floor(availableSpace * (this.at / 100));
                const endMaxPx = Math.floor(availableSpace - startMaxPx);
                const startIdx = this.#segments.filter(({ length: segLen }, idx, arr) => {
                    const sumLen = Math.ceil(arr.slice(0, idx).reduce((prev, curr) => prev + curr.length, 0) + segLen);
                    return sumLen < startMaxPx;
                }).length;
                const endIdx = this.#segments.filter(({ length: segLen }, idx, arr) => {
                    const sumLen = Math.ceil(arr.slice(-idx).reduce((prev, curr) => prev + curr.length, 0) + segLen);
                    return sumLen > endMaxPx;
                }).length;
                const startStr = this.title.slice(0, startIdx);
                const endStr = this.title.slice(endIdx);
                updateInnerText(`${startStr}${this.divider}${endStr}`);
            };
        }
        this.#redrawLock = requestAnimationFrame(redraw);
    }

    #render() {
        if (!this) return;
        //there's an update pending, let it finish
        if (this.#dimensionUpdateLockId) return;
        const updateDimensions = () => {
            const currentText = this.innerText;
            const { writingMode } = getComputedStyle(this);
            const isVertical = writingMode.startsWith('vertical');
            const isSideways = writingMode.startsWith('sideways');
            const useHeight = isVertical || isSideways;

            const getDim = () => {
                const { width, height } = this.getBoundingClientRect();
                return useHeight ? height : width;
            };

            this.#defaultDivider = isVertical ? '︙' : '…'; //unicode FE19 and 2026
            this.innerText = this.divider;
            // const { width: dividerWidth, height: dividerHeight } = this.getBoundingClientRect();
            this.#dimensions.dividerLen = Math.ceil(getDim());

            //determine the dimensions of the text by summing the length and width of each rendered segment
            let fullTextLen = 0;
            this.#segments.forEach((segData, idx) => {
                this.innerText = segData.segment;
                const dim = Math.ceil(getDim());
                fullTextLen += dim;
                this.#segments[idx].length = dim;
                this.#dimensions.maxChLen = Math.max(dim, this.#dimensions.maxChLen);
            });
            this.#dimensions.maxTextLen = fullTextLen;

            this.innerText = this.title;
            //determine the correct element dimensions to use for the next render
            this.#dimensions.elLen = Math.floor(getDim());

            //then restore the correct text
            this.innerText = currentText;
            // and remove the lock on updating dimensions
            this.#dimensionUpdateLockId = undefined;
        };
        this.#dimensionUpdateLockId = requestIdleCallback(updateDimensions, { timeout: this.ms });
    }
}

customElements.define('middle-truncate', MiddleTruncate);