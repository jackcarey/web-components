import { Args, Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";
import { RevealPresentation } from "../../packages/reveal-presentation";

const renderFactory = (innerSlidesHtml: ReturnType<typeof html>) => {
    return (args: Args) => {
        return html`
            <reveal-presentation
                theme="${args.theme}"
                width="${args.width}"
                height="${args.height}"
            >
                ${innerSlidesHtml}
            </reveal-presentation>
        `;
    };
};

const defaultRenderFn: StoryObj["render"] = (args: Args) => {
    return renderFactory(html`
        <section>
            <h2>Slide 1</h2>
            <p>This is the first slide.</p>
        </section>
        <section>
            <h2>Slide 2</h2>
            <p>This is the second slide.</p>
        </section>
        <section>
            <h2>Slide 3</h2>
            <p>This is the third slide.</p>
            <img src="https://picsum.photos/100/100" alt="Random Image" />
        </section>
    `)(args);
};

const meta: Meta = {
    ...CreateComponentStoryMeta("reveal-presentation", undefined, {
        decorators: [
            ...CreateComponentDecorators("reveal-presentation", undefined),
            (story) => {
                if (customElements?.define && !customElements.get("reveal-presentation")) {
                    customElements.define("reveal-presentation", RevealPresentation);
                }
                return html`${story()}`;
            },
        ],
    }),
    render: defaultRenderFn,
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
    args: {
        theme: "black",
    },
};

export const NightTheme: Story = {
    args: {
        theme: "night",
    },
};

export const BeigeTheme: Story = {
    args: {
        theme: "beige",
    },
};

export const SerifTheme: Story = {
    args: {
        theme: "serif",
    },
};

export const SkyTheme: Story = {
    args: {
        theme: "sky",
    },
};

export const BloodTheme: Story = {
    args: {
        theme: "blood",
    },
};
