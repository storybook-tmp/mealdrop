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
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible();
  },
};

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible();
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible();
  },
};

export const WithCartItems: Story = {
  args: {
    cartItems: [
      { id: 1, name: 'Cheeseburger', price: 8.5, quantity: 2 },
      { id: 2, name: 'Fries', price: 2.5, quantity: 1 },
    ],
    totalPrice: 19.5,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible();
  },
};
