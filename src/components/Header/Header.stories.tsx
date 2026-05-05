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
    await expect(canvas.getByTestId('header')).toBeVisible();
    await expect(canvas.getByLabelText('go to home page')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible();
  },
};

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('go to home page')).toBeVisible();
    // Should not show cart or nav items
    const cartButton = canvas.queryByRole('button', { name: /food cart/i });
    await expect(cartButton).toBeNull();
  },
};

export const WithCartItems: Story = {
  args: {
    totalPrice: 42.5,
    cartItems: [
      {
        id: 1,
        name: 'Margherita',
        price: 12,
        quantity: 2,
        description: 'Classic tomato and mozzarella',
      },
      {
        id: 2,
        name: 'Tiramisu',
        price: 8,
        quantity: 1,
        description: 'Classic Italian dessert',
      },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible();
  },
};
