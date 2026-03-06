import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateUtilityStoryMeta } from "../../stories/utils";

const meta: Meta = { ...CreateUtilityStoryMeta("autoloader") };

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        code: `
import autoloader from "../../packages/autoloader/index.ts";
return "Autoloader registered. Components will load on demand when their tags appear in the DOM.";
        `,
    },
};
