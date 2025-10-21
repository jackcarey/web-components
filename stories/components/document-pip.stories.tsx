import { Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { DocumentPiP } from "../../packages/document-pip";

const createRenderFn = (innerHtml: string) => () => {
    return html`<document-pip>${unsafeHTML(innerHtml)}</document-pip>`;
};

const meta: Meta = {
    ...CreateComponentStoryMeta("document-pip", undefined, {
        decorators: [
            ...CreateComponentDecorators("document-pip", undefined),
            (story) => {
                if (!customElements.get("document-pip")) {
                    customElements.define("document-pip", DocumentPiP);
                }
                return html`${story()}`;
            },
        ],
    }),
    render: createRenderFn(""),
    parameters: {
        //these stories are ignored by default, they must be opt-ed in by setting this to false
        chromatic: { disableSnapshot: true },
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {},
    render: createRenderFn(`<p>This is an example of Document PiP content.</p>`),
};
