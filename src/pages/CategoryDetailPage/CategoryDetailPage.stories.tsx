import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
  parameters: {
    app: {
      route: {
        initialEntry: '/categories/pizza',
        path: '/categories/:id',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CategoryDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const PizzaResults: Story = {
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /pizza/i })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /ciao bella/i })).toBeVisible()
    })
    await expect(canvas.getByRole('heading', { name: /kara fin/i })).toBeVisible()
  },
}

export const BurgersResults: Story = {
  parameters: {
    app: {
      route: {
        initialEntry: '/categories/burgers',
        path: '/categories/:id',
      },
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burgers/i })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })
    await expect(canvas.getByRole('heading', { name: /kara fin/i })).toBeVisible()
  },
}

export const EmptyCategory: Story = {
  parameters: {
    app: {
      route: {
        initialEntry: '/categories/comfort-food',
        path: '/categories/:id',
      },
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /comfort food/i })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByText(/this is not the food you're looking for/i)).toBeVisible()
    })
    await expect(canvas.getByRole('button', { name: /see all restaurants/i })).toBeVisible()
  },
}
