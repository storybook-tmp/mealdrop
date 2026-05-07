import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';
import { ShoppingCartMenu } from './ShoppingCartMenu';

const meta = {
  component: ShoppingCartMenu,
  tags: ['ai-generated'],
} satisfies Meta<typeof ShoppingCartMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    totalPrice: 18.5,
    cartItems,
    onClose: fn(),
    onItemChange: fn(),
    onGoToCheckoutClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.selectOptions(canvas.getAllByRole('combobox')[0], '3');
    await expect(args.onItemChange).toHaveBeenCalledWith({ ...cartItems[0], quantity: 3 });
  },
};

export const Empty: Story = {
  args: {
    isOpen: true,
    totalPrice: 0,
    cartItems: [],
    onClose: fn(),
    onItemChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled();
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    totalPrice: 18.5,
    cartItems,
    onClose: fn(),
    onItemChange: fn(),
  },
};
