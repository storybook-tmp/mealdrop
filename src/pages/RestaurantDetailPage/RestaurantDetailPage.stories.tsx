import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { waitFor, expect } from 'storybook/test'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    routerOverride: true,
  },
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/restaurants/1']}>
        <Routes>
          <Route path="/restaurants/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /saigon bistro/i })).toBeVisible()
    })
    await expect(canvas.getByRole('heading', { name: /spring rolls/i })).toBeVisible()
  },
}

export const NotFound: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/restaurants/999']}>
        <Routes>
          <Route path="/restaurants/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText(/we can't find this page/i)).toBeVisible()
    })
  },
}
