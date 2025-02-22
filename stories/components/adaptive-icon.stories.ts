import type { Meta, StoryObj } from "@storybook/web-components";
import { CreateComponentStoryMeta } from "../utils";

// This default export determines where your story goes in the story list
const meta: Meta = { ...CreateComponentStoryMeta("adaptive-icon") };

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {},
};

export const WithAttributes: Story = {
    args: {
        'bottom-right': '↗️',
        'bottom-left': '↖️',
        'top-right': '↘️',
        'top-left': '↙️',
        src: 'https://picsum.photos/web-components/200/200',
    }
};

export const WithChildren: Story = {
    args: {
        children: '🌍'
    }
};