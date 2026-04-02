import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import type { CartItem } from '../../app-state/cart';
import { ShoppingCartMenu } from './ShoppingCartMenu';

const cartItems: CartItem[] = [
  {
    id: 1,
    name: 'Spicy tuna roll',
    description: 'Eight pieces with sesame and soy glaze.',
    price: 12.5,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Miso soup',
    description: 'Silky tofu, wakame, and scallions.',
    price: 4.25,
    quantity: 1,
  },
];

const meta = {
  title: 'AI Generated/Complex/ShoppingCartMenu',
  component: ShoppingCartMenu,
  args: {
    isOpen: true,
    totalPrice: 29.25,
    cartItems,
    onClose: fn(),
    onItemChange: fn(),
    onGoToCheckoutClick: fn(),
  },
} satisfies Meta<typeof ShoppingCartMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilledCart: Story = {};

export const EmptyCart: Story = {
  args: {
    cartItems: [],
    totalPrice: 0,
  },
};
