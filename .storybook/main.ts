/** @type { import('@storybook/web-components-vite').StorybookConfig } */

const storyLocations = [
    "../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../storybook-docs/**/*.mdx",
    "../storybook-docs/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
];

const coverageConfig = {
    istanbul: {
        include: storyLocations,
        exclude: ["**/exampleDirectory/**"],
    },
};

const config = {
    stories: storyLocations,
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-a11y",
        "@storybook/addon-interactions",
        "@storybook/addon-themes",
        {
            name: "@storybook/addon-coverage",
            options: coverageConfig,
        },
    ],
    framework: {
        name: "@storybook/web-components-vite",
        options: {},
    },
    core: {
        disableTelemetry: true,
        builder: "@storybook/builder-vite",
    },
    docs: {
        defaultName: "All Stories",
    },
    async viteFinal(config, { configType }) {
        // Merge custom configuration into the default config
        const { mergeConfig } = await import("vite");

        console.debug("configType", configType);

        return mergeConfig(config, {
            // Add dependencies to pre-optimization
            optimizeDeps: {
                include: ["storybook-dark-mode", "ical.js"],
            },
            base: "./",
            server: {
                fs: {
                    strict: false,
                },
            },
        });
    },
};
export default config;
