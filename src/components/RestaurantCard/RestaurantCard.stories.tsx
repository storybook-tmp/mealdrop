import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  name: 'Burger Palace',
  specialty: 'Gourmet burgers and fries',
  photoUrl:
    'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.5,
  categories: ['burgers', 'comfort-food'],
};

export const Default: Story = {
  args: baseArgs,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Palace')).toBeVisible();
    await expect(canvas.getByText(/very good/i)).toBeVisible();
  },
};

export const New: Story = {
  args: { ...baseArgs, isNew: true },
};

export const Closed: Story = {
  args: { ...baseArgs, isClosed: true },
};

export const Loading: Story = {
  args: { ...baseArgs, isLoading: true },
};

export const NoRating: Story = {
  args: { ...baseArgs, rating: undefined },
};
