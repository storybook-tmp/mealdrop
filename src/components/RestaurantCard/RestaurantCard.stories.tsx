import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
  args: {
    name: 'Burger Kingdom',
    specialty: 'Juicy burgers and crispy fries',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.5,
    categories: ['burgers', 'comfort-food'],
  },
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible();
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
