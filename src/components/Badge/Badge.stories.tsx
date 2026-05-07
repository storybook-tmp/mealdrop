import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './Badge';

const meta = {
  component: Badge,
  tags: ['ai-generated'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Category: Story = {
  args: { text: 'comfort food' },
};

export const NewRestaurant: Story = {
  args: { text: 'new' },
};

export const Closed: Story = {
  args: { text: 'closed' },
};
