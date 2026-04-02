import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { RestaurantCard } from './RestaurantCard';

const meta = {
  title: 'AI Generated/Medium/RestaurantCard',
  component: RestaurantCard,
  args: {
    name: 'Midnight Ramen',
    specialty: 'Japanese comfort food with handmade noodles and rich tonkotsu broth.',
    rating: 4.7,
    photoUrl:
      'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=80',
    categories: ['ramen', 'late-night'],
    onClick: fn(),
  },
} satisfies Meta<typeof RestaurantCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NewAndClosed: Story = {
  args: {
    isNew: true,
    isClosed: true,
  },
};
