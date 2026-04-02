import type { Meta, StoryObj } from '@storybook/react';
import { RestaurantCard } from './RestaurantCard';

const meta = {
  title: 'AI Generated/Medium/RestaurantCard',
  component: RestaurantCard,
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Pizza Palace',
    specialty: 'Italian',
    photoUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500',
    rating: 4.5,
    categories: ['Pizza', 'Italian', 'Pasta'],
  },
};

export const WithNew: Story = {
  args: {
    name: 'New Sushi Bar',
    specialty: 'Japanese',
    photoUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500',
    rating: 4.8,
    isNew: true,
    categories: ['Sushi', 'Japanese'],
  },
};

export const Closed: Story = {
  args: {
    name: 'Burger Joint',
    specialty: 'American',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    rating: 4.2,
    isClosed: true,
    categories: ['Burgers', 'Fast Food'],
  },
};

export const Loading: Story = {
  args: {
    name: 'Loading Restaurant',
    specialty: 'Loading...',
    photoUrl: '',
    isLoading: true,
  },
};

export const NoRating: Story = {
  args: {
    name: 'Coffee Shop',
    specialty: 'Beverages',
    photoUrl: 'https://images.unsplash.com/photo-1459925985917-bf524a88e343?w=500',
    categories: ['Coffee', 'Cafe'],
  },
};
