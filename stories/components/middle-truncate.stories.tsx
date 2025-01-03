import type { Meta, StoryObj, Decorator } from "@storybook/web-components";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";

// This default export determines where your story goes in the story list
const meta: Meta = {
    ...CreateComponentStoryMeta(
        "middle-truncate",
        "middle-truncate{text-overflow: clip;overflow:hidden;max-height: min-content;}"
    ),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {},
};

const placeholderText = "The quick brown fox jumps over the lazy dog.";

export const WithTitle: Story = {
    args: {
        title: placeholderText,
    },
};

export const At0Percent: Story = {
    args: {
        title: placeholderText,
        at: 0,
    },
};

export const At10Percent: Story = {
    args: {
        title: placeholderText,
        at: 10,
    },
};

export const At30Percent: Story = {
    args: {
        title: placeholderText,
        at: 30,
    },
};

export const At90Percent: Story = {
    args: {
        title: placeholderText,
        at: 90,
    },
};

export const LongText: Story = {
    args: {
        title: placeholderText.repeat(10),
    },
};

export const RTLDir: Story = {
    args: {
        title: placeholderText,
        limit: Math.floor(placeholderText.length * 0.8),
        dir: "rtl",
    },
};
