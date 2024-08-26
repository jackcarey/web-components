import { Meta } from "@storybook/web-components";
import { html } from "lit";

export const CreateComponentDecorators = (component: string, styles?: string) => {
    return [
        (story) => {
            import(`../packages/${component}/index.ts`);
            return html`<style>
                    ${styles ?? ""}</style
                >${story()}`;
        },
    ];
};

export const CreateComponentStoryMeta = (component: string): Meta => {
    return {
        component,
        decorators: CreateComponentDecorators(component),
        parameters: {
            controls: { expanded: true },
        },
    };
};
