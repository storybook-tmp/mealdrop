import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';

import { HomePage } from './HomePage';

const meta = {
  component: HomePage,
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /hungry\?/i })).toBeVisible();

    await waitFor(() => {
      expect(canvas.getByText(/burger kingdom/i)).toBeVisible();
    });

    await expect(canvas.getByRole('heading', { name: /categories/i })).toBeVisible();
  },
};

export const NavigateToCategories: Story = {
  render: () => <HomePage />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /view all restaurants/i }));

    await waitFor(() => {
      expect(canvas.getByTestId('storybook-location')).toHaveTextContent('/categories');
    });
  },
};

export const OpenCart: Story = {
  parameters: {
    app: {
      preloadedState: {
        cart: {
          items: cartItems,
        },
      },
    },
  },
  render: () => <HomePage />,
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByText(/17[.,]75/)).toBeVisible();
    });

    await userEvent.click(canvas.getByRole('button', { name: /food cart/i }));

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible();
    });

    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled();
  },
};
