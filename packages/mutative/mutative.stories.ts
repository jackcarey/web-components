import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateUtilityStoryMeta } from "../../stories/utils";

const meta: Meta = { ...CreateUtilityStoryMeta("mutative") };

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        code: `return "Mutative story loaded. Call Mutative.observe(selector, callback) to watch for DOM mutations.";`,
    },
};
