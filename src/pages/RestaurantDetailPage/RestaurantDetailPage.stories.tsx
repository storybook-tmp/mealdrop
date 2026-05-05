import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { Routes, Route } from 'react-router-dom'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    routerInitialEntries: ['/restaurants/1'],
  },
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/restaurants/:id" element={<Story />} />
      </Routes>
    ),
  ],
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText('Burger Kingdom')).toBeVisible()
    })
    await expect(canvas.getByText(/nicest place for burgers/i)).toBeVisible()
    await expect(canvas.getByText(/★ 4.2/)).toBeVisible()
    await expect(canvas.getByText('To eat')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const WithDesserts: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText('Dessert')).toBeVisible()
    })
    await expect(canvas.getByText('Vanilla ice cream')).toBeVisible()
  },
}

export const WithDrinks: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText('To drink')).toBeVisible()
    })
    await expect(canvas.getByText('Coca-Cola')).toBeVisible()
    await expect(canvas.getByText('Fanta')).toBeVisible()
  },
}
