import { NGNodeDefinition, NGNodeGraph, NGRegistrar } from "../interfaces";
import { NGValidator } from "../utils/validators";

export default class NGPaletteElement extends HTMLElement implements NGRegistrar {
    #definitions: { [key: string]: NGNodeDefinition } = {};
    constructor() {
        super();
    }

    get definitions() {
        return this.#definitions ?? [];
    }

    get nodeGraph() {
        return {
            title: this.title ?? "NodeGraph Palette",
            definitions: this.definitions,
            nodes: [],
            edges: [],
        };
    }

    #render() {
        //todo: render the palette
        this.innerText = this.title + "\n" + JSON.stringify(this.definitions, null, 2);
    }

    addDefinitions(definitions: NGNodeDefinition[]): void {
        if (Array.isArray(definitions) && definitions.every(NGValidator.NodeDefinition)) {
            definitions.forEach((def) => {
                this.#definitions[def.id] = def;
            });
            this.#render();
        }
    }
    removeDefinitions(definitionIds: string[]): void {
        if (definitionIds?.length) {
            definitionIds.forEach((id) => {
                delete this.#definitions[id];
            });
            this.#render();
        }
    }

    connectedCallback() {
        console.log("NGPalette connected");
        this.#render();
    }

    disconnectedCallback() {
        console.log("NGPalette disconnected");
    }

    //todo: handle drag events
}

if (customElements && !customElements.get("ng-palette")) {
    customElements.define("ng-palette", NGPaletteElement);
}
