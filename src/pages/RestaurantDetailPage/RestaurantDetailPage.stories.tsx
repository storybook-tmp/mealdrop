import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { restaurantsCompleteData } from '../../stub/restaurants';

import { RestaurantDetailPage } from './RestaurantDetailPage';

const burger = restaurantsCompleteData[0].menu.food[0];

const meta = {
  component: RestaurantDetailPage,
} satisfies Meta<typeof RestaurantDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {
  parameters: {
    router: {
      entries: ['/restaurants/1'],
      path: '/restaurants/:id',
    },
    storeState: {
      cart: {
        items: [{ ...burger, quantity: 2 }],
      },
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const doc = canvasElement.ownerDocument;

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible();
    });
    await expect(canvas.getByText(/specialties: nicest place for burgers/i)).toBeVisible();
    await userEvent.click(canvas.getByRole('heading', { name: /cheeseburger/i }));
    await waitFor(() => {
      expect(doc.querySelector('[data-testid="modal"]')).toBeVisible();
    });
    await expect(doc.querySelector('[data-testid="modal"]')).toHaveTextContent('Cheeseburger');
    await expect(doc.querySelector('[data-testid="modal"]')).toHaveTextContent('2');
    await userEvent.click(doc.querySelector('[aria-label="increase quantity by one"]')!);
    await userEvent.click(doc.querySelector('[aria-label="confirm"]')!);
    await waitFor(() => {
      expect(doc.querySelector('[data-testid="modal"]')).toBeNull();
    });
    await expect(canvas.getByLabelText('food quantity')).toHaveTextContent('3');
  },
};

export const ServerError: Story = {
  parameters: {
    router: {
      entries: ['/restaurants/error'],
      path: '/restaurants/:id',
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

export const NotFound: Story = {
  parameters: {
    router: {
      entries: ['/restaurants/does-not-exist'],
      path: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /we can't find this page/i })).toBeVisible();
    });
    await expect(canvas.getAllByRole('button', { name: /home/i })).toHaveLength(2);
  },
};
