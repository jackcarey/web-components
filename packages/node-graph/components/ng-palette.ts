export default class NGPalette extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        console.log('NGPalette connected');
    }

    disconnectedCallback(){
        console.log('NGPalette disconnected');
    }
}

if(customElements && !customElements.get('ng-palette')){
    customElements.define('ng-palette', NGPalette);
}