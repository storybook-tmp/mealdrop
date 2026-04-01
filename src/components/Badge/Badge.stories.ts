import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'AI Generated/Simple/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'New',
  },
};

export const Premium: Story = {
  args: {
    text: 'Premium',
  },
};

export const Sale: Story = {
  args: {
    text: 'Sale',
  },
};
