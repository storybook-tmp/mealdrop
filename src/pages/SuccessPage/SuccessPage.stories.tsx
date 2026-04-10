import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';

import { SuccessPage } from './SuccessPage';

const meta = {
  component: SuccessPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SuccessPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ConfirmedOrder: Story = {
  parameters: {
    appState: {
      order: {
        items: cartItems.slice(0, 2),
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible();
    await expect(canvas.getByText(/estimated delivery/i)).toBeVisible();
    await expect(canvas.getByText(/cheeseburger/i)).toBeVisible();
    await expect(canvas.getByText(/€11.00/i)).toBeVisible();
  },
};

export const EmptyOrderSummary: Story = {
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible();
    await expect(canvas.getByText(/your cart is empty\./i)).toBeVisible();
  },
};

export const DarkModeSuccessPage: Story = {
  parameters: {
    darkMode: true,
    appState: {
      order: {
        items: cartItems.slice(0, 1),
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas, canvasElement }) => {
    await expect(canvasElement.ownerDocument.body).toHaveClass('dark-mode');
    await expect(canvas.getByRole('heading', { name: /13:23 today/i })).toBeVisible();
    await expect(canvas.getByText(/fries/i)).toBeVisible();
  },
};
