/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    "../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../storybook-docs/**/*.mdx",
    "../storybook-docs/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-themes'
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    defaultName: 'All Stories',
  },
},
};
export default config;
