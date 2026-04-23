import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
  render: () => <CategoryDetailPage />,
} satisfies Meta<typeof CategoryDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const Pizza: Story = {
  parameters: {
    route: '/categories/pizza',
    routePath: '/categories/:id',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /pizza/i })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /kara fin/i })).toBeVisible()
    })
    await expect(canvas.getAllByText(/categories/i).length).toBeGreaterThan(0)
  },
}

export const Burgers: Story = {
  parameters: {
    route: '/categories/burgers',
    routePath: '/categories/:id',
  },
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
    route: '/categories/desserts',
    routePath: '/categories/:id',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /desserts/i })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByText(/this is not the food you're looking for/i)).toBeVisible()
    })
    await expect(canvas.getByRole('button', { name: /see all restaurants/i })).toBeVisible()
  },
}
