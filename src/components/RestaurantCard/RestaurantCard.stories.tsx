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
    name: 'Italian Pasta House',
    specialty: 'Italian Cuisine',
    photoUrl: 'https://via.placeholder.com/500x200',
    rating: 4.5,
    categories: ['Italian', 'Pasta'],
  },
};

export const WithNew: Story = {
  args: {
    name: 'New Restaurant',
    specialty: 'Fresh Sushi',
    photoUrl: 'https://via.placeholder.com/500x200',
    rating: 5,
    categories: ['Sushi', 'Asian'],
    isNew: true,
  },
};

export const Closed: Story = {
  args: {
    name: 'Closed Restaurant',
    specialty: 'Mexican Food',
    photoUrl: 'https://via.placeholder.com/500x200',
    rating: 4,
    isClosed: true,
  },
};

export const Loading: Story = {
  args: {
    name: 'Loading Restaurant',
    specialty: 'Loading...',
    photoUrl: 'https://via.placeholder.com/500x200',
    isLoading: true,
  },
};
