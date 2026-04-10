import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { restaurantsCompleteData } from '../../stub/restaurants';

import { RestaurantCard } from './RestaurantCard';

const defaultRestaurant = restaurantsCompleteData[0];
const closedRestaurant = restaurantsCompleteData.find((restaurant) => restaurant.isClosed)!;
const newRestaurant = restaurantsCompleteData.find((restaurant) => restaurant.isNew)!;

const meta = {
  component: RestaurantCard,
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...defaultRestaurant,
    onClick: fn(),
  },
  render: (args) => (
    <div className="container" style={{ maxWidth: 420, paddingTop: '2rem', paddingBottom: '2rem' }}>
      <RestaurantCard {...args} />
    </div>
  ),
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByRole('img', { name: /restaurant/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: defaultRestaurant.name })).toBeVisible();
    await expect(canvas.getByText('★ 4.2 Very good')).toBeVisible();
    await userEvent.click(canvas.getByTestId('restaurant-card'));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const NewlyAdded: Story = {
  args: {
    ...newRestaurant,
    onClick: fn(),
  },
  render: (args) => (
    <div className="container" style={{ maxWidth: 420, paddingTop: '2rem', paddingBottom: '2rem' }}>
      <RestaurantCard {...args} />
    </div>
  ),
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText('new')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: newRestaurant.name })).toBeVisible();
    await expect(canvas.getByText('comfort food')).toBeVisible();
    await userEvent.click(canvas.getByTestId('restaurant-card'));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Closed: Story = {
  args: {
    ...closedRestaurant,
    onClick: fn(),
  },
  render: (args) => (
    <div className="container" style={{ maxWidth: 420, paddingTop: '2rem', paddingBottom: '2rem' }}>
      <RestaurantCard {...args} />
    </div>
  ),
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText('This restaurant is closed.')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: closedRestaurant.name })).toBeVisible();
    await userEvent.click(canvas.getByTestId('restaurant-card'));
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
