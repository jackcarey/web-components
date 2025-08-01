import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateComponentStoryMeta } from "../utils";
import { html } from "lit";

// This default export determines where your story goes in the story list
const meta: Meta = { ...CreateComponentStoryMeta("search-dom") };

export default meta;
type Story = StoryObj;

const ulHtml = html`<ul>
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
    <li>Item A</li>
    <li>Item B</li>
    <li>Item C</li>
    <li>Item D</li>
    <li>Item E</li>
    <li>Item F</li>
    <li>Item G</li>
    <li>Item H</li>
    <li>Item I</li>
    <li>Item J</li>
    <li>Item K</li>
    <li>Item L</li>
    <li>Item M</li>
    <li>Item N</li>
    <li>Item O</li>
    <li>Item P</li>
    <li>Item Q</li>
    <li>Item R</li>
    <li>Item S</li>
    <li>Item T</li>
    <li>Item U</li>
    <li>Item V</li>
    <li>Item W</li>
    <li>Item X</li>
    <li>Item Y</li>
    <li>Item Z</li>
</ul>`;

export const Demo: Story = {
    args: {},
    render: (_args) => {
        return html`<search-dom target="ul" items="li">
                <label for="search"
                    >Search:
                    <input type="search" id="search" />
                </label>
            </search-dom>
            ${ulHtml}`;
    },
};

export const MatchCase = {
    args: {},
    render: (_args) => {
        return html`<search-dom target="ul" items="li" mode="matchCase">
                <label for="search"
                    >Search:
                    <input type="search" id="search" />
                </label>
            </search-dom>
            ${ulHtml}`;
    },
};
