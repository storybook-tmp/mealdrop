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
    name: 'Italian Kitchen',
    photoUrl: 'https://images.unsplash.com/photo-1571407614e61eb9e0f09e0e7c6ad3a6d9b8e5e?w=500&h=300&fit=crop',
    specialty: 'Italian cuisine with fresh pasta and wood-fired pizzas',
    rating: 4.5,
    categories: ['Italian', 'Pasta'],
  },
};

export const New: Story = {
  args: {
    name: 'New Sushi Place',
    photoUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop',
    specialty: 'Fresh sushi and Japanese specialties',
    rating: 4.8,
    categories: ['Sushi', 'Japanese'],
    isNew: true,
  },
};

export const Closed: Story = {
  args: {
    name: 'Closed Restaurant',
    photoUrl: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=300&fit=crop',
    specialty: 'This restaurant is currently closed',
    rating: 3.9,
    categories: ['Restaurant'],
    isClosed: true,
  },
};

export const Loading: Story = {
  args: {
    name: '',
    photoUrl: '',
    specialty: '',
    isLoading: true,
  },
};
