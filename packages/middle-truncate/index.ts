class MiddleTruncate extends HTMLElement {
  static get observedAttributes() {
    return ['at'];
  }
  static get #styles() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      :host span {
        text-overflow:   ellipsis;
        overflow: hidden;
        wrap: nowrap;
        text-wrap: none;
        white-space: nowrap;
        overflow-wrap: hidden;
        max-width: 100%;
        max-height: 100%;
        display: inline-block;
      }
      :host span::after{
        content: var(--content,'');
        inline-size: var(--fragmentSize, 0);
        wrap: nowrap;
        text-wrap: none;
        white-space: nowrap;
        overflow: none;
        border: 1px solid blue;
        display: inline;
        }`);
    return sheet;
  }
  static #segmenter = new Intl.Segmenter();
  #segments: string[] = [];
  #shadowRoot: ShadowRoot;
  #animFrame: number | undefined;
  #mutationObserver: MutationObserver | undefined = undefined;
  #resizeObserver: ResizeObserver | undefined = undefined;
  constructor() {
    super();
    this.#shadowRoot = this.attachShadow({ mode: 'open' });
    this.#shadowRoot.adoptedStyleSheets = [MiddleTruncate.#styles];
  }

  get at(): number {
    const parsed = parseInt(this.getAttribute('at') ?? '');
    if (isNaN(parsed)) {
      return 50;
    }
    return Math.min(100, Math.max(0, parsed));
  }

  set at(value: number | string) {
    if (value) {
      const asInt = parseInt(value.toString(), 10);
      this.setAttribute('at', String(Math.min(100, Math.max(0, asInt))));
    } else {
      this.removeAttribute('at');
    }
  }

  #segmentInnerText = () => {
    this.#segments = Array.from(MiddleTruncate.#segmenter.segment(this.innerText ?? '')).map(s => s.segment);
  }

  connectedCallback() {
    if (!this.#mutationObserver) {
      this.#mutationObserver = new MutationObserver(() => {
        this.#segmentInnerText();
        this.render();
      });
    }
    if (!this.#resizeObserver) {
      this.#resizeObserver = new ResizeObserver(() => this.render());
    }
    this.#mutationObserver.observe(this, { characterData: true });
    this.#resizeObserver.observe(this);
    this.#segmentInnerText();
    this.render();
  }

  disconnectedCallback() {
    this.#mutationObserver?.disconnect();
    this.#resizeObserver?.disconnect();
    this.#mutationObserver = undefined;
    this.#resizeObserver = undefined;
    if (this.#animFrame) {
      cancelAnimationFrame(this.#animFrame);
    }
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.#animFrame) {
      this.#shadowRoot.innerHTML = `<span><slot></slot></span>`;
      const innerSpan = this.#shadowRoot.querySelector('span') as HTMLSpanElement | null;
      if (innerSpan) {
        this.#animFrame = requestAnimationFrame(() => {
          this.#segments = Array.from(MiddleTruncate.#segmenter.segment(this.innerText ?? '')).map(s => s.segment);
          const isVertical = getComputedStyle(this).writingMode.startsWith('vertical');
          const inlineSize = isVertical ? (this.offsetHeight) : (this.offsetWidth);
          const maxFirstPx = this.at / 100 * inlineSize;
          const maxFragmentPx = (inlineSize - maxFirstPx);
          let secondText = '';
          let secondLength = 0;
          for (let i = this.#segments?.length - 1; i >= 0; i--) {
            const segment = this.#segments[i];
            if (secondLength < maxFragmentPx) {
              innerSpan.innerText = segment;
              const fragmentSize = isVertical ? (innerSpan.offsetHeight) : (innerSpan.offsetWidth);
              if (secondLength + fragmentSize < maxFragmentPx) {
                secondText = segment + secondText;
                secondLength += fragmentSize;
              }
            }
          }
          innerSpan.innerHTML = `<slot></slot>`; //reset the slot content
          secondText = secondText.trim();
          console.log({
            innerText: this.innerText,
            at: this.at,
            isVertical,
            inlineSize,
            maxFirstPx,
            maxFragmentPx,
            secondLength,
            secondText,
          });
          innerSpan.style.setProperty('--size', `${maxFirstPx}px`);
          innerSpan.style.setProperty('--fragmentSize', `${maxFragmentPx}px`);
          innerSpan.style.setProperty('--content', `"${secondText}"`);
          this.#animFrame = undefined;
        });
      }
    }
  }
}

customElements.define('middle-truncate', MiddleTruncate);
export default MiddleTruncate;