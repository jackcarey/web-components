import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateUtilityStoryMeta } from "../../stories/utils";

const meta: Meta = { ...CreateUtilityStoryMeta("mutative") };

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        code: `
import Mutative from "../../packages/mutative/index.ts";
Mutative.observe("p", (record) => console.log("Mutative record:", record));
return "Mutative is observing 'p' elements. Edit a paragraph in the DOM to see records in the console.";
        `,
    },
};
