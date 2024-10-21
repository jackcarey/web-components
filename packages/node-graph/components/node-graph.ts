import { NGValidator } from "../utils/validators";

export interface NodeGraphDefinition {
    name: string;
    type: string;
    description: string;
    properties: Record<string, unknown>;
    inputPorts: Record<string, unknown>;
    outputPorts: Record<string, unknown>;
}
export interface NodeGraphNode {}
export interface NodeGraphEdge {}

export type NodeGraphData = {
    definitions: NodeGraphDefinition[];
    nodes: NodeGraphNode[];
    edges: NodeGraphEdge[];
};

export default class NodeGraph
    extends HTMLElement
    implements Omit<ElementInternals, "setFormValue" | "setValidity">
{
    #internals: ElementInternals;
    #data: object | undefined = undefined;
    static get observedAttributes() {
        return ["disabled", "readonly", "value"];
    }

    constructor() {
        super();
        this.#internals = this.attachInternals();
    }

    // #region Form ElementInternals

    get form(): HTMLFormElement | null {
        return this.#internals.form;
    }

    get labels(): NodeList {
        return this.#internals.labels;
    }

    get states(): CustomStateSet {
        return this.#internals.states;
    }

    get validationMessage(): string {
        return this.#internals.validationMessage;
    }

    get validity(): ValidityState {
        return this.#internals.validity;
    }

    get willValidate(): boolean {
        return this.#internals.willValidate;
    }

    checkValidity(): boolean {
        return this.#internals.checkValidity();
    }
    reportValidity(): boolean {
        return this.#internals.reportValidity();
    }

    // #endregion
    // #region Properties

    #setData(data: NodeGraphData): void {
        // MDN: https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity
        if (!data) {
            this.#internals.setValidity(
                {
                    valueMissing: true,
                },
                "Data is required"
            );
        } else {
            const definitionCountMsg = Array.isArray(data?.definitions)
                ? ""
                : "Definitions are required";
            const nodeCount = Array.isArray(data?.nodes) ? "" : "Nodes property is required";
            const edgeCount = Array.isArray(data?.edges) ? "" : "Edges property is required";
            const valueMissingMsg = [definitionCountMsg, nodeCount, edgeCount].join(", ");

            const definitionsAreValid = data.definitions.every(NGValidator.NodeDefinition)
                ? ""
                : "Definitions are invalid";
            const nodesAreValid = data.nodes.every(NGValidator.BaseNode) ? "" : "Nodes are invalid";
            const edgesAreValid = data.edges.every(NGValidator.Edge) ? "" : "Edges are invalid";
            const badInputMsg = [definitionsAreValid, nodesAreValid, edgesAreValid].join(", ");

            const fullValidityMsg = String([valueMissingMsg, badInputMsg].join(". "));
            const validityState = fullValidityMsg?.length
                ? {
                      valueMissing: !!valueMissingMsg,
                      badInput: !!badInputMsg,
                  }
                : {}; //set as valid using empty object

            this.#data = data;
            this.#internals.setValidity(validityState, fullValidityMsg);
            const strVal = JSON.stringify(data);
            this.#internals.setFormValue(strVal);
            this.setAttribute("value", strVal);
        }
    }

    get validate(): boolean {
        return this.hasAttribute("validate");
    }

    set validate(value: boolean) {
        if (value) {
            this.setAttribute("validate", "");
        } else {
            this.removeAttribute("validate");
        }
    }

    get value(): NodeGraphData | undefined {
        if (this.hasAttribute("value")) {
            try {
                return JSON.parse(this.getAttribute("value") ?? "");
            } catch (e) {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    set value(newVal: NodeGraphData) {
        this.#setData(newVal);
        this.#render();
    }

    get disabled(): boolean {
        return this.hasAttribute("disabled");
    }

    set disabled(value: boolean) {
        if (value) {
            this.setAttribute("disabled", "");
        } else {
            this.removeAttribute("disabled");
        }
    }

    get readonly(): boolean {
        return this.hasAttribute("readonly");
    }

    set readonly(value: boolean) {
        if (value) {
            this.setAttribute("readonly", "");
        } else {
            this.removeAttribute("readonly");
        }
    }

    // #endregion
    // #region Lifecycle callbacks

    #render(): void {
        this.innerText = this.title + "\n" + JSON.stringify(this.#data, null, 2);
    }

    connectedCallback() {
        console.log("NodeGraph connected");
    }

    disconnectedCallback() {
        console.log("NodeGraph disconnected");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("NodeGraph attributeChanged", name, oldValue, newValue);
        if (oldValue !== newValue) {
            this.#render();
        }
    }

    // #endregion
}

if (customElements && !customElements.get("node-graph")) {
    customElements.define("node-graph", NodeGraph);
}
