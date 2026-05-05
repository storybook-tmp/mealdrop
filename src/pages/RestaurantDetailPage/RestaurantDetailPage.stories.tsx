import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import preview from '#.storybook/preview'
import { expect, waitFor } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = preview.meta({
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
})

const NavigateAndRender = ({ to }: { to: string }) => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(to)
  }, [navigate, to])
  return (
    <Routes>
      <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
    </Routes>
  )
}

export const Default = meta.story({
  render: () => <NavigateAndRender to="/restaurants/1" />,
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Burger Palace')).toBeVisible()
      },
      { timeout: 5000 }
    )
    await expect(canvas.getByText(/Specialties:/)).toBeVisible()
  },
})
