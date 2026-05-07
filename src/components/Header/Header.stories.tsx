import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';

import { HeaderComponent } from './Header';

const meta = {
  component: HeaderComponent,
  tags: ['ai-generated'],
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LogoOnly: Story = {
  args: { logoOnly: true },
};

export const WithCartMenuOpen: Story = {
  args: {
    cartItems,
    isCartVisible: true,
    totalPrice: 16.25,
    goToCheckout: () => {},
    saveItem: () => {},
    toggleCartVisibility: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled();
  },
};
