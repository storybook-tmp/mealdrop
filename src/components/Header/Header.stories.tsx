import type { Meta, StoryObj } from '@storybook/react';
import { HeaderComponent } from './Header';

const meta = {
  title: 'AI Generated/Complex/HeaderComponent',
  component: HeaderComponent,
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logoOnly: false,
    sticky: false,
    isCartVisible: false,
    cartItems: [],
    totalPrice: 0,
    toggleCartVisibility: () => alert('Toggle cart visibility'),
    goToCheckout: () => alert('Go to checkout'),
    saveItem: () => alert('Save item'),
  },
};

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
    sticky: false,
  },
};

export const WithCartItems: Story = {
  args: {
    logoOnly: false,
    sticky: true,
    isCartVisible: false,
    cartItems: [
      { id: 1, name: 'Pizza', quantity: 2, price: 25 },
      { id: 2, name: 'Burger', quantity: 1, price: 15 },
    ],
    totalPrice: 65,
    toggleCartVisibility: () => alert('Toggle cart visibility'),
    goToCheckout: () => alert('Go to checkout'),
    saveItem: () => alert('Save item'),
  },
};
