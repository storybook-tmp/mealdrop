import type { Meta, StoryObj } from '@storybook/react';
import { HeaderComponent } from './Header';

const meta = {
  title: 'AI Generated/Medium/Header',
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
    toggleCartVisibility: () => {},
    goToCheckout: () => {},
    saveItem: () => {},
  },
};

export const WithCart: Story = {
  args: {
    logoOnly: false,
    sticky: false,
    isCartVisible: false,
    cartItems: [
      {
        id: '1',
        name: 'Pasta Carbonara',
        description: 'Classic Italian pasta',
        price: 12.99,
        quantity: 2,
        photo: '',
      },
    ],
    totalPrice: 25.98,
    toggleCartVisibility: () => {},
    goToCheckout: () => {},
    saveItem: () => {},
  },
};

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
    sticky: false,
    isCartVisible: false,
    cartItems: [],
    totalPrice: 0,
    toggleCartVisibility: () => {},
    goToCheckout: () => {},
    saveItem: () => {},
  },
};
