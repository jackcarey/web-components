class AdaptiveIcon extends HTMLElement {
    #shadowRoot;

    static get observedAttributes() {
        return ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'srcset', 'src'];
    }

    get topLeft() {
        return this.getAttribute('top-left');
    }

    set topLeft(value) {
        if (!value) {
            this.removeAttribute('top-left');
        } else {
            this.setAttribute('top-left', value);
        }
    }

    get topRight() {
        return this.getAttribute('top-right');
    }

    set topRight(value) {
        if (!value) {
            this.removeAttribute('top-right');
        } else {
            this.setAttribute('top-right', value);
        }
    }

    get bottomLeft() {
        return this.getAttribute('bottom-left');
    }

    set bottomLeft(value) {
        if (!value) {
            this.removeAttribute('bottom-left');
        } else {
            this.setAttribute('bottom-left', value);
        }
    }

    get bottomRight() {
        return this.getAttribute('bottom-right');
    }

    set bottomRight(value) {
        if (!value) {
            this.removeAttribute('bottom-right');
        } else {
            this.setAttribute('bottom-right', value);
        }
    }

    get srcset() {
        return this.getAttribute('srcset');
    }

    set srcset(value) {
        if (!value) {
            this.removeAttribute('srcset');
        } else {
            this.setAttribute('srcset', value);
            this.removeAttribute('src');
        }
    }

    get src() {
        return this.getAttribute('src');
    }

    set src(value) {
        if (!value) {
            this.removeAttribute('src');
        } else {
            this.setAttribute('src', value);
            this.removeAttribute('srcset');
        }
    }

    render() {
        if (!this.#shadowRoot) {
            this.#shadowRoot = this.attachShadow({ mode: 'open' });
        }
        const thisId = `adaptive-icon-${Math.random().toString(36).substring(7)}`;
        this.#shadowRoot.host.id = thisId;
        const imgHtml = this.srcset || this.src ? `<img id="" ${this.srcset ? `srcset="${this.srcset ?? ''}"` : ''} ${this.src ? `src="${this.src}"` : ``}/>` : '';
        this.#shadowRoot.innerHTML = `<style>
            :host::part(top-left){position:relative;top:0;left:0}
            :host::part(top-right){position:relative;top:0;right:0}
            :host::part(bottom-left){position:relative;bottom:0;left:0}
            :host::part(bottom-right){position:relative;bottom:0;right:0}
            :host::part(icon) img{width:100%;height:100%;object-fit:contain;aspect-ratio:1;}
        </style>
        <div part="icon"><slot>${imgHtml}</slot></div>
        <div id="top-left" part="top-left"><slot name="top-left">${this.topLeft ?? ''}</slot></div>
        <div id="top-right" part="top-right"><slot name="top-right">${this.topRight ?? ''}</slot></div>
        <div id="bottom-left" part="bottom-left"><slot name="bottom-left">${this.bottomLeft ?? ''}</slot></div>
        <div id="bottom-right" part="bottom-right"><slot name="bottom-right">${this.bottomRight ?? ''}</slot></div>`;
    }

    constructor() {
        super();
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

}

customElements.define('adaptive-icon', AdaptiveIcon);

export default AdaptiveIcon;