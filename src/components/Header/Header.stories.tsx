import type { Meta, StoryObj } from '@storybook/react';
import { HeaderComponent } from './Header';

const meta = {
  title: 'AI Generated/Complex/Header',
  component: HeaderComponent,
  args: {
    isCartVisible: false,
    cartItems: [],
    totalPrice: 0,
    logoOnly: false,
    sticky: false,
  },
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isCartVisible: false,
    cartItems: [],
    totalPrice: 0,
  },
};

export const WithCartItems: Story = {
  args: {
    isCartVisible: true,
    cartItems: [
      { id: '1', name: 'Pizza', price: 12.99, quantity: 1 },
      { id: '2', name: 'Burger', price: 8.99, quantity: 2 },
    ],
    totalPrice: 30.97,
  },
};

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
};

export const Sticky: Story = {
  args: {
    sticky: true,
    isCartVisible: false,
    cartItems: [],
    totalPrice: 0,
  },
};

export const WithManyCartItems: Story = {
  args: {
    isCartVisible: true,
    cartItems: Array.from({ length: 5 }, (_, i) => ({
      id: String(i),
      name: `Item ${i + 1}`,
      price: (i + 1) * 10.99,
      quantity: i + 1,
    })),
    totalPrice: 200.5,
  },
};
