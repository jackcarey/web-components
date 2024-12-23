import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";
import renderLabel from "./renderLabel";

const theme = create({
    base: "light",
    brandTitle: "Web Components",
    brandUrl: "https://jackcarey.co.uk",
    brandImage: "../images/open-graph.png",
    brandTarget: "_self",

    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: "Fira Code, monospace",
});

addons.setConfig({
    theme,
    sidebar: {
        showRoots: true,
        renderLabel,
    },
});
