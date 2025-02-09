import type { Meta, StoryObj } from "@storybook/web-components";
import { CreateComponentStoryMeta } from "../utils";
import exampleICS from "./example.ics";
import { html } from "lit";

// This default export determines where your story goes in the story list
const meta: Meta = { ...CreateComponentStoryMeta("search-dom") };

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {},
};