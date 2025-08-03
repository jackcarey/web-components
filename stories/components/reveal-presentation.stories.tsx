import { Args, Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";
import { RevealPresentation } from "../../packages/reveal-presentation";

const renderFn: StoryObj["render"] = (args: Args) => {
    return html`<reveal-presentation>${JSON.stringify(args, null, 2)}</reveal-presentation>`;
};

const meta: Meta = {
    ...CreateComponentStoryMeta("reveal-presentation", undefined, {
        decorators: [
            ...CreateComponentDecorators("reveal-presentation", undefined),
            (story) => {
                if (!customElements.get("reveal-presentation")) {
                    customElements.define("reveal-presentation", RevealPresentation);
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
