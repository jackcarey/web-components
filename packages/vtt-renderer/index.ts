


class VTTRenderer extends HTMLElement {
    #shadowRoot: ShadowRoot;
    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#shadowRoot.innerHTML = `<p>VTT Renderer Component</p>`;
    }

    connectedCallback() {
        console.log('VTTRenderer connected');
    }

    disconnectedCallback() {
        console.log('VTTRenderer disconnected');
    }
}

customElements.define('vtt-renderer', VTTRenderer);

export default VTTRenderer;