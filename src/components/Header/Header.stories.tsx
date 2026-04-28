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
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible();
  },
};

export const WithCartItems: Story = {
  args: {
    totalPrice: 23.5,
    cartItems: [
      { id: 1, name: 'Waffle', price: 8.5, quantity: 1 },
      { id: 2, name: 'Frites', price: 4.0, quantity: 1 },
    ],
  },
};

export const LogoOnly: Story = {
  args: { logoOnly: true },
};
