import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';

import { Header } from './Header';

const meta = {
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultNavigation: Story = {
  render: () => <Header />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('button', { name: /turn on dark mode/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: /food cart/i }));

    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible();
    await expect(canvas.getByText(/€0.00/i)).toBeVisible();
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled();
  },
};

export const FilledCartMenu: Story = {
  parameters: {
    appState: {
      cart: {
        visible: true,
        items: cartItems.slice(0, 3),
      },
    },
  },
  render: () => <Header />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible();
    await expect(canvas.getByText(/cheeseburger/i)).toBeVisible();
    await expect(canvas.getByText(/vanilla ice cream/i)).toBeVisible();
    await expect(canvas.getAllByLabelText(/1 times/i)).toHaveLength(3);
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled();

    await userEvent.click(canvas.getByRole('button', { name: /close sidebar/i }));

    await waitFor(() => {
      expect(canvas.queryByRole('heading', { name: /your order/i })).not.toBeInTheDocument();
    });
  },
};

export const StickyDarkModeHeader: Story = {
  parameters: {
    darkMode: true,
    appState: {
      cart: {
        items: cartItems.slice(0, 1),
      },
    },
  },
  render: () => <Header sticky />,
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByTestId('header')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /turn on light mode/i })).toBeVisible();
    await expect(canvasElement.ownerDocument.body).toHaveClass('dark-mode');
  },
};
