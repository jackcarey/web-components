import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const theme = create({
    base: "light",
    brandTitle: "Web Components",
    brandUrl: "https://jackcarey.co.uk",
    brandImage: "https://storybook.js.org/images/placeholders/350x150.png",
    brandTarget: "_self",

    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: "monospace",

    //
    colorPrimary: "#3A10E5",
    colorSecondary: "#585C6D",

    // UI
    appBg: "#ffffff",
    appContentBg: "#ffffff",
    appPreviewBg: "#ffffff",
    appBorderColor: "#585C6D",
    appBorderRadius: 4,

    // Text colors
    textColor: "#10162F",
    textInverseColor: "#ffffff",

    // Toolbar default and active colors
    barTextColor: "#9E9E9E",
    barSelectedColor: "#585C6D",
    barHoverColor: "#585C6D",
    barBg: "#ffffff",

    // Form colors
    inputBg: "#ffffff",
    inputBorder: "#10162F",
    inputTextColor: "#10162F",
    inputBorderRadius: 2,
});

addons.setConfig({
    theme,
    sidebar: {
        showRoots: true,
    },
});
