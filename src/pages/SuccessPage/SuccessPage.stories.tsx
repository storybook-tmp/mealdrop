import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { restaurantsCompleteData } from '../../stub/restaurants';

import { SuccessPage } from './SuccessPage';

const orderItems = [
  { ...restaurantsCompleteData[0].menu.food[0], quantity: 2 },
  { ...restaurantsCompleteData[0].menu.drinks[0], quantity: 1 },
];

const meta = {
  component: SuccessPage,
} satisfies Meta<typeof SuccessPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithOrder: Story = {
  parameters: {
    storeState: {
      order: {
        items: orderItems,
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible();
    await expect(canvas.getByText(/estimated delivery/i)).toBeVisible();
    await expect(canvas.getByText('Cheeseburger')).toBeVisible();
    await expect(canvas.getByText('Coca-Cola')).toBeVisible();
  },
};

export const EmptyOrder: Story = {
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible();
    await expect(canvas.getByText('Your cart is empty.')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /13:23 today/i })).toBeVisible();
  },
};
