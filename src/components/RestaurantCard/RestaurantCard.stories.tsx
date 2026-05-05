import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Burger Palace',
    specialty: 'Gourmet burgers and fries',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    rating: 4.5,
    categories: ['burgers', 'american'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Palace')).toBeVisible();
    await expect(canvas.getByText('Gourmet burgers and fries')).toBeVisible();
    await expect(canvas.getByText('burgers')).toBeVisible();
    await expect(canvas.getByText('american')).toBeVisible();
  },
};

export const NewRestaurant: Story = {
  args: {
    name: 'Fresh Eats',
    specialty: 'Farm to table healthy bowls',
    photoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    rating: 4.8,
    isNew: true,
    categories: ['healthy'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('new')).toBeVisible();
    await expect(canvas.getByText('Fresh Eats')).toBeVisible();
  },
};

export const Closed: Story = {
  args: {
    name: 'Pizza Roma',
    specialty: 'Authentic Italian pizza and pasta',
    photoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    rating: 4.2,
    isClosed: true,
    categories: ['italian', 'pizza'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This restaurant is closed.')).toBeVisible();
  },
};

export const Loading: Story = {
  args: {
    name: '',
    specialty: '',
    photoUrl: '',
    isLoading: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('loading')).toBeVisible();
  },
};
