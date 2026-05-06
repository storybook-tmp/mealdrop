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
    await expect(canvas.getByLabelText('go to home page')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible();
  },
};

export const LogoOnly: Story = {
  args: { logoOnly: true },
};

export const WithCartItems: Story = {
  args: {
    totalPrice: 25.98,
    cartItems: [
      { id: 1, name: 'Classic Burger', price: 8.99, quantity: 2 },
      { id: 2, name: 'Cola', price: 1.99, quantity: 4 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/25\.98/)).toBeVisible();
  },
};

export const CartOpen: Story = {
  args: {
    isCartVisible: true,
    totalPrice: 8.99,
    cartItems: [
      { id: 1, name: 'Classic Burger', price: 8.99, quantity: 1 },
    ],
  },
};
