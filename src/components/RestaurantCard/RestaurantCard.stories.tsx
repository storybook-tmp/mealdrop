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
    name: 'Burger Kingdom',
    specialty: 'Nicest place for burgers',
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=20',
    rating: 4.2,
    categories: ['burgers', 'comfort food'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible();
    await expect(canvas.getByText(/4\.2/)).toBeVisible();
    await expect(canvas.getByText('burgers')).toBeVisible();
  },
};

export const New: Story = {
  args: {
    name: 'Ciao Bella',
    specialty: 'Takeaway lasagna',
    photoUrl:
      'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categories: ['pizza'],
    isNew: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('new')).toBeVisible();
    await expect(canvas.getByText('Ciao Bella')).toBeVisible();
  },
};

export const Closed: Story = {
  args: {
    name: 'De Oliewinkel',
    specialty: 'Olive oil',
    photoUrl: 'https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg',
    categories: ['comfort food'],
    isClosed: true,
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

export const NoRating: Story = {
  args: {
    name: 'Kara Fin',
    specialty: 'Sarma (wine leafs with rice)',
    photoUrl:
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categories: ['burgers', 'pizza'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Kara Fin')).toBeVisible();
    await expect(canvas.getByText('No reviews yet')).toBeVisible();
  },
};
