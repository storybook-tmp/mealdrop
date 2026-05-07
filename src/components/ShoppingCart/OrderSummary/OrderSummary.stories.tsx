import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { cartItems } from '../../../stub/cart-items';
import { OrderSummary } from './OrderSummary';

const meta = {
  component: OrderSummary,
  tags: ['ai-generated'],
} satisfies Meta<typeof OrderSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithItems: Story = {
  args: {
    cartItems,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('€17.75')).toBeVisible();
  },
};

export const Empty: Story = {
  args: {
    cartItems: [],
  },
};
