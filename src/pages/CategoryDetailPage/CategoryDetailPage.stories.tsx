import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
    app: {
      routePath: '/categories/:id',
    },
  },
} satisfies Meta<typeof CategoryDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Pizza: Story = {
  parameters: {
    app: {
      route: '/categories/pizza',
      routePath: '/categories/:id',
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /pizza/i })).toBeVisible()
    await expect(await canvas.findByRole('heading', { name: /kara fin/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /ciao bella/i })).toBeVisible()
  },
}

export const EmptyCategory: Story = {
  parameters: {
    app: {
      route: '/categories/desserts',
      routePath: '/categories/:id',
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /desserts/i })).toBeVisible()
    await expect(
      await canvas.findByRole('heading', { name: /this is not the food you're looking for/i })
    ).toBeVisible()
    await expect(canvas.getByRole('button', { name: /see all restaurants/i })).toBeVisible()
  },
}
