import { Meta } from "@storybook/web-components";
import { html } from "lit";

export const CreateComponentDecorators = (component: string) => {
    return [
        (story) => {
            return html`${story()}`;
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
