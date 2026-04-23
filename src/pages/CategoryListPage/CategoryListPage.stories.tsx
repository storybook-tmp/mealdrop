import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';

import { CategoryListPage } from './CategoryListPage';

const meta = {
  component: CategoryListPage,
} satisfies Meta<typeof CategoryListPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /categories/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /what’s on the menu\?/i })).toBeVisible();
    await expect(canvas.getByText(/feeling like having pizza\?/i)).toBeVisible();
  },
};

export const NavigateToCategory: Story = {
  render: () => <CategoryListPage />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText(/^Pizza$/));

    await waitFor(() => {
      expect(canvas.getByTestId('storybook-location')).toHaveTextContent('/categories/pizza');
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
  render: () => <CategoryListPage />,
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByText(/17[.,]75/)).toBeVisible();
    });

    await userEvent.click(canvas.getByRole('button', { name: /food cart/i }));

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible();
    });
  },
};
