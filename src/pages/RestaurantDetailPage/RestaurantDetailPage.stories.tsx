import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    routePath: '/restaurants/:id',
    routeEntry: '/restaurants/1',
  },
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger palace/i })).toBeVisible()
    })
    await expect(canvas.getByText(/gourmet burgers/i)).toBeVisible()
  },
}

export const MenuItems: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText('Classic Burger')).toBeVisible()
    })
    await expect(canvas.getByText('Bacon Burger')).toBeVisible()
    await expect(canvas.getByText('Milkshake')).toBeVisible()
  },
}

export const Categories: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText('burgers')).toBeVisible()
    })
    await expect(canvas.getByText('comfort-food')).toBeVisible()
  },
}
