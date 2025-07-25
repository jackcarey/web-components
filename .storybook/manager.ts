import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";
import renderLabel from "./renderLabel";

const theme = create({
    base: "light",
    brandTitle: "Web Components",
    brandUrl: "https://jackcarey.co.uk/web-components",
    brandImage: "../images/storybook-header.png",
    brandTarget: "_self",


    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: "Fira Code, monospace",

    // Sidebar
    appBg: "#ffffff",
});

addons.setConfig({
    theme,
    sidebar: {
        showRoots: true,
        renderLabel,
    },
});
