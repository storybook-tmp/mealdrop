import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { OrderSummary } from './OrderSummary';

const meta = {
  component: OrderSummary,
  tags: ['ai-generated'],
} satisfies Meta<typeof OrderSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithItems: Story = {
  args: {
    cartItems: [
      { id: 1, name: 'Classic Burger', price: 9.99, quantity: 2 },
      { id: 2, name: 'Fries', price: 4.99, quantity: 1 },
      { id: 3, name: 'Cola', price: 2.99, quantity: 2 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Your order')).toBeVisible();
    await expect(canvas.getByText('Classic Burger')).toBeVisible();
    await expect(canvas.getByText('Fries')).toBeVisible();
    await expect(canvas.getByText('Cola')).toBeVisible();
    await expect(canvas.getByText('Total')).toBeVisible();
  },
};

export const EmptyCart: Story = {
  args: {
    cartItems: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Your cart is empty.')).toBeVisible();
  },
};

export const SingleItem: Story = {
  args: {
    cartItems: [{ id: 1, name: 'Margherita Pizza', price: 11.99, quantity: 1 }],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Margherita Pizza')).toBeVisible();
    await expect(canvas.getByText('Total')).toBeVisible();
  },
};
