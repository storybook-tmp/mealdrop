import type { Meta, StoryObj } from '@storybook/react';
import { RestaurantCard } from './RestaurantCard';

const meta = {
  title: 'AI Generated/Complex/RestaurantCard',
  component: RestaurantCard,
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Pizza Palace',
    specialty: 'Italian',
    photoUrl: 'https://via.placeholder.com/500x300',
    rating: 4.5,
    categories: ['Pizza', 'Pasta', 'Italian'],
  },
};

export const NewRestaurant: Story = {
  args: {
    name: 'Burger King',
    specialty: 'Burgers',
    photoUrl: 'https://via.placeholder.com/500x300',
    rating: 4.2,
    categories: ['Burgers', 'Fast Food'],
    isNew: true,
  },
};

export const Closed: Story = {
  args: {
    name: 'Sushi Palace',
    specialty: 'Japanese',
    photoUrl: 'https://via.placeholder.com/500x300',
    rating: 4.8,
    categories: ['Sushi', 'Japanese'],
    isClosed: true,
  },
};

export const Loading: Story = {
  args: {
    name: 'Loading Restaurant',
    specialty: 'Loading...',
    photoUrl: 'https://via.placeholder.com/500x300',
    isLoading: true,
  },
};
