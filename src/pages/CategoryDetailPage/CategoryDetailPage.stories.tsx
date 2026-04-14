import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { CategoryDetailPage } from './CategoryDetailPage';

const meta = {
  component: CategoryDetailPage,
  parameters: {
    app: {
      routePath: '/categories/:id',
    },
  },
} satisfies Meta<typeof CategoryDetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Burgers: Story = {
  parameters: {
    app: {
      initialEntries: ['/categories/burgers'],
      routePath: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burgers/i })).toBeVisible();

    await waitFor(() => {
      expect(canvas.getByText(/burger kingdom/i)).toBeVisible();
    });

    await expect(canvas.getByText(/nicest place for burgers/i)).toBeVisible();
  },
};

export const Pizza: Story = {
  parameters: {
    app: {
      initialEntries: ['/categories/pizza'],
      routePath: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /pizza/i })).toBeVisible();

    await waitFor(() => {
      expect(canvas.getByText(/ciao bella/i)).toBeVisible();
    });

    await expect(canvas.getByText(/kara fin/i)).toBeVisible();
  },
};

export const EmptyCategory: Story = {
  parameters: {
    app: {
      initialEntries: ['/categories/desserts'],
      routePath: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /this is not the food you're looking for/i })).toBeVisible();
    });

    await userEvent.click(canvas.getByRole('button', { name: /see all restaurants/i }));

    await waitFor(() => {
      expect(canvas.getByTestId('storybook-location')).toHaveTextContent('/categories');
    });
  },
};
