import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { CategoryDetailPage } from './CategoryDetailPage';

const meta = {
  component: CategoryDetailPage,
} satisfies Meta<typeof CategoryDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PizzaResults: Story = {
  parameters: {
    router: {
      entries: ['/categories/pizza'],
      path: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /pizza/i })).toBeVisible();
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /kara fin/i })).toBeVisible();
      expect(canvas.getByRole('heading', { name: /ciao bella/i })).toBeVisible();
    });
    await expect(canvas.getByText('new')).toBeVisible();
  },
};

export const BurgerResults: Story = {
  parameters: {
    router: {
      entries: ['/categories/burgers'],
      path: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burgers/i })).toBeVisible();
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible();
      expect(canvas.getByRole('heading', { name: /kara fin/i })).toBeVisible();
    });
    await expect(canvas.queryByText('Specialties:')).not.toBeInTheDocument();
  },
};

export const EmptyState: Story = {
  parameters: {
    router: {
      entries: ['/categories/desserts'],
      path: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /desserts/i })).toBeVisible();
    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: /this is not the food you're looking for\./i })
      ).toBeVisible();
    });
    await expect(canvas.getByRole('img', { name: /no restaurants found/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /see all restaurants/i })).toBeVisible();
  },
};
