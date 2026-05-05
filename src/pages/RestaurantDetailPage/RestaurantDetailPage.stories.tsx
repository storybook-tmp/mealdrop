import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { Routes, Route, Navigate } from 'react-router-dom'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  decorators: [
    () => (
      <Routes>
        <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
        <Route path="*" element={<Navigate to="/restaurants/1" replace />} />
      </Routes>
    ),
  ],
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Burger Kingdom')).toBeVisible()
      },
      { timeout: 5000 }
    )
    await expect(canvas.getByText(/Nicest place for burgers/)).toBeVisible()
    await expect(canvas.getByText('To eat')).toBeVisible()
    await expect(canvas.getByText('Dessert')).toBeVisible()
    await expect(canvas.getByText('To drink')).toBeVisible()
  },
}
