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


const Template = (argObject) => {
    const component = document.createElement("can-i-use");
    Object.entries(argObject).forEach(([key, value]) => {
        component[key] = value;
    });
    return component;
}


export const Default = Template.bind({});

export const Flexbox = Template.bind({});

Flexbox.args = {
    feature: "flexbox",
};

export const ColorInput = Template.bind({});

ColorInput.args = {
    feature: "input-color",
};