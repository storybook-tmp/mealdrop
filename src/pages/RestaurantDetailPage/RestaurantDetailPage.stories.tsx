import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

import { RestaurantDetailPage } from './RestaurantDetailPage';

const meta = {
  component: RestaurantDetailPage,
  parameters: {
    app: {
      routePath: '/restaurants/:id',
    },
  },
} satisfies Meta<typeof RestaurantDetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loaded: Story = {
  parameters: {
    app: {
      initialEntries: ['/restaurants/1'],
      routePath: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible();
    });

    await expect(canvas.getByText(/specialties: nicest place for burgers/i)).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /to eat/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /dessert/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /to drink/i })).toBeVisible();
  },
};

export const OpenFoodModal: Story = {
  parameters: {
    app: {
      initialEntries: ['/restaurants/1'],
      routePath: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible();
    });

    await userEvent.click(canvas.getByRole('heading', { name: /cheeseburger/i }));

    const page = within(canvasElement.ownerDocument.body);

    await waitFor(() => {
      expect(page.getByTestId('modal')).toBeVisible();
    });

    const modal = page.getByTestId('modal');

    await expect(within(modal).getByRole('heading', { name: /cheeseburger/i })).toBeVisible();
    await expect(within(modal).getByRole('button', { name: /confirm/i })).toHaveTextContent(
      /8[.,]50/
    );
  },
};

export const NotFound: Story = {
  parameters: {
    app: {
      initialEntries: ['/restaurants/404'],
      routePath: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /we can't find this page/i })).toBeVisible();
    });

    const errorBlock = canvas.getByRole('heading', { name: /we can't find this page/i }).parentElement;

    await expect(errorBlock).not.toBeNull();
    await expect(within(errorBlock!).getByRole('button', { name: /home/i })).toBeVisible();
  },
};

export const ServerError: Story = {
  parameters: {
    app: {
      initialEntries: ['/restaurants/500'],
      routePath: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /something went wrong!/i })).toBeVisible();
    });

    await expect(canvas.getByRole('button', { name: /try again/i })).toBeVisible();
  },
};
