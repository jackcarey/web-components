import type { Meta, StoryObj } from "@storybook/web-components";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import exampleICS from "./example.ics";
import React from "react";
import { html } from "lit";

// This default export determines where your story goes in the story list
const meta: Meta = { ...CreateComponentStoryMeta("i-cal") };

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {},
};

export const FixedEvents: Story = {
    args: {
        events: exampleICS,
    },
};

export const FetchEvents: Story = {
    args: {
        src: "https://raw.githubusercontent.com/jackcarey/web-components/master/packages/i-cal/example.ics",
        refresh: 360,
    },
};

export const FetchError: Story = {
    args: {
        src: "https://doesnotexist.example.com/calendar.ics",
    },
};

export const BritishLocale = {
    args: {
        events: exampleICS,
        locales: "en-GB",
    },
};

export const KoreanLocale = {
    args: {
        events: exampleICS,
        locales: "ko-KR",
    },
};

const externalStyles = `
i-cal#styled{
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    list-style: none;
}
i-cal#styled ol,ul{
    background-color: red;
}
i-cal#styled li{
    list-style: none;
    border: 1px solid #ccc;
    margin: 0.5rem;
}
i-cal#styled::part(summary) { font-weight: bold; }
i-cal#styled::part(description) { font-style: italic; }
i-cal#styled::part(startDate)::before { content: "📅" }
i-cal#styled::part(endDate)::before { content: "🏁" }
i-cal#styled::part(location)::before { content: "📍" }`;

export const ExternalStyles: Story = {
    args: {
        events: exampleICS,
    },
    render: (args) =>
        html`<style>
                ${externalStyles}</style
            ><i-cal id="styled" events=${args.events}></i-cal>`,
};

export const CustomTemplate: Story = {
    args: {
        events: exampleICS,
    },
    render: (args) =>
        html`<i-cal id="custom" events=${args.events}>
            <template>
                <h2><slot name="summary"></slot></h2>
                <p><slot name="description"></slot><br /><slot name="location"></slot></p>
            </template>
        </i-cal>`,
};

export const OtherChildren: Story = {
    args: {
        events: exampleICS,
    },
    render: (args) =>
        html`<i-cal id="children" events=${args.events}>
            <h1>Other Children</h1>
        </i-cal>`,
};

export const Since1970: Story = {
    args: {
        events: exampleICS,
        since: "1970-01-01",
    },
};

export const Until1970: Story = {
    args: {
        events: exampleICS,
        until: "1970-01-01",
    },
};

export const Between1950And1990: Story = {
    args: {
        events: exampleICS,
        since: "1950-01-01",
        until: "1990-01-01",
    },
};
