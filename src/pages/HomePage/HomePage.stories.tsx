import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { restaurantsCompleteData } from '../../stub/restaurants';

import { HomePage } from './HomePage';

const cartItems = [
  { ...restaurantsCompleteData[0].menu.food[0], quantity: 2 },
  { ...restaurantsCompleteData[0].menu.drinks[0], quantity: 1 },
];

const meta = {
  component: HomePage,
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /hungry\? find your next meal/i })
    ).toBeVisible();
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /our favorite picks/i })).toBeVisible();
      expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible();
    });
    await expect(canvas.getByRole('heading', { name: 'Categories' })).toBeVisible();
    await expect(canvas.getByText('Pizza')).toBeVisible();
  },
};

export const WithOpenCart: Story = {
  parameters: {
    storeState: {
      cart: {
        items: cartItems,
        visible: true,
      },
    },
  },
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible();
    });
    await expect(canvas.getByTestId('sidebar')).toBeVisible();
    await expect(canvas.getByText('Your order')).toBeVisible();
    await expect(canvas.getByText('Cheeseburger')).toBeVisible();
  },
};
