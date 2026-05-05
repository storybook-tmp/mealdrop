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
    name: 'Pizza Paradise',
    specialty: 'Authentic wood-fired Neapolitan pizzas with fresh mozzarella',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.5,
    categories: ['pizza', 'italian'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza Paradise')).toBeVisible();
    await expect(canvas.getByText(/4\.5/)).toBeVisible();
    await expect(canvas.getByText('pizza')).toBeVisible();
    await expect(canvas.getByText('italian')).toBeVisible();
  },
};

export const NewRestaurant: Story = {
  args: {
    name: 'Sushi Express',
    specialty: 'Fresh sushi and sashimi prepared by experienced chefs',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.8,
    isNew: true,
    categories: ['sushi'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('new')).toBeVisible();
    await expect(canvas.getByText('Sushi Express')).toBeVisible();
  },
};

export const Closed: Story = {
  args: {
    name: 'Comfort Kitchen',
    specialty: 'Homestyle comfort food just like grandma used to make',
    photoUrl:
      'https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible();
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
