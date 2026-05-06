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
      { id: 1, name: 'Cheeseburger', price: 8.5, quantity: 2 },
      { id: 2, name: 'Fries', price: 2.5, quantity: 1 },
      { id: 3, name: 'Coca-Cola', price: 1.75, quantity: 1 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Your order')).toBeVisible();
    await expect(canvas.getByText('Cheeseburger')).toBeVisible();
  },
};

export const EmptyCart: Story = {
  args: { cartItems: [] },
};
