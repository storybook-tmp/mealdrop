import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  name: 'Burger Palace',
  specialty: 'Gourmet burgers with locally sourced ingredients',
  photoUrl:
    'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.5,
  categories: ['burgers', 'comfort-food'],
};

export const Default: Story = {
  args: defaultArgs,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Palace')).toBeVisible();
    await expect(canvas.getByText(/4\.5/)).toBeVisible();
  },
};

export const New: Story = {
  args: { ...defaultArgs, isNew: true },
};

export const Closed: Story = {
  args: { ...defaultArgs, isClosed: true },
};

export const Loading: Story = {
  args: { ...defaultArgs, isLoading: true },
};
