import { Preview } from '@storybook/web-components';
/** @type { import('@storybook/web-components').Preview } */
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
      defaultName: 'Stories',
    },
  },
  tags: ['autodocs'],
};

export default preview;
