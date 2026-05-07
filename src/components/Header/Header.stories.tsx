import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';
import { HeaderComponent } from './Header';

const meta = {
  component: HeaderComponent,
  tags: ['ai-generated'],
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCartTotal: Story = {
  args: {
    totalPrice: 18.5,
    cartItems,
    toggleCartVisibility: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /food cart/i }));
    await expect(args.toggleCartVisibility).toHaveBeenCalled();
  },
};

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
};

export const CartOpen: Story = {
  args: {
    isCartVisible: true,
    totalPrice: 18.5,
    cartItems,
    toggleCartVisibility: fn(),
    saveItem: fn(),
    goToCheckout: fn(),
  },
};
