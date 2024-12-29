import type { Meta, StoryObj } from "@storybook/web-components";
import { CreateComponentStoryMeta } from "../utils";

// This default export determines where your story goes in the story list
const meta: Meta = { ...CreateComponentStoryMeta("middle-truncate") };

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {},
};

export const WithValue: Story = {
    args: {
        value: "The quick brown fox jumps over the lazy dog.",
    },
};

export const WithLimit: Story = {
    args: {
        value: "The quick brown fox jumps over the lazy dog.",
        limit: 5,
    },
};

export const RTLDir: Story = {
    args: {
        value: "The quick brown fox jumps over the lazy dog.",
        limit: 5,
        dir: "rtl",
    },
};
