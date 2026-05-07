import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Badge } from './Badge';

const meta = {
  component: Badge,
  tags: ['ai-generated'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cuisine: Story = {
  args: {
    text: 'sushi',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('sushi')).toHaveTextContent('sushi');
  },
};

export const NewRestaurant: Story = {
  args: {
    text: 'new',
  },
};

export const Delivery: Story = {
  args: {
    text: 'delivery',
  },
};
