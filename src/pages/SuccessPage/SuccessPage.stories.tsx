import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';

import { SuccessPage } from './SuccessPage';

const singleOrderItem = [cartItems[0]];

const meta = {
  component: SuccessPage,
} satisfies Meta<typeof SuccessPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    app: {
      preloadedState: {
        order: {
          items: cartItems,
        },
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /13:23 today/i })).toBeVisible();
    await expect(canvas.getByText(/17[.,]75/)).toBeVisible();
  },
};

export const SingleItemOrder: Story = {
  parameters: {
    app: {
      preloadedState: {
        order: {
          items: singleOrderItem,
        },
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/fries/i)).toBeVisible();
    await expect(canvas.getAllByText(/2[.,]50/)).toHaveLength(2);
  },
};

export const EmptyOrder: Story = {
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/your cart is empty/i)).toBeVisible();
    await expect(canvas.getByText(/0[.,]00/)).toBeVisible();
  },
};
