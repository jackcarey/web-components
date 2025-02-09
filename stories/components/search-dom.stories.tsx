import type { Meta, StoryObj } from "@storybook/web-components";
import { CreateComponentStoryMeta } from "../utils";
import { html } from "lit";

// This default export determines where your story goes in the story list
const meta: Meta = { ...CreateComponentStoryMeta("search-dom") };

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {},
};

export const Demo: Story = {
    args: {},
    render: (_args) => {
        return html`<search-dom target="ul" items="li">
        <input type="search"/>
        </search-dom>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>Item 7</li>
            <li>Item 8</li>
            <li>Item 9</li>
            <li>Item 10</li>
            <li>Item 11</li>
            <li>Item 12</li>
            <li>Item 13</li>
            <li>Item 14</li>
            <li>Item 15</li>
            <li>Item 16</li>
            <li>Item 17</li>
            <li>Item 18</li>
            <li>Item 19</li>
            <li>Item 20</li>
        </ul>`;
    }
};