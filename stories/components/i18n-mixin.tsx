import type { Meta, StoryObj as Story } from "@storybook/web-components";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";
import { defineI18NProvider } from "../../packages/i18n-mixin/index";

// This default export determines where your story goes in the story list
const meta: Meta = {
    ...CreateComponentStoryMeta("i18n-mixin", undefined, {
        decorators: [
            ...CreateComponentDecorators("i18n-mixin"),
            (story) => {
                defineI18NProvider();
                return html`${story()}`;
            },
        ],
    }),
};

export default meta;

export const Default: Story = {
    args: {},
    render: () => {
        return html`<i18n-provider>
            <p>Some default text</p>
        </i18n-provider>`;
    },
};

export const WithLang: Story = {
    args: {
        lang: "en",
    },
    render: (args) => {
        return html` <i18n-provider lang="${args.lang}">
            <p>${args.lang} text</p>
        </i18n-provider>`;
    },
};
