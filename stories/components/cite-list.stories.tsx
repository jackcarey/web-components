import type { Args, Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";
import { CiteList } from "../../packages/cite-list";

const renderFn: StoryObj["render"] = (args: Args) => {
    return html`<article>
            <p>This is a paragraph with a <cite>citation 1</cite>.</p>
            <p>Another paragraph with a <cite>citation 2</cite>.</p>
            <p>And another one with a <cite>citation 3</cite>.</p>
            <p>And another one with a <cite>citation 4</cite>.</p>
            <p>And another one with a <cite>citation 5</cite>.</p>
            <p>And another one with a <cite>citation 6</cite>.</p>
            <p>And another one with a <cite>citation 7</cite>.</p>
            <p>And another one with a <cite>citation 8</cite>.</p>
            <p>And another one with a <cite>citation 9</cite>.</p>
            <p>And another one with a <cite>citation 10</cite>.</p>
        </article>
        <hr />
        <cite-list
            selector=${args.selector ?? ""}
            limit=${args.limit ?? 0}
            link=${args?.link ? "true" : undefined}
        ></cite-list>`;
};

const meta: Meta = {
    ...CreateComponentStoryMeta("diff-text", undefined, {
        decorators: [
            ...CreateComponentDecorators("cite-list", undefined),
            (story) => {
                if (!customElements.get("cite-list")) {
                    customElements.define("cite-list", CiteList);
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

export const ArticleSelector: Story = {
    args: {
        selector: "article",
    },
};

export const NoSelector: Story = {
    args: {},
};

export const Limit: Story = {
    args: {
        selector: "article",
        limit: 5,
    },
};

export const Link: Story = {
    args: {
        selector: "article",
        link: true,
    },
    render: (args, context) => {
        const originalStory = renderFn(args, context);
        return html`${originalStory}
            <style>
                cite-list a {
                    color: blue;
                    text-decoration: underline;
                }
            </style>`;
    },
};

export const ChangingCitations: Story = {
    args: {
        selector: "article",
    },
    render: (args, context) => {
        const originalStory = renderFn(args, context);
        return html`${originalStory}
            <p>
                A script updates the article above. The <code>cite-list</code> will automatically
                update to reflect changes in the 'cite' elements.
            </p>
            <script>
                setInterval(() => {
                    const isAdding = Math.random() > 0.75;
                    if (isAdding) {
                        const newCite = document.createElement("cite");
                        newCite.textContent = "New citation " + (Date.now() % 1000);
                        const article = document.querySelector("article");
                        if (article) {
                            article.appendChild(newCite);
                        }
                    } else {
                        const cites = document.querySelectorAll("cite");
                        if (cites.length > 0) {
                            const randomIndex = Math.floor(Math.random() * cites.length);
                            cites[randomIndex].innerText =
                                "updated citation " + (Date.now() % 1000);
                        }
                    }
                }, 1000);
            </script>`;
    },
};
