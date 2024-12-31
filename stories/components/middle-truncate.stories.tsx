import type { Meta, StoryObj } from "@storybook/web-components";
import { CreateComponentStoryMeta } from "../utils";

// This default export determines where your story goes in the story list
const meta: Meta = { ...CreateComponentStoryMeta("middle-truncate") };

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
