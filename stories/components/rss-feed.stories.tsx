import type { Meta, StoryObj } from "@storybook/web-components";
import { CreateComponentStoryMeta } from "../utils";
import { html } from "lit";

// This default export determines where your story goes in the story list
const meta: Meta = { ...CreateComponentStoryMeta("rss-feed") };

export default meta;
type Story = StoryObj;

export const TitleOnly: Story = {
    args: {},
    render: () =>
        html`
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `,
};

export const Detailed: Story = {
    args: {},
    render: () =>
        html`
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <h2><slot name="title"></slot></h2>
                    <time><slot name="pubDate"></slot></time>
                    <p><slot name="content"></slot></p>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `,
};

export const Styled: Story = {
    args: {},
    render: () =>
        html`
            <style>
                rss-feed {
                    display: grid;
                    gap: 1rem;
                    grid-template-columns: 1fr 1fr;
                    font-family: sans-serif;
                    margin: 1rem;
                }
                rss-feed h2 {
                    font-size: 1.5rem;
                    margin: 0;
                }
                rss-feed time {
                    font-size: 0.75rem;
                    color: gray;
                }
                rss-feed p {
                    font-size: 1rem;
            </style>
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <div>
                        <h2><slot name="title"></slot></h2>
                        <time><slot name="pubDate"></slot></time>
                        <p><slot name="contentSnippet"></slot></p>
                    </div>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `,
};

export const WithLink: Story = {
    args: {},
    render: () =>
        html`
            <rss-feed proxy="https://corsproxy.io/?url=" link="_blank">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `,
};

export const CustomFields: Story = {
    args: {},
    render: () =>
        html`
            <rss-feed
                proxy="https://corsproxy.io/?url="
                link="_blank"
                customFields="media:thumbnail"
            >
                <template>
                    <h2><slot name="title"></slot></h2>
                    <span><slot name="media:thumbnail"></slot></span>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `,
};

export const MultipleSources: Story = {
    args: {},
    render: () =>
        html`
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="https://www1.cbn.com/rss-cbn-news-world.xml" />
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml" />
                <source src="https://www.aljazeera.com/xml/rss/all.xml" />
                <source src="https://www.theguardian.com/world/rss" />
                <source src="https://www.npr.org/rss/rss.php?id=1004" />
                <source src="http://www.dictionary.com/wordoftheday/wotd.rss" />
            </rss-feed>
        `,
};
