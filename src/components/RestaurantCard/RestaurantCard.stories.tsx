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
    specialty: 'The best burgers in town since 1998',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300',
    rating: 4.5,
    categories: ['burgers', 'comfort-food'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible();
    await expect(canvas.getByText(/very good/i)).toBeVisible();
    await expect(canvas.getByText('burgers')).toBeVisible();
  },
};

export const New: Story = {
  args: {
    name: 'Sushi Palace',
    specialty: 'Fresh sushi and Japanese cuisine',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=300',
    rating: 4.8,
    isNew: true,
    categories: ['sushi', 'asian'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('new')).toBeVisible();
    await expect(canvas.getByText('Sushi Palace')).toBeVisible();
  },
};

export const Closed: Story = {
  args: {
    name: 'Pizza Place',
    specialty: 'Traditional Italian pizza',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300',
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
