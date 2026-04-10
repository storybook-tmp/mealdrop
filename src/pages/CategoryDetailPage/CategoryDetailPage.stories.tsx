import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CategoryDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const PizzaResults: Story = {
  parameters: {
    app: {
      route: '/categories/pizza',
      routePath: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Pizza' })).toBeVisible()
    await waitFor(() => expect(canvas.getByText('Ciao Bella')).toBeVisible())
    await expect(canvas.getByText('Kara Fin')).toBeVisible()
    await expect(canvas.getByText('Takeaway lasagna')).toBeVisible()
  },
}

export const EmptyDesserts: Story = {
  parameters: {
    app: {
      route: '/categories/desserts',
      routePath: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Desserts' })).toBeVisible()
    await waitFor(() =>
      expect(canvas.getByText("This is not the food you're looking for.")).toBeVisible()
    )
    await expect(canvas.getByRole('button', { name: 'See all restaurants' })).toBeVisible()
  },
}

export const ComfortFoodResults: Story = {
  parameters: {
    app: {
      route: '/categories/comfort-food',
      routePath: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Comfort food' })).toBeVisible()
    await waitFor(() => expect(canvas.getByText("'t Kuyltje")).toBeVisible())
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible()
    await expect(canvas.getByText('This restaurant is closed.')).toBeVisible()
  },
}
