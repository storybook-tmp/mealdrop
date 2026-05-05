import React, { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const NavigateTo = ({ path }: { path: string }) => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(path)
  }, [path, navigate])
  return null
}

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <>
        <NavigateTo path="/restaurants/1" />
        <Routes>
          <Route path="/restaurants/:id" element={<Story />} />
        </Routes>
      </>
    ),
  ],
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText('Burger Kingdom')).toBeVisible()
      },
      { timeout: 5000 }
    )
  },
}
