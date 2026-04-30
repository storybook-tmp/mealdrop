import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { cartItems } from '../../../stub/cart-items';

import { OrderSummary } from './OrderSummary';

const familyOrder = cartItems.map((item, index) => ({
  ...item,
  quantity: index === 0 ? 3 : item.quantity,
}));

const meta = {
  component: OrderSummary,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof OrderSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilledOrder: Story = {
  args: {
    cartItems,
  },
  render: (args) => (
    <div style={{ maxWidth: '420px' }}>
      <OrderSummary {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible();
    await expect(canvas.getByText(/cheeseburger/i)).toBeVisible();
    await expect(canvas.getByText(/total/i)).toBeVisible();
    await expect(canvas.getByText(/17[.,]75/)).toBeVisible();
  },
};

export const EmptyOrder: Story = {
  args: {
    cartItems: [],
  },
  render: (args) => (
    <div style={{ maxWidth: '420px' }}>
      <OrderSummary {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/your cart is empty/i)).toBeVisible();
    await expect(canvas.getByText(/0[.,]00/)).toBeVisible();
  },
};

export const FamilyOrder: Story = {
  args: {
    cartItems: familyOrder,
  },
  render: (args) => (
    <div style={{ maxWidth: '420px' }}>
      <OrderSummary {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/fries/i)).toBeVisible();
    await expect(canvas.getByText(/^3$/)).toBeVisible();
    await expect(canvas.getByText(/22[.,]75/)).toBeVisible();
  },
};
