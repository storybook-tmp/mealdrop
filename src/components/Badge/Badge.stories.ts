import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './Badge';

const meta = {
  title: 'AI Generated/Simple/Badge',
  component: Badge,
  args: {
    text: 'popular',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongLabel: Story = {
  args: {
    text: 'chef recommendation',
  },
};
