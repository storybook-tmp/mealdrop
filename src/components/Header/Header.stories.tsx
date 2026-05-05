import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { HeaderComponent } from './Header';

const meta = {
  component: HeaderComponent,
  tags: ['ai-generated'],
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible();
  },
};

export const LogoOnly: Story = {
  args: { logoOnly: true },
};

export const WithCartItems: Story = {
  args: {
    totalPrice: 23.5,
    cartItems: [
      { id: 1, name: 'Cheeseburger', price: 8.5, quantity: 2 },
      { id: 2, name: 'Fries', price: 2.5, quantity: 1 },
      { id: 3, name: 'Coca-Cola', price: 1.75, quantity: 2 },
    ],
  },
};

export const CartOpen: Story = {
  args: {
    isCartVisible: true,
    totalPrice: 14.75,
    cartItems: [
      { id: 1, name: 'Cheeseburger', description: 'Nice grilled burger with cheese', price: 8.5, quantity: 1 },
      { id: 2, name: 'Fries', description: 'Fried french fries', price: 2.5, quantity: 1 },
      { id: 4, name: 'Coca-Cola', price: 1.75, quantity: 1 },
      { id: 3, name: 'Vanilla ice cream', description: 'Ice cream', price: 2, quantity: 1 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible();
  },
};
