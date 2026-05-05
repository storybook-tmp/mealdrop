import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
} satisfies Meta<typeof CategoryDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Burgers: Story = {
  parameters: {
    appRoute: {
      initialEntry: '/categories/burgers',
      path: '/categories/:id',
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burgers/i })).toBeVisible()

    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })

    await expect(canvas.getByRole('heading', { name: /kara fin/i })).toBeVisible()
  },
}

export const NoRestaurants: Story = {
  parameters: {
    appRoute: {
      initialEntry: '/categories/desserts',
      path: '/categories/:id',
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /desserts/i })).toBeVisible()

    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: /this is not the food you're looking for/i })
      ).toBeVisible()
    })

    await expect(canvas.getByRole('button', { name: /see all restaurants/i })).toBeVisible()
  },
}
