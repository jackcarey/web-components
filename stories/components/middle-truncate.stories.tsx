import type { Meta, StoryObj, Decorator } from "@storybook/web-components";
import { CreateComponentStoryMeta } from "../utils";

// This default export determines where your story goes in the story list
const meta: Meta = {
    ...CreateComponentStoryMeta(
        "middle-truncate",
        "middle-truncate{border:1px solid red;}"
    ),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {},
};

const textStrings = {
    en: "The quick brown fox jumps over the lazy dog.",
    fa: "روباه قهوه ای سریع از روی سگ تنبل می پرد.", //persian
    jp: "素早い茶色のキツネが怠け者の犬を飛び越えます。",
};

export const WithTitle: Story = {
    args: {
        title: textStrings.en,
    },
};

export const At0Percent: Story = {
    args: {
        title: textStrings.en,
        at: '0',
    },
};

export const At10Percent: Story = {
    args: {
        title: textStrings.en,
        at: 10,
    },
};

export const At30Percent: Story = {
    args: {
        title: textStrings.en,
        at: 30,
    },
};

export const At80Percent: Story = {
    args: {
        title: textStrings.en,
        at: 80,
    },
};

export const LongText: Story = {
    args: {
        title: textStrings.en.repeat(10),
    },
};

export const RTLDir: Story = {
    name: "RTL Text (Persian)",
    args: {
        title: textStrings.fa,
        dir: "rtl",
    },
};

export const JPText: Story = {
    name: "Japanese Text",
    args: {
        title: textStrings.jp,
    },
};

export const VerticalWritingMode: Story = CreateComponentStoryMeta(
    "middle-truncate",
    "middle-truncate{writing-mode:vertical-rl}"
);
VerticalWritingMode.args = {
    title: textStrings.jp,
};
