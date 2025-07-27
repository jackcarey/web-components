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
        <p id="original" title="The original title">
            The FIVE boxing Wizards jump quickly. (original span)
        </p>
        <b>#changed text:</b><br />
        <p id="changed" title="A changed title">
            the five boxing wizards jump quickly. (changed span)
        </p>
        <b>Diff Text Component:</b>
        <p>
            <diff-text
                original="${args.original}"
                changed="${args.changed}"
                original-src="${args["original-src"]}"
                changed-src="${args["changed-src"]}"
                mode="${args.mode}"
                compare="${args.compare}"
                ignore-case="${args["ignore-case"]}"
                refetch="${args.refetch}"
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

export const CompareChars: Story = {
    args: {
        original: "#original",
        changed: "#changed",
        mode: "chars",
    },
};

export const IgnoreCase: Story = {
    args: {
        original: "#original",
        changed: "#changed",
        "ignore-case": true,
    },
};

export const IgnoreCaseChars: Story = {
    args: {
        original: "#original",
        changed: "#changed",
        mode: "chars",
        "ignore-case": true,
    },
};

export const WithChangingText: Story = {
    args: {
        original: "#original",
        changed: "#changed",
        mode: "chars",
    },
    render: (args: Args, context) => {
        const originalStory = renderFn(args, context);
        return html`${originalStory}
            <script>
                let originalText = document.querySelector("#original");
                let changedText = document.querySelector("#changed");
                const setOriginal = () => {
                    originalText.textContent = \`This will change 300ms. \${new Date().toISOString()}\`;
                };
                setInterval(setOriginal, 300);
                setOriginal();
                const setChanged = () => {
                    changedText.textContent = \`This will change every second. \${new Date().toISOString()}\`;
                };
                setChanged();
                setInterval(setChanged, 1000);
            </script>`;
    },
};

export const OriginalSrc: Story = {
    name: "Original Src (remote text)",
    args: {
        "original-src":
            "https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",
        changed: "#changed",
    },
};

export const ChangedSrc: Story = {
    name: "Changed Src (remote text)",
    args: {
        original: "#original",
        "changed-src":
            "https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt",
    },
};

export const OriginalAndChangedSrc: Story = {
    name: "Both Src (remote text)",
    args: {
        "original-src":
            "https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",
        "changed-src":
            "https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt",
    },
};

export const Refresh: Story = {
    name: "Refresh (every 30 seconds)",
    args: {
        mode: "json",
        "original-src": "http://numbersapi.com/random/math?json",
        "changed-src": "http://numbersapi.com/random/math?json",
        refetch: 30,
    },
};

export const CompareAttr: Story = {
    name: "Compare by attribute (title)",
    args: {
        original: "#original",
        changed: "#changed",
        compare: "title",
        mode: "chars",
    },
};
