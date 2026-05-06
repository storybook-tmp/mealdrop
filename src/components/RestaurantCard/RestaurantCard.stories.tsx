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
  specialty: 'Juicy burgers and crispy fries',
  photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
  rating: 4.5,
  categories: ['burgers', 'american'],
};

export const Default: Story = {
  args: baseArgs,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burger palace/i })).toBeVisible();
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
