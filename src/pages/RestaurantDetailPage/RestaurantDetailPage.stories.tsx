import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

import { RestaurantDetailPage } from './RestaurantDetailPage';

const meta = {
  component: RestaurantDetailPage,
  parameters: {
    layout: 'fullscreen',
    routePath: '/restaurants/:id',
  },
} satisfies Meta<typeof RestaurantDetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadedRestaurant: Story = {
  parameters: {
    initialRoute: '/restaurants/1',
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible();
    });

    await expect(canvas.getByRole('heading', { name: /to eat/i })).toBeVisible();

    await userEvent.click(canvas.getByRole('heading', { name: /cheeseburger/i }));

    const page = within(canvasElement.ownerDocument.body);
    const modal = page.getByTestId('modal');
    const modalContent = within(modal);

    await waitFor(() => {
      expect(modal).toBeVisible();
    });

    await expect(modalContent.getByRole('heading', { name: /cheeseburger/i })).toBeVisible();
    await expect(modalContent.getByRole('button', { name: /confirm/i })).toBeVisible();
  },
};

export const MissingRestaurant: Story = {
  parameters: {
    initialRoute: '/restaurants/404',
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /we can't find this page/i })).toBeVisible();
    });

    await expect(canvas.getByText(/this page doesn’t exist, keep looking\./i)).toBeVisible();
  },
};

export const ServerError: Story = {
  parameters: {
    initialRoute: '/restaurants/500',
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /something went wrong!/i })).toBeVisible();
    });

    await expect(canvas.getByRole('button', { name: /try again/i })).toBeVisible();
  },
};
