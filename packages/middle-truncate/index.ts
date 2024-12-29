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

    static get observedAttributes() {
        return ['value', 'limit', 'dir'];
    }

    attributeChangedCallback(_name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    get value() {
        return this.getAttribute('value');
    }
    set value(val) {
        if (val === null) {
            this.removeAttribute('value');
            return;
        }
        this.setAttribute('value', val);
    }
    get limit() {
        const limit = this.getAttribute('limit');
        try {

            return limit === null ? undefined : parseInt(limit);
        } catch (e) {
            return undefined;
        }
    }
    set limit(val: string | number | undefined | null) {
        try {
            if (val === null) {
                this.removeAttribute('limit');
                return;
            }
            const asNumber = !val ? undefined : typeof val === 'string' ? parseInt(val) : val;
            this.setAttribute('limit', String(asNumber));
        } catch (e) {
            //do nothing, the new value is invalid so it will be ignored
        }
    }

    render() {
        const { fontSize } = window.getComputedStyle(this);
        const width = this.getBoundingClientRect().width;
        const isRTL = this.dir === 'rtl';

        const text = this.getAttribute('value') || '';
        const limitAttr = this.getAttribute('limit');
        const actualLimit = limitAttr ? parseInt(limitAttr, 10) : text.length;

        const fontSizeNumStr = fontSize.replace('px', '');
        const chWidth = parseFloat(fontSizeNumStr) / 2; //the width of a single character
        const elWidthNumCh = width / chWidth; // the width of the element in characters
        const maxWidth = Math.min(actualLimit, elWidthNumCh);
        const halfLength = Math.floor(maxWidth / 2);
        const secondHalf = text.substring(text.length - halfLength);

        const shouldTruncateOnLimit = actualLimit < text.length;
        const shouldTruncateOnWidth = maxWidth < text.length;
        const shouldTruncateAtAll = shouldTruncateOnLimit || shouldTruncateOnWidth;

        console.log({ text, limitAttr, actualLimit, fontSize, width, chWidth, elWidthNumCh, maxWidth, halfLength, secondHalf, shouldTruncateOnLimit, shouldTruncateOnWidth, shouldTruncateAtAll });

        if (!shouldTruncateAtAll) {
            this.innerHTML = text;
        } else {
            this.innerHTML = `
                <style>
                .middle-truncate > * {
                    display: inline-block;
                    white-space: nowrap;
                    width: max-content;
                    ${actualLimit <= text.length ? `max-width: ${halfLength}ch;` : ''}
                    vertical-align: bottom;
                }
                .middle-truncate .${isRTL ? 'end' : 'start'}{
                    overflow: clip;
                    text-overflow: ellipsis;
                    }
                    .middle-truncate .${isRTL ? 'start' : 'end'}{
                        overflow: hidden;
                        margin-left: -0.5ch;
                    }
                    </style>
              <span class="middle-truncate" title="${text}">
                <span class="start">${isRTL ? secondHalf : text}</span>
                <span class="end" aria-hidden="true">${isRTL ? text : secondHalf}</span>
              </span>
            `;
        }
    }
}

customElements.define('middle-truncate', MiddleTruncate);