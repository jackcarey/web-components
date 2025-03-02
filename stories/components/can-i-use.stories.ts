import type { Meta, StoryObj } from "@storybook/web-components";
import { CreateComponentStoryMeta } from "../utils";

// This default export determines where your story goes in the story list
const meta: Meta = { ...CreateComponentStoryMeta("can-i-use") };

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {},
};

export const InputColor: Story = {
    args: {
        feature: "input-color",
    },
    tags: ['a11y-serious'],
};

// export const AccessibleColors = {
//     args: {
//         "accessible-colors": "true",
//     },
// };

export const ImageMode = {
    args: {
        mode: "image",
    },
};
