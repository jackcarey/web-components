import type { Meta, StoryObj } from "@storybook/web-components";
import Signal from "../../packages/signal";
import { html } from "lit";

// This default export determines where your story goes in the story list
const meta: Meta = {};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    decorators: [
        (_story, context) => {
            document.addEventListener("signal", (evt) =>
                console.log(`story signal`, context.name, evt)
            );
            const s = new Signal({ foo: "bar" });
            s.addEventListener("signal", (evt) => console.log("sotry listneer", evt));
            s.fizz = "bang";
            s.bang = "fizz";
            s.dispatchEvent(new Event("some random event"));
            console.log("story finished", s);
            return html`${JSON.stringify(s)}`;
        },
    ],
};
