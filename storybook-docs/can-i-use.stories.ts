import "../packages/can-i-use/index";

export default {
    title: "can-i-use",
};

const defaultArgs = {
    feature: "custom-elements",
    periods: "current",
    accessibleColours: "false",
    mode: "iframe",
};

export const Default = () => {
    return document.createElement("can-i-use");
};

Default.args = defaultArgs;

export const WebPImage = () => {
    return document.createElement("can-i-use");
};

WebPImage.args = {
    ...defaultArgs,
    feature: "webp",
};

export const ColorInput = () => {
    return document.createElement("can-i-use");
};

ColorInput.args = {
    ...defaultArgs,
    feature: "color-input",
};
