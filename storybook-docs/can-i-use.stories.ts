import { BindTemplate } from "./utils";
import "../packages/can-i-use/index";

export default {
    title: "can-i-use",
    argTypes: {
        feature: { control: 'text'},
        periods: { control: 'text'},
        accessibleColours: { control: 'text'},
        mode: { control: 'text'},
    }
};

export const Default = BindTemplate("can-i-use")();

export const Flexbox = BindTemplate("can-i-use")({
    feature: "flexbox",
});

export const ColorInput = BindTemplate("can-i-use")({
    feature: "input-color",
});