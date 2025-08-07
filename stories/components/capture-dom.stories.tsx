import type { Args, Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";
import { CaptureDOM } from "../../packages/capture-dom";

const renderFn: StoryObj["render"] = (args: Args) => {
    return html` <capture-dom></capture-dom>`;
};

const meta: Meta = {
    ...CreateComponentStoryMeta("capture-dom", undefined, {
        decorators: [
            ...CreateComponentDecorators("capture-dom", undefined),
            (story) => {
                if (!customElements.get("capture-dom")) {
                    customElements.define("capture-dom", CaptureDOM);
                }
                return html`${story()}`;
            },
        ],
    }),
    render: renderFn,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    args: {},
};
