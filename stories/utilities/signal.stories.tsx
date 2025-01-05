import type { Meta, StoryContext, StoryObj } from "@storybook/web-components";
import Signal from "../../packages/signal";
import { html } from "lit";

// This default export determines where your story goes in the story list
const meta: Meta = {};

export default meta;
type Story = StoryObj;

const signalHtml = (context: StoryContext, s?: object) => {
    const id = `signal-${Math.floor(Math.random() * 1000)}`;
    const cssId = `#${id}`;
    return html`<div id="${cssId}"><p>
            Story '<code>${context.name}</code>' | If the DOM does not update below, check the
            browser console.
        </p>
        <pre><output>${s ? JSON.stringify(s, null, 2) : ""}<output></pre></div>`;
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

export const LotsOfProperties: Story = {
    decorators: [
        (_story, context) => {
            const s = new Signal({}, { target: document });
            const listener = (evt) => console.log("listener on signal", evt);
            s.addEventListener("signal", listener);
            for (let i = 0; i < 1000; ++i) {
                s[i] = Math.round(Math.random() * 10000);
            }
            return signalHtml(context, s);
        },
    ],
};

export const Interval: Story = {
    decorators: [
        (_story, context) => {
            const s = new Signal({});
            s.addEventListener("signal", (evt) => console.log("listener on signal", evt));
            let i = 0;
            const intervalId = setInterval(() => {
                const rnd = Math.floor(Math.random() * 10000);
                const key = `prop${rnd}`;
                s[i] = performance.now();
                i += 1;
            }, 500);
            setTimeout(() => {
                clearInterval(intervalId);
            }, 10000);
            return signalHtml(context, s);
        },
    ],
};
