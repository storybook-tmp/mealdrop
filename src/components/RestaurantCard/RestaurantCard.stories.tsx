import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { restaurantsCompleteData } from '../../stub/restaurants';

import { RestaurantCard } from './RestaurantCard';

const burgerKingdom = restaurantsCompleteData[0];
const closedRestaurant = restaurantsCompleteData.find((restaurant) => restaurant.isClosed)!;
const newRestaurant = restaurantsCompleteData.find((restaurant) => restaurant.isNew)!;

const meta = {
  component: RestaurantCard,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RestaurantCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: burgerKingdom,
  render: (args) => (
    <div style={{ maxWidth: '356px' }}>
      <RestaurantCard {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/burger kingdom/i)).toBeVisible();
    await expect(canvas.getByText(/nicest place for burgers/i)).toBeVisible();
    await expect(canvas.getByText(/comfort food/i)).toBeVisible();
    await expect(canvas.getByAltText(/restaurant/i)).toBeVisible();
  },
};

export const New: Story = {
  args: newRestaurant,
  render: (args) => (
    <div style={{ maxWidth: '356px' }}>
      <RestaurantCard {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/new/i)).toBeVisible();
    await expect(canvas.getByText(/ciao bella|kuyltje/i)).toBeVisible();
    await expect(canvas.getByText(/comfort food|pizza/i)).toBeVisible();
  },
};

export const Closed: Story = {
  args: closedRestaurant,
  render: (args) => (
    <div style={{ maxWidth: '356px' }}>
      <RestaurantCard {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible();
    await expect(canvas.getByText(/de oliewinkel/i)).toBeVisible();
    await expect(canvas.getByText(/olive oil/i)).toBeVisible();
  },
};
