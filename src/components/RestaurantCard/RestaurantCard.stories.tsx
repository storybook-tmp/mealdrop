import type { Meta, StoryObj } from '@storybook/react-vite';
import { RestaurantCard } from './RestaurantCard';

const meta = {
  title: 'AI Generated/Medium/RestaurantCard',
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'The Golden Fork',
    specialty: 'Fresh Mediterranean cuisine with seasonal ingredients and a modern twist.',
    photoUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500',
    rating: 4.5,
    categories: ['Mediterranean', 'Healthy'],
  },
};

export const Loading: Story = {
  args: {
    name: '',
    specialty: '',
    photoUrl: '',
    isLoading: true,
  },
};

export const Closed: Story = {
  args: {
    name: 'Sunset Bistro',
    specialty: 'Classic American comfort food.',
    photoUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500',
    rating: 3.8,
    isClosed: true,
  },
};

export const NewRestaurant: Story = {
  args: {
    name: 'Urban Bites',
    specialty: 'Modern street food from around the world.',
    photoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    rating: 4.9,
    isNew: true,
    categories: ['Street Food', 'International'],
  },
};
