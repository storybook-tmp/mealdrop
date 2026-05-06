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
    totalPrice: 22.5,
    cartItems: [
      { id: 1, name: 'Cheeseburger', price: 8.5, quantity: 2 },
      { id: 2, name: 'Fries', price: 2.5, quantity: 1 },
    ],
  },
};

export const OpenCart: Story = {
  args: {
    isCartVisible: true,
    totalPrice: 8.5,
    cartItems: [{ id: 1, name: 'Cheeseburger', price: 8.5, quantity: 1, description: 'Nice grilled burger with cheese' }],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Your order')).toBeVisible();
  },
};
