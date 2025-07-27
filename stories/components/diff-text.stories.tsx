import { Args, Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";
import { DiffText } from "../../packages/diff-text";

const renderFn: StoryObj["render"] = (args: Args) => {
    return html`<style>
            diff-text {
                display: block;
                border: 1px solid #ccc;
                min-height: 1em;
            }
            .diff-text-removed {
                background-color: #ffcccc;
                text-decoration: line-through;
            }
            .diff-text-added {
                background-color: #ccffcc;
            }
        </style>
        <b>#original text:</b><br />
        <p id="original">Hello World (original span)</p>
        <b>#changed text:</b><br />
        <p id="changed">Hello World (changed span)</p>
        <b>Diff Text Component:</b>
        <p>
            <diff-text original="${args.original}" changed="${args.changed}"></diff-text>
        </p>
        <b>Args:</b><br />
        <pre>${JSON.stringify(args, null, 2)}</pre>`;
};

const meta: Meta = {
    ...CreateComponentStoryMeta("diff-text", undefined, {
        decorators: [
            ...CreateComponentDecorators("diff-text", undefined),
            (story) => {
                if (!customElements.get("diff-text")) {
                    customElements.define("diff-text", DiffText);
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
    args: { original: "#original", changed: "#changed" },
};
