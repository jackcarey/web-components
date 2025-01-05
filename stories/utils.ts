import { Meta } from "@storybook/web-components";
import { html } from "lit";

export const CreateComponentDecorators = (component: string, styles?: string) => {
    return [
        (story) => {
            import(`../packages/${component}/index.ts`);
            return html`<style>
                    ${styles ?? ""}</style
                >${story()}`;
        }
    ];
};

export const CreateComponentStoryMeta = (component: string, styles?: string, overrides?: Meta): Meta => {
    return {
        component,
        parameters: {
            controls: { expanded: true },
        },
        decorators: CreateComponentDecorators(component, styles),
        ...overrides,
    };
};

const CreateUtilityStoryDecorators = (utility: string) => {
    return [(_story, context) => {
        import(`../packages/${utility}/index.ts`);
        const { args, name } = context;
        const { code } = args;
        const result = code ? eval(code) : undefined;
        const thisStoryId = `utility-${utility}-${Math.round(Math.random() * 10000)}`;
        const cssId = '#' + thisStoryId;
        const systemStackStr = `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;
        const styleStr = html`<style>${cssId}{border:1px dashed lightgrey;padding: 0.5ch;font-family: ${systemStackStr};} ${cssId} > output{padding: 0.5ch 0.5em;width:max-content;height:max-content;min-width:1em;min-height:1em;border: 1px solid red;}</style>`;
        const pStr = html`<p>'${name}' story for '<code>${utility}</code>' utility. Check the browser console if you don't see anything in the box below.</p>`;
        return html`${styleStr}<div id="${thisStoryId}">${pStr}<output>${result ?? ''}<output></div>`;
    }];
}

export const CreateUtilityStoryMeta = (utility: string, overrides?: Meta): Meta => {
    return {
        component: utility,
        parameters: {
            controls: { expanded: true }
        },
        decorators: CreateUtilityStoryDecorators(utility),
        ...overrides

    };
};