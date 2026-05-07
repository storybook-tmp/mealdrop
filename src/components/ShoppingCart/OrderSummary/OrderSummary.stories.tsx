import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { OrderSummary } from './OrderSummary';

const cartItems = [
  {
    id: 1,
    name: 'Salmon nigiri',
    description: 'Fresh salmon over rice',
    price: 8,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Miso soup',
    description: 'Tofu, wakame, and scallion',
    price: 4,
    quantity: 3,
  },
];

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
    await expect(canvas.getByText(/28\.00/)).toBeVisible();
  },
};

export const Empty: Story = {
  args: {
    cartItems: [],
  },
};
