import type { Meta, StoryObj, Decorator } from "@storybook/web-components";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";

// This default export determines where your story goes in the story list
const meta: Meta = {
    ...CreateComponentStoryMeta("middle-truncate", "*{overflow: ellipsis}"),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {},
};

const placeholderText = "The quick brown fox jumps over the lazy dog.";

export const WithTitle: Story = {
    args: {
        title: placeholderText,
    },
};

export const LongText: Story = {
    args: {
        title: placeholderText.repeat(10),
    },
};

export const RTLDir: Story = {
    args: {
        title: placeholderText,
        limit: Math.floor(placeholderText.length * 0.8),
        dir: "rtl",
    },
};

const resizingDecorator: Decorator = (...args: Parameters<Decorator>) => {
    const [story, _context] = args;
    return html`<script>
            const startTime = Date.now();
            const resizeElements = (timestamp) => {
                const duration = timestamp - startTime;
                document.querySelectorAll(".container").forEach((el) => {
                    const rect = el.getBoundingClientRect();
                    const isTooBig =
                        rect.right >= window.innerWidth || rect.bottom >= window.innerHeight;
                    const isTooSmall = rect.width <= 1 || rect.height <= 1;
                    const isGrowing = isTooSmall || !isTooBig;
                    if (isGrowing) {
                        el.offsetWidth += 1;
                    } else {
                        el.offsetWidth -= 1;
                    }
                });
                if (duration < 5000) {
                    requestAnimationFrame(resizeElements);
                }
            };
            requestAnimationFrame(resizeElements);
        </script>
        <style>
            .container {
                border: 1px dashed red;
                min-width: min-content;
                width: fit-content;
                resize: horizontal;
                overflow: clip;
            }
        </style>
        <div class="container">${story()}</div>`;
};

export const Resizing: Story = CreateComponentStoryMeta("middle-truncation", "", {
    args: { title: placeholderText },
    decorators: [resizingDecorator, ...CreateComponentDecorators("middle-truncate")],
});
