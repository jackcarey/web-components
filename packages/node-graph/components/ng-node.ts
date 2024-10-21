import { NGBaseNode, NGNodeGraph, NGProperty } from "../interfaces";
import { NGValidator } from "../utils/validators";
import { NGEvents } from "../utils/events";
import NodeGraph from "./node-graph";
export class NGBaseElement extends HTMLElement implements NGBaseNode {
    #ngNode: NGBaseNode;
    #mutationObserver: MutationObserver;
    constructor() {
        super();
    }

    get definition() {
        return this.#ngNode?.definition;
    }

    get fullDefinition() {
        const definitionRegistrar = this.closest("node-graph") ?? this.closest("ng-palette");
        if (!definitionRegistrar || !NGValidator.NGRegistrar(definitionRegistrar)) {
            return undefined;
        } else {
            return (
                definitionRegistrar["nodeGraph"].definitions.find(
                    (def) => def.id === this.#ngNode.definition
                ) ?? undefined
            );
        }
    }

    #getElementAttrName(property: string) {
        return `data-${property}`;
    }

    #setProperties(props: { [key: string]: NGProperty } = {}) {
        if (!props) {
            return;
        }
        for (const [key, propVal] of Object.entries(props)) {
            let val = propVal?.value;
            if (val && typeof val === "object") {
                val = JSON.stringify(val);
            }
            if (!val) {
                this.removeAttribute(this.#getElementAttrName(key));
            } else {
                this.setAttribute(this.#getElementAttrName(key), val);
            }
        }
    }

    get properties() {
        return this.fullDefinition?.properties ?? {};
    }

    set properties(value) {
        if (Array.isArray(value) && value.length > 0 && value.every(NGValidator.Property)) {
            this.#setProperties(value);
        }
    }

    #mutationObserverCallback(mutationList) {
        for (const mutation of mutationList) {
            if (mutation.type === "attributes" && mutation.attributeName in this.properties) {
                const newValue = mutation.target.getAttribute(mutation.attributeName);
                const valueChanged = mutation.oldValue !== newValue;
                if (!valueChanged) {
                    this.setAttribute(mutation.attributeName, mutation.oldValue);
                    return;
                } else {
                    const detail = {
                        attributeName: mutation.attributeName,
                        oldValue: mutation.oldValue,
                        newValue,
                        definition: this.definition,
                    };
                    console.debug(`The definition property was modified.`, detail);
                    this.dispatchEvent(new CustomEvent(NGEvents.NodeChange, { detail }));
                }
            }
        }
    }

    updateMutationObserver() {
        this.#mutationObserver?.disconnect();
        if (!this.#mutationObserver) {
            this.#mutationObserver = new MutationObserver(this.#mutationObserverCallback);
        }
        const definitionRegistrar = this.closest("node-graph") ?? this.closest("ng-palette");
        if (!definitionRegistrar || !NGValidator.NGRegistrar(definitionRegistrar)) {
            return;
        } else {
            if (!this.properties || Object.keys(this.properties).length === 0) {
                return;
            }
            const attributeFilter = Object.keys(this.properties).map((key) => key);
            if (attributeFilter.length === 0) {
                return;
            } else {
                this.#mutationObserver.observe(this, {
                    attributes: true,
                    attributeOldValue: true,
                    attributeFilter,
                });
            }
        }
    }

    get ngNode() {
        return this.#ngNode;
    }

    set ngNode(value: NGBaseNode) {
        if (!value) {
            throw new Error("NGBaseElement: ngNode must be defined");
        }
        if (!NGValidator.BaseNode(value)) {
            throw new Error("NGBaseElement: ngNode is invalid");
        }
        this.#ngNode = value;
        this.updateMutationObserver();
        this.#setProperties(this.#ngNode.properties);
    }

    #render() {
        this.innerHTML = `<p>the ng-node render function is not implemented.</p><slot></slot>`;
    }

    connectedCallback() {
        this.updateMutationObserver();
        this.#render();
    }

    disconnectedCallback() {
        this.#mutationObserver?.disconnect();
    }
}

if (customElements && !customElements.get("ng-node")) {
    customElements.define("ng-node", NGBaseElement);
}
