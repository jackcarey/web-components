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

    attributeChangedCallback(name) {
        if (name === 'value' || name === 'limit') {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const text = this.getAttribute('value') || '';
        const limitAttr = this.getAttribute('limit');
        const attrLimit = limitAttr ? parseInt(limitAttr, 10) : text.length;

        const { fontSize, width } = window.getComputedStyle(this);
        const chWidth = parseFloat(fontSize) / 2; //the width of a single character
        const elWidthCh = parseFloat(width) / chWidth; // the width of the element in characters
        const maxWidth = Math.min(attrLimit, elWidthCh);

        const isRTL = this.dir === 'rtl';
        const halfLength = Math.floor(maxWidth / 2);
        const secondHalf = text.substring(text.length - halfLength);


        this.innerHTML = `
        <style>
        .middle-truncate > * {
            display: inline-block;
            white-space: nowrap;
            max-width: ${halfLength}ch;
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

customElements.define('middle-truncate', MiddleTruncate);