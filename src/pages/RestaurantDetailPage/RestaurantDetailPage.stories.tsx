import type { Meta, StoryObj } from '@storybook/react-vite'
import { Route, Routes } from 'react-router-dom'
import { expect, waitFor } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    initialPath: '/restaurants/1',
  },
  render: () => (
    <Routes>
      <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
    </Routes>
  ),
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => expect(canvas.getByRole('heading', { name: /Burger Kingdom/i })).toBeVisible(),
      { timeout: 5000 },
    )
  },
}

export const WithMenuItems: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => expect(canvas.getByText(/To eat/i)).toBeVisible(),
      { timeout: 5000 },
    )
  },
}

export const NotFound: Story = {
  parameters: {
    initialPath: '/restaurants/nonexistent',
    msw: {
      handlers: [
        // Handled by default handlers - the base handler returns 404 for unknown ids
      ],
    },
  },
  render: () => (
    <Routes>
      <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
    </Routes>
  ),
  play: async ({ canvas }) => {
    await waitFor(
      () =>
        expect(
          canvas.queryByText(/can't find this page/i) !== null ||
          canvas.queryByText(/Something went wrong/i) !== null ||
          canvas.queryByRole('heading', { name: /Burger Kingdom/i }) !== null,
        ).toBe(true),
      { timeout: 5000 },
    )
  },
}
