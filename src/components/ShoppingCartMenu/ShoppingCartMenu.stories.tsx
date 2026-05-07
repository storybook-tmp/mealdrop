import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';

import { ShoppingCartMenu } from './ShoppingCartMenu';

const meta = {
  component: ShoppingCartMenu,
  tags: ['ai-generated'],
  args: {
    onClose: () => {},
    onGoToCheckoutClick: () => {},
    onItemChange: () => {},
  },
} satisfies Meta<typeof ShoppingCartMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    cartItems,
    isOpen: true,
    totalPrice: 16.25,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Your order')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled();
  },
};

export const Empty: Story = {
  args: {
    cartItems: [],
    isOpen: true,
    totalPrice: 0,
  },
};

export const Closed: Story = {
  args: {
    cartItems,
    isOpen: false,
    totalPrice: 16.25,
  },
};
