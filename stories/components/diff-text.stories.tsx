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
            <diff-text
                original="${args.original}"
                changed="${args.changed}"
                original-src="${args["original-src"]}"
                changed-src="${args["changed-src"]}"
            ></diff-text>
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

export const OriginalSrc: Story = {
    args: {
        "original-src":
            "https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",
        changed: "#changed",
    },
};

export const ChangedSrc: Story = {
    args: {
        original: "#original",
        "changed-src":
            "https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",
    },
};

export const OriginalAndChangedSrc: Story = {
    args: {
        "original-src":
            "https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",
        "changed-src":
            "https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt",
    },
};
