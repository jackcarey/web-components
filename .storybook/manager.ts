import { addons } from "@storybook/manager-api";
import repoTheme from "./WCTheme";

addons.setConfig({
    theme: repoTheme,
    sidebar: {
        showRoots: true,
    },
});
