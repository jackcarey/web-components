import NodeGraph from "./components/node-graph";

export interface NGEnvironment {
    id: string;
    label: string;
    src: string;
    description?: string;
}

export interface NGProperty {
    id: string;
    label?: string;
    description?: string;
    value: any;
    isInput?: boolean;
    isOutput?: boolean;
    strict?: boolean;
}

export interface NGNodeDefinition {
    id: string;
    category: string;
    description?: string;
    properties?: {
        [key: string]: NGProperty;
    };
    hidden?: boolean;
    environments: NGEnvironment[];
    metadata?: {
        [key: string]: string;
    };
}

export interface NGBaseNode {
    id: string;
    title: string;
    definition: NGNodeDefinition["id"];
    properties: {
        [key: string]: NGProperty;
    };
}

export interface NGEdge {
    from: string;
    to: string;
    type: string;
    label: {
        text: string;
    };
}

export interface NGNodeGraph {
    title: string;
    description?: string;
    definitions: { [key: string]: NGNodeDefinition };
    nodes: NGBaseNode[];
    edges: NGEdge[];
    metadata?: {
        [key: string]: string;
    };
}

export interface NGRegistrar {
    nodeGraph: NGNodeGraph;
    addDefinitions(definitions: NGNodeDefinition[]): void;
    removeDefinitions(definitionIds: string[]): void;
}
