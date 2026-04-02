import type { Meta, StoryObj } from '@storybook/react';
import { HeaderComponent } from './Header';

const meta = {
  title: 'AI Generated/Complex/Header',
  component: HeaderComponent,
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logoOnly: false,
    sticky: false,
    isCartVisible: false,
    totalPrice: 0,
    cartItems: [],
  },
};

export const WithCart: Story = {
  args: {
    logoOnly: false,
    sticky: false,
    isCartVisible: false,
    totalPrice: 45.99,
    cartItems: [
      {
        id: '1',
        quantity: 2,
        restaurantId: 'rest-1',
        name: 'Pizza',
        price: 10.99,
      },
    ],
  },
};

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
    sticky: false,
  },
};

export const Sticky: Story = {
  args: {
    logoOnly: false,
    sticky: true,
    isCartVisible: false,
    totalPrice: 0,
    cartItems: [],
  },
};
