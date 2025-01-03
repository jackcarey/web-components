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
