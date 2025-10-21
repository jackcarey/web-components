import { Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";
import { MirrorElement } from "../../packages/mirror-element";

const renderFn: StoryObj["render"] = (args) => {
    return html`<div id="target">
            <p>paragraph 1</p>
        </div>
        <mirror-element selector=${args.selector}></mirror-element>`;
};

const meta: Meta = {
    ...CreateComponentStoryMeta("mirror-element", undefined, {
        decorators: [
            ...CreateComponentDecorators("mirror-element", undefined),
            (story) => {
                if (!customElements.get("mirror-element")) {
                    customElements.define("mirror-element", MirrorElement);
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
    args: {
        selector: "#target",
    },
};

export const ChangingChildren: Story = {
    args: {
        selector: "#target",
    },
    render: (args, context) => {
        const originalStory = renderFn(args, context);
        return html`${originalStory}
            <p>
                The first paragraph will change every second and the
                <code>mirror-element</code> will copy it.
            </p>
            <script>
                setInterval(() => {
                    document.querySelector("#target p").innerText = Date.now();
                }, 1000);
            </script>`;
    },
};
