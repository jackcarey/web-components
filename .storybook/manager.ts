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
    fontCode: "Fira Code, monospace",
});

addons.setConfig({
    theme,
    sidebar: {
        showRoots: true,
    },
});
