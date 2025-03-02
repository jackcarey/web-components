class MiddleTruncate extends HTMLElement {
  static get observedAttributes() {
    return ['at'];
  }
  static get #styles() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      :host span {
        wrap: nowrap;
        text-wrap: none;
        white-space: nowrap;
        display: inline-block block;
        }
        :host #start{
          text-overflow: ellipsis;
          overflow: hidden;
      }
      :host #end{
          text-overflow: visible;
          overflow: hidden;
          text-align: end;
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
      this.#shadowRoot.innerHTML = `<span id="start"><slot></slot></span><span id="end"></span>`;
      const startSpan = this.#shadowRoot.querySelector('#start') as HTMLSpanElement;
      const endSpan = this.#shadowRoot.querySelector('#end') as HTMLSpanElement;
      if (startSpan && endSpan) {
        this.#animFrame = requestAnimationFrame(() => {
          this.#segments = Array.from(MiddleTruncate.#segmenter.segment(this.innerText ?? '')).map(s => s.segment);
          const isVertical = getComputedStyle(this).writingMode.startsWith('vertical');
          const inlineSize = isVertical ? (this.offsetHeight) : (this.offsetWidth);
          const maxFirstPx = (this.at / 100 * inlineSize);
          const maxFragmentPx = 0.9 * (inlineSize - maxFirstPx);

          let firstText = '';
          let firstLength = 0;
          for (let i = 0; i < this.#segments?.length; i++) {
            const segment = this.#segments[i];
            if (firstLength < maxFirstPx) {
              startSpan.innerText = segment;
              const fragmentSize = isVertical ? (startSpan.offsetHeight) : (startSpan.offsetWidth);
              if (firstLength + fragmentSize < maxFirstPx) {
                firstText += segment;
                firstLength += fragmentSize;
              }
            }
          }

          let secondText = '';
          let secondLength = 0;
          for (let i = this.#segments?.length - 1; i >= 0; i--) {
            const segment = this.#segments[i];
            if (secondLength < maxFragmentPx) {
              startSpan.innerText = segment;
              const fragmentSize = isVertical ? (startSpan.offsetHeight) : (startSpan.offsetWidth);
              if (secondLength + fragmentSize < maxFragmentPx) {
                secondText = segment + secondText;
                secondLength += fragmentSize;
              }
            }
          }

          firstText = firstText.trim();
          secondText = secondText.trim();
          startSpan.innerText = firstText;
          endSpan.innerText = secondText;
          startSpan.style.setProperty('max-width', `${maxFirstPx}px`);
          endSpan.style.setProperty('width', `${maxFragmentPx}px`);
          this.#animFrame = undefined;
          console.log({
            innerText: this.innerText,
            at: this.at,
            isVertical,
            inlineSize,
            maxFirstPx,
            maxFragmentPx,
            secondLength,
            secondText,
            scrollHeight: this.scrollHeight,
            scrollWidth: this.scrollWidth,
          });
        });
      }
    }
  }
}

customElements.define('middle-truncate', MiddleTruncate);
export default MiddleTruncate;