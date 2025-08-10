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
                original-selector="${args.originalSelector}"
                changed-selector="${args.changedSelector}"
                original-src="${args["original-src"]}"
                changed-src="${args["changed-src"]}"
                mode="${args.mode}"
                compare="${args.compare}"
                ignore-case="${args["ignore-case"]}"
                refetch="${args.refetch}"
            ></diff-text>
            ${!args.options
                ? ""
                : html`<script>
                      const diffText = document.querySelector("diff-text");
                      diffText.options = ${args.options};
                  </script>`}
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
    parameters: {
        //these stories are ignored by default, they must be opt-ed in by setting this to false
        chromatic: { disableSnapshot: true },
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: { originalSelector: "#original", changedSelector: "#changed" },
    parameters: {
        chromatic: { disableSnapshot: false },
    },
};

export const CompareChars: Story = {
    args: {
        originalSelector: "#original",
        changedSelector: "#changed",
        mode: "chars",
    },
    parameters: {
        chromatic: { disableSnapshot: false },
    },
};

export const IgnoreCase: Story = {
    args: {
        originalSelector: "#original",
        changedSelector: "#changed",
        "ignore-case": true,
    },
    parameters: {
        chromatic: { disableSnapshot: false },
    },
};

export const IgnoreCaseChars: Story = {
    args: {
        originalSelector: "#original",
        changedSelector: "#changed",
        mode: "chars",
        "ignore-case": true,
    },
    parameters: {
        chromatic: { disableSnapshot: false },
    },
};

export const WithChangingText: Story = {
    args: {
        originalSelector: "#original",
        changedSelector: "#changed",
        mode: "chars",
    },
    render: (args: Args, context) => {
        const originalStory = renderFn(args, context);
        return html`${originalStory}
            <script>
                let originalText = document.querySelector("#original");
                let changedText = document.querySelector("#changed");
                const setOriginal = () => {
                    originalText.textContent = \`This will change 250ms. \${new Date().toISOString()}\`;
                };
                setInterval(setOriginal, 250);
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
        changedSelector: "#changed",
    },
    parameters: {
        chromatic: { disableSnapshot: false },
    },
};

export const ChangedSrc: Story = {
    name: "Changed Src (remote text)",
    args: {
        originalSelector: "#original",
        "changed-src":
            "https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt",
    },
    parameters: {
        chromatic: { disableSnapshot: false },
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
    parameters: {
        chromatic: { disableSnapshot: false },
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
        originalSelector: "#original",
        changedSelector: "#changed",
        compare: "title",
        mode: "chars",
    },
    parameters: {
        chromatic: { disableSnapshot: false },
    },
};

export const Lines: Story = {
    name: "Compare by lines",
    args: {
        "original-src": "https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",
        "changed-src": "https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",
        mode: "lines",
    },
};

export const Arrays = {
    name: "Compare arrays",
    args: {
        "original-src": "https://jsonplaceholder.typicode.com/comments?postId=1",
        "changed-src": "https://jsonplaceholder.typicode.com/comments?postId=2",
        mode: "arrays",
    },
};

export const Callback: Story = {
    name: "Callback (on diff)",
    args: {
        originalSelector: "#original",
        changedSelector: "#changed",
        mode: "chars",
        options: `{
            callback: (diff) => {
                console.log("Diff callback:", diff);
                return diff;
            }
        }`,
    },
    parameters: {
        chromatic: { disableSnapshot: false },
    },
};

export const textInput: Story = {
    name: "Text Input (with diff)",
    args: {
        "original-src":
            "https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",
        changedSelector: "#text",
        compare: "value",
    },
    render: (args: Args, context) => {
        const originalStory = renderFn(args, context);
        return html`<div>
                <textarea id="text" style="width: 80ch;" rows="10" cols="80">
The quick brown fox jumps over the lazy dog.</textarea
                >
            </div>
            ${originalStory}`;
    },
};

export const ContentEditable: Story = {
render: ()=>{
return html`<diff-text contenteditable original="The quick brown fox jumps over the lazy dog." changed="The slow blue fox jumps over the sleepy dog."></diff-text>`;
},
};
