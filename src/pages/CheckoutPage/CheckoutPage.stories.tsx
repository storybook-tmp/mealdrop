import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';

import { CheckoutPage } from './CheckoutPage';

const meta = {
  component: CheckoutPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CheckoutPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyCheckout: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /contact details/i })).toBeVisible();
    await expect(canvas.getByText(/your cart is empty\./i)).toBeVisible();
  },
};

export const FilledOrderSummary: Story = {
  parameters: {
    appState: {
      cart: {
        items: cartItems.slice(0, 2),
      },
    },
  },
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/cheeseburger/i)).toBeVisible();
    await expect(canvas.getByText(/fries/i)).toBeVisible();
    await expect(canvas.getByText(/€11.00/i)).toBeVisible();
  },
};

export const ContactValidation: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /next/i }));

    await expect(canvas.getAllByText(/required/i)).toHaveLength(4);
    await expect(canvas.getByLabelText(/first name/i)).toBeVisible();
  },
};
