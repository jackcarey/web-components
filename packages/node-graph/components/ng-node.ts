export class NGBaseNode {
    constructor() {}
}

export class NGBaseElement extends HTMLElement implements NGBaseNode {
    #ngNode = new NGBaseNode();
    constructor(){
        super();
    }

    connectedCallback(){
        console.log('NGBaseElement connected');
    }

    disconnectedCallback(){
        console.log('NGBaseElement disconnected');
    }
}

if(customElements && !customElements.get('ng-node')){
    customElements.define('ng-node', NGBaseElement);
}
