import {
    NGBaseNode,
    NGEdge,
    NGEnvironment,
    NGNodeDefinition,
    NGNodeGraph,
    NGProperty,
    NGRegistrar,
} from "../interfaces";

export namespace NGValidator {
    export function Environment(value: any): value is NGEnvironment {
        return (
            typeof value === "object" &&
            typeof value.id === "string" &&
            typeof value.label === "string" &&
            typeof value.src === "string" &&
            (typeof value.description === "string" || value.description === undefined)
        );
    }

    export function Property(value: any): value is NGProperty {
        return (
            typeof value === "object" &&
            typeof value.id === "string" &&
            (typeof value.label === "string" || value.label === undefined) &&
            (typeof value.description === "string" || value.description === undefined) &&
            (typeof value.default === "string" || value.default === undefined) &&
            (typeof value.isInput === "boolean" || value.isInput === undefined) &&
            (typeof value.isOutput === "boolean" || value.isOutput === undefined) &&
            (typeof value.strict === "boolean" || value.strict === undefined)
        );
    }

    export function NodeDefinition(value: any): value is NGNodeDefinition {
        return (
            typeof value === "object" &&
            typeof value.id === "string" &&
            typeof value.category === "string" &&
            (typeof value.description === "string" || value.description === undefined) &&
            (Array.isArray(value.properties) || value.properties === undefined) &&
            (typeof value.hidden === "boolean" || value.hidden === undefined) &&
            Array.isArray(value.environments) &&
            (typeof value.metadata === "object" || value.metadata === undefined)
        );
    }

    export function BaseNode(value: any): value is NGBaseNode {
        return (
            typeof value === "object" &&
            typeof value.id === "string" &&
            typeof value.title === "string" &&
            typeof value.definition === "string" &&
            typeof value.properties === "object"
        );
    }

    export function Edge(value: any): value is NGEdge {
        return (
            typeof value === "object" &&
            typeof value.from === "string" &&
            typeof value.to === "string" &&
            typeof value.type === "string" &&
            typeof value.label === "object" &&
            typeof value.label.text === "string"
        );
    }

    export function NodeGraph(value: any): value is NGNodeGraph {
        return (
            typeof value === "object" &&
            typeof value.title === "string" &&
            (typeof value.description === "string" || value.description === undefined) &&
            Array.isArray(value.definitions) &&
            value.definitions.every(NodeDefinition) &&
            Array.isArray(value.nodes) &&
            value.nodes.every(BaseNode) &&
            Array.isArray(value.edges) &&
            value.edges.every(Edge) &&
            (typeof value.metadata === "object" || value.metadata === undefined)
        );
    }

    export function NGRegistrar(value?: Element | null): value is NGRegistrar {
        const defs = value?.["nodeGraph"]?.["definitions"];
        return (
            Boolean(value) &&
            value instanceof HTMLElement &&
            Array.isArray(defs) &&
            (defs.length == 0 || defs.every(NodeDefinition))
        );
    }
}
