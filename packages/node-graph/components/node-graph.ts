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
  implements Omit<ElementInternals, 'setFormValue' | 'setValidity'>
{
  #internals: ElementInternals;
  #data: object | undefined = undefined;
  static get observedAttributes() {
    return ['disabled', 'readonly', 'value'];
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  //// Form ELementInternals

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

  #setData(data: NodeGraphData): void {
    // MDN: https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity
    if (!data) {
      this.#internals.setValidity(
        {
          valueMissing: true,
        },
        'Data is required'
      );
    } else {
      const definitionCountMsg =
        (data?.definitions?.length ?? 0) ? 'Definitions are required' : '';
      const nodeCount = (data?.nodes?.length ?? 0) ? 'Nodes are required' : '';
      const edgeCount = (data?.edges?.length ?? 0) ? 'Edges are required' : '';
      const valueMissingMsg = [definitionCountMsg, nodeCount, edgeCount].join(
        ', '
      );

      const definitionsAreValid = data.definitions.every((def) => {
        return true;
      })
        ? ''
        : 'Definitions are invalid';
      const nodesAreValid = data.nodes.every((node) => {
        return true;
      })
        ? ''
        : 'Nodes are invalid';
      const edgesAreValid = data.edges.every((edge) => {
        return true;
      })
        ? ''
        : 'Edges are invalid';
      const badInputMsg = [
        definitionsAreValid,
        nodesAreValid,
        edgesAreValid,
      ].join(', ');

      const fullValidityMsg = String([valueMissingMsg, badInputMsg].join('. '));
      const validityState = fullValidityMsg?.length
        ? {
            valueMissing: !!valueMissingMsg,
            badInput: !!badInputMsg,
          }
        : {}; //set as valid using empty object

      this.#data = data;
      this.#internals.setValidity(validityState, fullValidityMsg);
      this.setAttribute('value', JSON.stringify(data, null, 0));
    }
  }

  #render(): void {
    if(this.isConnected){

    }
  }

  checkValidity(): boolean {
    return this.#internals.checkValidity();
  }
  reportValidity(): boolean {
    return this.#internals.reportValidity();
  }

  get validate(): boolean {
    return this.hasAttribute('validate');
  }

  set validate(value: boolean) {
    if (value) {
      this.setAttribute('validate', '');
    } else {
      this.removeAttribute('validate');
    }
  }

  get value(): NodeGraphData | undefined {
    if (this.hasAttribute('value')) {
      try {
        return JSON.parse(this.getAttribute('value') ?? '');
      } catch (e) {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  set value(newVal: NodeGraphData) {
    this.#setData(newVal);
  }

  connectedCallback() {
    console.log('NodeGraph connected');
    this.#render();
  }

  disconnectedCallback() {
    console.log('NodeGraph disconnected');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('NodeGraph attributeChanged', name, oldValue, newValue);
    if(oldValue !== newValue){
    }
  }
}

if (customElements && !customElements.get('node-graph')) {
  customElements.define('node-graph', NodeGraph);
}
