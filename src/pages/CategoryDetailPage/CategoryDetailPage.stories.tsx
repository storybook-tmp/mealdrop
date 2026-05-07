import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
  tags: ['ai-generated'],
} satisfies Meta<typeof CategoryDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Burgers: Story = {
  parameters: {
    route: {
      path: '/categories/:id',
      initialEntries: ['/categories/burgers'],
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burgers/i })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })
  },
}

export const EmptyCategory: Story = {
  parameters: {
    route: {
      path: '/categories/:id',
      initialEntries: ['/categories/desserts'],
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /desserts/i })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByText(/no restaurants in this category/i)).toBeVisible()
    })
  },
}
