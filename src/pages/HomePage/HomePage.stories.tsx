import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';

import { HomePage } from './HomePage';

const meta = {
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPage: Story = {
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /hungry\?/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /our favorite picks/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /award winning/i })).toBeVisible();

    await waitFor(() => {
      expect(canvas.getAllByRole('heading', { name: /burger kingdom/i }).length).toBeGreaterThan(0);
    });
  },
};

export const DarkModePage: Story = {
  parameters: {
    darkMode: true,
  },
  render: () => <HomePage />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await expect(canvasElement.ownerDocument.body).toHaveClass('dark-mode');
    await expect(canvas.getByRole('button', { name: /turn on light mode/i })).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: /turn on light mode/i }));

    await expect(canvas.getByRole('button', { name: /turn on dark mode/i })).toBeVisible();
  },
};

export const PageWithOpenCart: Story = {
  parameters: {
    appState: {
      cart: {
        visible: true,
        items: cartItems.slice(0, 2),
      },
    },
  },
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible();
    await expect(canvas.getByText(/cheeseburger/i)).toBeVisible();
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled();
  },
};
