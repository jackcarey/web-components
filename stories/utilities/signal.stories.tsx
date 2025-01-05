import type { Meta, StoryContext, StoryObj } from "@storybook/web-components";
import Signal from "../../packages/signal";
import { html } from "lit";

// This default export determines where your story goes in the story list
const meta: Meta = {};

export default meta;
type Story = StoryObj;

const signalHtml = (context: StoryContext, s: object) => {
    const id = `signal-${Math.floor(Math.random() * 1000)}`;
    const cssId = `#${id}`;
    return html`<p id="${cssId}">Story '${context.name}':</p>
        <pre>${JSON.stringify(s, null, 2)}</pre>`;
};

export const Default: Story = {
    decorators: [
        (_story, context) => {
            const s = new Signal({ foo: "bar" });
            s.addEventListener("signal", (evt) => console.log("listener on signal", evt));
            s.fizz = "bang";
            s.bang = "fizz";
            s.dispatchEvent(new Event("some random event"));
            return signalHtml(context, s);
        },
    ],
};

export const WithDocumentTarget: Story = {
    decorators: [
        (_story, context) => {
            document.addEventListener("signal", (evt) =>
                console.log(`document story signal`, context.name, evt)
            );
            const s = new Signal({ foo: "bar" }, { target: document });
            s.addEventListener("signal", (evt) => console.log("listener on signal", evt));
            s.fizz = "bang";
            s.bang = "fizz";
            s.dispatchEvent(new Event("some random event"));
            return signalHtml(context, s);
        },
    ],
};
