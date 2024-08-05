import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {};
export default meta;
type Story = StoryObj;

const Template = (args: any) => {
    const randomId = Math.random().toString(36).substring(7);
    return `
    <div id="${randomId}"></div>
    <script>
    const broadcastLayer = new BroadcastDataLayer("broadcast-layer-key",()=>Math.random(),{ttl:1000});</script>
    `;
};

export const Default: Story = Template.bind({});
Default.args = {};

