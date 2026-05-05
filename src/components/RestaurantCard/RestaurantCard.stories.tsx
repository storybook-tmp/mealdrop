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
    name: 'Belga',
    specialty: 'Belgian cuisine with waffles and frites',
    rating: 4.5,
    photoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500',
    categories: ['belgian', 'european'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('restaurant-card')).toBeVisible();
    await expect(canvas.getByText('Belga')).toBeVisible();
  },
};

export const New: Story = {
  args: {
    name: 'Sushi Yama',
    specialty: 'Fresh sushi and Japanese dishes',
    rating: 4.8,
    photoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
    categories: ['japanese', 'sushi'],
    isNew: true,
  },
};

export const Closed: Story = {
  args: {
    name: 'Casa Mia',
    specialty: 'Homemade Italian pasta',
    rating: 3.9,
    photoUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500',
    isClosed: true,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    name: '',
    specialty: '',
    photoUrl: '',
  },
};
