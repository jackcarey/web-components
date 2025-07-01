import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";
import { DynamicTemplate } from "../../packages/dynamic-template/index.js";

// This default export determines where your story goes in the story list
const meta: Meta = {
    ...CreateComponentStoryMeta("dynamic-template", undefined, {
        decorators: [
            ...CreateComponentDecorators("dynamic-template", undefined),
            (story) => {
                if (!customElements.get("blog-post")) {
                    customElements.define("blog-post", DynamicTemplate);
                }
                return html`${story()}`;
            }
        ]
    })
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    storyName: "Default (no content)",
    args: {},
};

const defineScriptHtml = html`<script type="module">
        </script>`;

const blogPostHtml = html`
            <blog-post>
                <h1 slot="heading">Some title</h1>
                <img src="https://picsum.photos/200" alt="Image" slot="image">
                <p>Some text</p>
            </blog-post>
            <blog-post>
                <h1 slot="heading">Some title 2</h1>
                <img src="https://picsum.photos/200" alt="Image" slot="image">
                <p>Some text 2</p>
            </blog-post>
            <blog-post>
                <h1 slot="heading">Some title 3</h1>
                <img src="https://picsum.photos/200" alt="Image" slot="image">
                <p>Some text 3</p>
            </blog-post>`;

const compactBlogPostTemplateHtml = html`
    <template id="compact-blog-post" exportparts="heading">
        <heading part="heading"><slot name="heading"></slot></heading>
        </template>`;

const imageOnlyBlogPostTemplate = html`
    <template id="image-only-blog-post" exportparts="image">
                <slot name="image" part="image"></slot>
            </template>`;

export const CompactTemplate: Story = {
    args: {},
    render: () => html`
                ${defineScriptHtml}
        ${compactBlogPostTemplateHtml}
        <main data-dynamic-template="compact">
            ${blogPostHtml}
        </main>
    `,
};

export const ImageOnlyTemplate: Story = {
    args: {},
    render: () => html`
        ${defineScriptHtml}
        <main data-dynamic-template="image-only">
            ${imageOnlyBlogPostTemplate}
            ${blogPostHtml}
        </main>
    `,
};

export const TemplateSelector: Story = {
    args: {},
    render: () => html`
        <heading>
            <h1>Template selector</h1>
            <label for="template-select">Select template:</label>
            <select id="template-select" name="template-select">
                <option value="compact">Compact</option>
                <option value="image-only">Image onlys</option>
                <option value="this-template-does-not-exist">Non-existent</option>
            </select>
        </heading>
        <script type="module">
            const select = document.getElementById("template-select");
            select.addEventListener("change", (event) => {
                const templateName = event.target.value;
                const main = document.querySelector("main");
                main.dataset.dynamicTemplate = templateName;
            });
        </script>
        <main data-dynamic-template="compact">
            ${compactBlogPostTemplateHtml}
            ${imageOnlyBlogPostTemplate}
            ${blogPostHtml}
        </main>
    `,
};