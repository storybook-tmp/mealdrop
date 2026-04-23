import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { restaurantsCompleteData } from '../../stub/restaurants';

import { RestaurantCard } from './RestaurantCard';

const defaultRestaurant = restaurantsCompleteData[0];
const closedRestaurant = restaurantsCompleteData.find((restaurant) => restaurant.isClosed)!;
const newRestaurant = restaurantsCompleteData.find((restaurant) => restaurant.isNew)!;

const meta = {
  component: RestaurantCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RestaurantCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultCard: Story = {
  args: {
    ...defaultRestaurant,
  },
  render: (args) => (
    <div style={{ width: '360px' }}>
      <RestaurantCard {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible();
    await expect(canvas.getByText(/nicest place for burgers/i)).toBeVisible();
    await expect(canvas.getByText(/very good/i)).toBeVisible();
    await expect(canvas.getByText(/^comfort food$/i)).toBeVisible();
  },
};

export const ClosedCard: Story = {
  args: {
    ...closedRestaurant,
  },
  render: (args) => (
    <div style={{ width: '360px' }}>
      <RestaurantCard {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /de oliewinkel/i })).toBeVisible();
  },
};

export const NewRestaurantCard: Story = {
  args: {
    ...newRestaurant,
  },
  render: (args) => (
    <div style={{ width: '360px' }}>
      <RestaurantCard {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/^new$/i)).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /'t kuyltje/i })).toBeVisible();
    await expect(canvas.getByText(/comfort food/i)).toBeVisible();
  },
};
