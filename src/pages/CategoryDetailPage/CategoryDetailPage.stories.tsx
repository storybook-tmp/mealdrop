import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { CategoryDetailPage } from './CategoryDetailPage';

const meta = {
  component: CategoryDetailPage,
  parameters: {
    layout: 'fullscreen',
    routePath: '/categories/:id',
  },
} satisfies Meta<typeof CategoryDetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PizzaResults: Story = {
  parameters: {
    initialRoute: '/categories/pizza',
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /pizza/i })).toBeVisible();

    await waitFor(() => {
      expect(canvas.getAllByTestId('restaurant-card').length).toBeGreaterThan(0);
    });

    await expect(canvas.getByRole('heading', { name: /kara fin/i })).toBeVisible();
  },
};

export const EmptyDessertsCategory: Story = {
  parameters: {
    initialRoute: '/categories/desserts',
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /desserts/i })).toBeVisible();

    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: /this is not the food you're looking for/i })
      ).toBeVisible();
    });

    await expect(
      canvas.getByText(/there are no restaurants in this category yet/i)
    ).toBeVisible();
    await expect(canvas.getByRole('button', { name: /see all restaurants/i })).toBeVisible();
  },
};

export const ComfortFoodResults: Story = {
  parameters: {
    initialRoute: '/categories/comfort-food',
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /comfort food/i })).toBeVisible();

    await waitFor(() => {
      expect(canvas.getAllByTestId('restaurant-card').length).toBeGreaterThan(0);
    });

    await expect(canvas.getByRole('heading', { name: /de oliewinkel/i })).toBeVisible();
  },
};
