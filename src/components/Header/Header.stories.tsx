import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';

import { Header } from './Header';

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /turn on dark mode/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible();
  },
};

export const FilledCart: Story = {
  parameters: {
    app: {
      preloadedState: {
        cart: {
          items: cartItems,
        },
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/order/i)).toBeVisible();
    await expect(canvas.getByText(/17[.,]75/)).toBeVisible();
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible();
  },
};

export const OpenCart: Story = {
  parameters: {
    app: {
      preloadedState: {
        cart: {
          visible: true,
          items: cartItems,
        },
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible();
    await expect(canvas.getByText(/fried french fries/i)).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: /close sidebar/i }));

    await waitFor(() => {
      expect(canvas.queryByTestId('sidebar')).not.toBeInTheDocument();
    });
  },
};
