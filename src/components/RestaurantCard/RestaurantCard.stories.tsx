import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { RestaurantCard, RestaurantCardSkeleton } from './RestaurantCard';
import { restaurantsCompleteData } from '../../stub/restaurants';

const meta = {
  component: RestaurantCard,
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const burgerKingdom = restaurantsCompleteData[0];

export const Default: Story = {
  args: {
    name: burgerKingdom.name,
    specialty: burgerKingdom.specialty,
    photoUrl: burgerKingdom.photoUrl,
    rating: burgerKingdom.rating,
    categories: burgerKingdom.categories,
  },
  render: (args) => <RestaurantCard {...args} />,
  play: async ({ canvas }) => {
    const card = canvas.getByTestId('restaurant-card');
    await expect(card).toBeVisible();
    await expect(canvas.getByText(/Burger Kingdom/i)).toBeVisible();
    await expect(canvas.getByText(/Nicest place for burgers/i)).toBeVisible();
  },
};

export const New: Story = {
  args: {
    name: 'New Restaurant',
    specialty: 'Amazing food',
    photoUrl: burgerKingdom.photoUrl,
    isNew: true,
    categories: ['pizza'],
  },
  render: (args) => <RestaurantCard {...args} />,
  play: async ({ canvas }) => {
    const card = canvas.getByTestId('restaurant-card');
    await expect(card).toBeVisible();
    const newTag = canvas.getByText('new');
    await expect(newTag).toBeVisible();
  },
};

export const Closed: Story = {
  args: {
    name: 'Closed Restaurant',
    specialty: 'Currently not available',
    photoUrl: burgerKingdom.photoUrl,
    isClosed: true,
  },
  render: (args) => <RestaurantCard {...args} />,
  play: async ({ canvas }) => {
    const card = canvas.getByTestId('restaurant-card');
    await expect(card).toBeVisible();
    await expect(canvas.getByText(/This restaurant is closed/i)).toBeVisible();
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    name: 'Loading',
    specialty: 'Loading',
    photoUrl: '',
  },
  render: (args) => <RestaurantCard {...args} />,
  play: async ({ canvas }) => {
    const loading = canvas.getByTestId('loading');
    await expect(loading).toBeVisible();
  },
};

export const WithRating: Story = {
  args: {
    name: 'Highly Rated',
    specialty: 'Excellent service',
    photoUrl: burgerKingdom.photoUrl,
    rating: 4.8,
    categories: ['burgers', 'comfort food'],
  },
  render: (args) => <RestaurantCard {...args} />,
  play: async ({ canvas }) => {
    const card = canvas.getByTestId('restaurant-card');
    await expect(card).toBeVisible();
    await expect(canvas.getByText(/Highly Rated/i)).toBeVisible();
  },
};
