import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'The Grill House',
    specialty: 'BBQ & Grilled Meats',
    photoUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561241?w=500&h=300&fit=crop',
    rating: 4.5,
    categories: ['BBQ', 'American'],
  },
  play: async ({ canvas }) => {
    const heading = canvas.getByText(/the grill house/i);
    await expect(heading).toBeVisible();

    const specialty = canvas.getByText(/bbq & grilled meats/i);
    await expect(specialty).toBeVisible();

    const card = canvas.getByTestId('restaurant-card');
    await expect(card).toBeVisible();
  },
};

export const New: Story = {
  args: {
    name: 'Sushi Paradise',
    specialty: 'Japanese Cuisine',
    photoUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop',
    rating: 4.7,
    isNew: true,
    categories: ['Sushi', 'Japanese'],
  },
  play: async ({ canvas }) => {
    const newTag = canvas.getByText(/new/i);
    await expect(newTag).toBeVisible();

    const heading = canvas.getByText(/sushi paradise/i);
    await expect(heading).toBeVisible();
  },
};

export const Closed: Story = {
  args: {
    name: 'Burger Junction',
    specialty: 'Gourmet Burgers',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
    rating: 4.3,
    isClosed: true,
    categories: ['Burgers', 'Fast Food'],
  },
  play: async ({ canvas }) => {
    const closedMsg = canvas.getByText(/this restaurant is closed/i);
    await expect(closedMsg).toBeVisible();
  },
};

export const Loading: Story = {
  args: {
    name: 'Loading',
    specialty: 'Loading',
    photoUrl: '',
    isLoading: true,
  },
  play: async ({ canvas }) => {
    const loading = canvas.getByTestId('loading');
    await expect(loading).toBeVisible();
  },
};
