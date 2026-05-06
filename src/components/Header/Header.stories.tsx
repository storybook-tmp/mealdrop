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
  },
};

export const LogoOnly: Story = {
  args: { logoOnly: true },
};

export const WithCartItems: Story = {
  args: {
    totalPrice: 25.98,
    cartItems: [
      { id: 1, name: 'Classic Burger', price: 9.99, quantity: 2, description: 'Beef patty' },
      { id: 2, name: 'Cola', price: 2.99, quantity: 2, description: 'Refreshing cola' },
    ],
  },
};
