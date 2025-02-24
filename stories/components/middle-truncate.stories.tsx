import type { StoryObj } from "@storybook/web-components";
import { CreateComponentStoryMeta } from "../utils";
import { html } from "lit";

export default {
    ...CreateComponentStoryMeta(
        "middle-truncate",
        "middle-truncate{border:1px solid red;max-width: 10px}#container{max-width:500px;resize:both;overflow:hidden;}"
    ),
    component: "middle-truncate",
    argTypes: {
        at: {
            control: "number",
            defaultValue: 50,
        },
    },
    render: (args) => {
        const { children, at } = args;
        return html`<middle-truncate at="${at ?? 50}">${children}</middle-truncate>`;
    },
};
type Story = StoryObj;

const textStrings = {
    en: "The quick brown fox jumps over the lazy dog.",
    fa: "روباه قهوه ای سریع از روی سگ تنبل می پرد.", //persian
    jp: "素早い茶色のキツネが怠け者の犬を飛び越えます。",
};

export const WithContent: Story = {
    args: {
        children: textStrings.en,
    },
};

export const At0Percent: Story = {
    args: {
        children: textStrings.en,
        at: "0",
    },
};

export const At10Percent: Story = {
    args: {
        children: textStrings.en,
        at: 10,
    },
};

export const At30Percent: Story = {
    args: {
        children: textStrings.en,
        at: 30,
    },
};

export const At80Percent: Story = {
    args: {
        children: textStrings.en,
        at: 80,
    },
};

export const LongText: Story = {
    args: {
        children: textStrings.en.repeat(10),
    },
};

export const RTLDir: Story = {
    name: "RTL Text (Persian)",
    args: {
        children: textStrings.fa,
        dir: "rtl",
    },
};

export const JPText: Story = {
    name: "Japanese Text",
    args: {
        children: textStrings.jp,
    },
};

export const VerticalWritingMode: Story = CreateComponentStoryMeta(
    "middle-truncate",
    "middle-truncate{writing-mode:vertical-rl}"
);
VerticalWritingMode.args = {
    children: textStrings.jp,
};
