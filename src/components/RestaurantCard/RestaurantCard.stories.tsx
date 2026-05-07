import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import restaurantsImage from '../../assets/images/restaurants.png';

import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    name: 'Sushi Circle',
    specialty: 'Nigiri, maki, and hand rolls',
    photoUrl: restaurantsImage,
    rating: 4.8,
    categories: ['sushi', 'japanese'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/4\.8 very good/i)).toBeVisible();
  },
};

export const NewRestaurant: Story = {
  args: {
    name: 'Pasta Yard',
    specialty: 'Fresh pasta and seasonal sauces',
    photoUrl: restaurantsImage,
    rating: 4.4,
    categories: ['italian'],
    isNew: true,
  },
};

export const Closed: Story = {
  args: {
    name: 'Closed Burger',
    specialty: 'Smash burgers and fries',
    photoUrl: restaurantsImage,
    rating: 3.7,
    isClosed: true,
    categories: ['burgers'],
  },
};

export const Loading: Story = {
  args: {
    name: 'Loading restaurant',
    specialty: 'Menu is loading',
    photoUrl: restaurantsImage,
    isLoading: true,
  },
};
