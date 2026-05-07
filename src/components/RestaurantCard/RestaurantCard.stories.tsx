import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { restaurantsCompleteData } from '../../stub/restaurants';
import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const restaurant = restaurantsCompleteData[0];
const closedRestaurant = restaurantsCompleteData.find((item) => item.isClosed) ?? restaurantsCompleteData[1];

export const Open: Story = {
  args: {
    name: restaurant.name,
    rating: restaurant.rating,
    specialty: restaurant.specialty,
    photoUrl: restaurant.photoUrl,
    categories: restaurant.categories,
    isNew: restaurant.isNew,
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId('restaurant-card'));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Closed: Story = {
  args: {
    name: closedRestaurant.name,
    rating: closedRestaurant.rating,
    specialty: closedRestaurant.specialty,
    photoUrl: closedRestaurant.photoUrl,
    categories: closedRestaurant.categories,
    isClosed: true,
  },
};

export const Loading: Story = {
  args: {
    name: restaurant.name,
    specialty: restaurant.specialty,
    photoUrl: restaurant.photoUrl,
    isLoading: true,
  },
};
