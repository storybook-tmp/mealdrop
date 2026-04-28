import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { RestaurantCard, RestaurantCardSkeleton } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Burger Kingdom',
    specialty: 'Nicest place for burgers',
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    rating: 4.2,
    categories: ['burgers', 'comfort food'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('restaurant-card')).toBeVisible();
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible();
  },
};

export const Closed: Story = {
  args: {
    name: 'De Oliewinkel',
    specialty: 'Olive oil',
    photoUrl: 'https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg',
    isClosed: true,
    categories: ['comfort food'],
  },
};

export const New: Story = {
  args: {
    name: "t' Kuyltje",
    specialty: 'Pastrami sandwiches',
    photoUrl: 'https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg',
    isNew: true,
    categories: ['comfort food'],
  },
};

export const Skeleton: Story = {
  args: {
    name: '',
    specialty: '',
    photoUrl: '',
    isLoading: true,
  },
};
