import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCartMenu } from './ShoppingCartMenu';

const meta = {
  title: 'AI Generated/Complex/ShoppingCartMenu',
  component: ShoppingCartMenu,
} satisfies Meta<typeof ShoppingCartMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    isOpen: true,
    totalPrice: 0,
    onClose: () => {},
    cartItems: [],
    onGoToCheckoutClick: () => {},
    onItemChange: () => {},
  },
};

export const WithItems: Story = {
  args: {
    isOpen: true,
    totalPrice: 38.97,
    onClose: () => {},
    cartItems: [
      {
        id: '1',
        name: 'Pasta Carbonara',
        description: 'Classic Italian pasta with bacon',
        price: 12.99,
        quantity: 2,
        photo: '',
      },
      {
        id: '2',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella and tomato',
        price: 12.99,
        quantity: 1,
        photo: '',
      },
    ],
    onGoToCheckoutClick: () => {},
    onItemChange: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    totalPrice: 25.98,
    onClose: () => {},
    cartItems: [
      {
        id: '1',
        name: 'Burger',
        description: 'Classic beef burger',
        price: 12.99,
        quantity: 2,
        photo: '',
      },
    ],
    onGoToCheckoutClick: () => {},
    onItemChange: () => {},
  },
};
