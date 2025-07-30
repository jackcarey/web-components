import type { Args, Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";
import KBDClick from "../../packages/kbd-click";

const renderFn: StoryObj["render"] = (args: Args) => {
    return html` <style>
            kbd-click {
                display: contents;
            }
            kbd {
                background-color: #f0f0f0;
                border: 1px solid #ccc;
                border-radius: 3px;
                padding: 2px 4px;
                font-family: monospace;
            }
        </style>
        <kbd-click
            ${args.passive ? "passive" : ""}
            ${args.capture ? "capture" : ""}
            ${args.allowRepeat ? "allow-repeat" : ""}
            filter="${args.filter || ""}"
        >
            <p>
                Press <button onclick="alert('from A button')"><kbd>A</kbd></button>,
                <button onclick="alert('from B button')"><kbd>B</kbd></button>, or
                <button onclick="alert('from C button')"><kbd>C</kbd></button>
                to trigger a click event.
            </p>
        </kbd-click>`;
};

// This default export determines where your story goes in the story list
const meta: Meta = {
    ...CreateComponentStoryMeta("kbd-click", undefined, {
        decorators: [
            ...CreateComponentDecorators("kbd-click", undefined),
            (story) => {
                if (!customElements.get("kbd-click")) {
                    customElements.define("kbd-click", KBDClick);
                }
                return html`${story()}`;
            },
        ],
    }),
    render: renderFn,
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
    args: {},
};
