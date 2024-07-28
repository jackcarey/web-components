/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../storybook-docs/**/*.mdx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {
    defaultName: 'All Stories',
  },
};
export default config;
