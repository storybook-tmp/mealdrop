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
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible();
  },
};

export const WithCartItems: Story = {
  args: {
    totalPrice: 25.98,
    cartItems: [
      { id: 1, name: 'Burger', price: 9.99, quantity: 2 },
      { id: 2, name: 'Fries', price: 5.99, quantity: 1 },
    ],
  },
};

export const LogoOnly: Story = {
  args: { logoOnly: true },
};

export const CartOpen: Story = {
  args: {
    isCartVisible: true,
    totalPrice: 9.99,
    cartItems: [{ id: 1, name: 'Burger', price: 9.99, quantity: 1 }],
  },
  play: async ({ canvas, userEvent }) => {
    // Verify the sidebar opens with cart items
    await expect(canvas.getByTestId('sidebar')).toBeVisible();
    // Close the sidebar
    await userEvent.click(canvas.getByRole('button', { name: /close sidebar/i }));
  },
};
