import { Meta } from "@storybook/web-components";
import { html } from "lit";

export const CreateComponentDecorators = (component: string) => {
    return [
        (story) => {
            import(`../packages/${component}/index.ts`);
            return html`${story()}`;
        },
    ];
};

export const CreateComponentStoryMeta = (component: string): Meta => {
    return {
        title: component,
        component,
        decorators: CreateComponentDecorators(component),
        parameters: {
            controls: { expanded: true },
        },
    };
};
