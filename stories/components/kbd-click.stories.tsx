import type { Args, Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateComponentDecorators, CreateComponentStoryMeta } from "../utils";
import { html } from "lit";
import KBDClick from "../../packages/kbd-click";

const stylesHtml = html` <style>
    kbd-click {
        display: contents;
    }
    button {
        display: contents;
    }
    kbd {
        background-color: #eee;
        border-radius: 3px;
        border: 1px solid #b4b4b4;
        box-shadow: 0 1px 1px rgb(0 0 0 / 0.2), 0 2px 0 0 rgb(255 255 255 / 0.7) inset;
        color: #333;
        display: inline-block;
        font-size: 0.85em;
        font-weight: 700;
        line-height: 1;
        padding: 2px 4px;
        white-space: nowrap;
        cursor: pointer;
    }
    kbd:active {
        box-shadow: 0 1px 1px rgb(100 100 100 / 0.2), 0 2px 0 0 rgb(255 255 255 / 0.7) inset,
            inset -1px -1px #a3a3a3;
    }
</style>`;

const renderFn: StoryObj["render"] = (args: Args) => {
    return html`${stylesHtml}
        <kbd-click
            ${args.passive ? "passive" : ""}
            ${args.capture ? "capture" : ""}
            ${args.allowRepeat ? "allow-repeat" : ""}
            filter="${args.filter || ""}"
        >
            <p>
                Press <button onclick="alert('from A button')"><kbd>A</kbd></button>,
                <button onclick="alert('from B button')"><kbd>B</kbd></button>, or
                <button onclick="alert('from C button')"><kbd>C</kbd></button>
                to trigger a click event.
            </p>
        </kbd-click>`;
};

// This default export determines where your story goes in the story list
const meta: Meta = {
    ...CreateComponentStoryMeta("kbd-click", undefined, {
        decorators: [
            ...CreateComponentDecorators("kbd-click", undefined),
            (story) => {
                if (!customElements.get("kbd-click")) {
                    customElements.define("kbd-click", KBDClick);
                }
                return html`${story()}`;
            },
        ],
    }),
    render: renderFn,
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
    args: {},
};

export const CaseSensitive: Story = {
    args: {
        caseSensitive: true,
        filter: "A, B, C",
    },
    render: (args: Args) => {
        return html` ${stylesHtml}<kbd-click
                ${args.passive ? "passive" : ""}
                ${args.capture ? "capture" : ""}
                ${args.allowRepeat ? "allow-repeat" : ""}
                filter="${args.filter || ""}"
                case-sensitive
            >
                <p>
                    Case-sensitive, hold <kbd>shift</kbd> then press a letter. Press
                    <button onclick="alert('from A button')"><kbd>A</kbd></button>,
                    <button onclick="alert('from B button')"><kbd>B</kbd></button>, or
                    <button onclick="alert('from C button')"><kbd>C</kbd></button>
                    to trigger a click event.
                </p>
            </kbd-click>`;
    },
};

export const Filtered: Story = {
    args: {
        filter: "A",
    },
    render: (args: Args) => {
        return html`${stylesHtml}<kbd-click
                ${args.passive ? "passive" : ""}
                ${args.capture ? "capture" : ""}
                ${args.allowRepeat ? "allow-repeat" : ""}
                filter="${args.filter || ""}"
            >
                <p>
                    Filtered only to 'A'. Press
                    <button onclick="alert('from A button')"><kbd>A</kbd></button>,
                    <button onclick="alert('from B button')"><kbd>B</kbd></button>, or
                    <button onclick="alert('from C button')"><kbd>C</kbd></button>
                    to trigger a click event.
                </p>
            </kbd-click>`;
    },
};

// export const ListenerGC: Story = {
//     name: "Listener Garbage Collection",
//     play: async () => {
//         let isAdding = true;
//         setInterval(() => {
//             const els = document.querySelectorAll("kbd-click");
//             if (els.length <= 0) {
//                 isAdding = true;
//             }
//             if (els.length >= 500) {
//                 isAdding = false;
//             }
//             if (isAdding) {
//                 const kbdClick = document.createElement("kbd-click");
//                 kbdClick.innerHTML = `
//                     <kbd>A</kbd>
//                     <kbd>B</kbd>
//                     <kbd>C</kbd>
//                     <kbd>D</kbd>
//                     <kbd>E</kbd>
//                     <kbd>F</kbd>
//                     <kbd>G</kbd>
//                     <kbd>H</kbd>
//                     <kbd>I</kbd>
//                     <kbd>J</kbd>
//                     <kbd>K</kbd>
//                     <kbd>L</kbd>
//                     <kbd>M</kbd>
//                     <kbd>N</kbd>
//                     <kbd>O</kbd>
//                     <kbd>P</kbd>
//                     <kbd>Q</kbd>
//                     <kbd>R</kbd>
//                     <kbd>S</kbd>
//                     <kbd>T</kbd>
//                     <kbd>U</kbd>
//                     <kbd>V</kbd>
//                     <kbd>W</kbd>
//                     <kbd>X</kbd>
//                     <kbd>Y</kbd>
//                     <kbd>Z</kbd>
//                     <kbd>1</kbd>
//                     <kbd>2</kbd>
//                     <kbd>3</kbd>
//                     <kbd>4</kbd>
//                     <kbd>5</kbd>
//                     <kbd>6</kbd>
//                     <kbd>7</kbd>
//                     <kbd>8</kbd>
//                     <kbd>9</kbd>
//                     <kbd>0</kbd>
//                     `;
//                 document.body.appendChild(kbdClick);
//             } else {
//                 els.forEach((el) => el.remove());
//             }
//         }, 50);
//     },
// };
