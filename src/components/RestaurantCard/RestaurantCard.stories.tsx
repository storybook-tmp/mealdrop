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
    'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  rating: 4.5,
};

export const Default: Story = {
  args: baseArgs,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Palace')).toBeVisible();
  },
};

export const New: Story = {
  args: { ...baseArgs, isNew: true },
};

export const Closed: Story = {
  args: { ...baseArgs, isClosed: true },
};

export const WithCategories: Story = {
  args: { ...baseArgs, categories: ['burgers', 'comfort-food'] },
};

export const Loading: Story = {
  args: { ...baseArgs, isLoading: true },
};
