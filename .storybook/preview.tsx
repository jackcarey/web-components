import { Preview } from "@storybook/web-components-vite";
/** @type { import('@storybook/web-components-vite').Preview } */
const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            toc: true,
        },
        options: {
            // The `a` and `b` arguments in this function have a type of `import('storybook/internal/types').IndexEntry`. Remember that the function is executed in a JavaScript environment, so use JSDoc for IntelliSense to introspect it.
            storySort: {
                order: [
                    "About",
                    "Development",
                    "components",
                    "utilities",
                ],
            },
        },
    },
    tags: ["autodocs"],
};

export default preview;
