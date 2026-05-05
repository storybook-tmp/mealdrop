import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
  args: {
    name: 'Burger Kingdom',
    specialty: 'Original, unique and delicious burgers made with love',
    photoUrl:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    categories: ['burgers', 'comfort-food'],
  },
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible();
    await expect(canvas.getByText(/very good/i)).toBeVisible();
  },
};

export const New: Story = {
  args: { isNew: true },
};

export const Closed: Story = {
  args: { isClosed: true },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const NoRating: Story = {
  args: { rating: undefined },
};
