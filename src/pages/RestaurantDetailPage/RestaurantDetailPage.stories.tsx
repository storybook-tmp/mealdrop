import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import preview from '#.storybook/preview'
import { expect, waitFor } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

// Helper to navigate before rendering the page
const RestaurantDetailPageRoute = () => {
  const navigate = useNavigate()
  React.useEffect(() => {
    navigate('/restaurants/1')
  }, [navigate])
  return (
    <>
      <div id="modal" />
      <Routes>
        <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
      </Routes>
    </>
  )
}

const meta = preview.meta({
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
})

export const Default = meta.story({
  render: () => <RestaurantDetailPageRoute />,
  play: async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText('Burger Kingdom')).toBeVisible(), {
      timeout: 5000,
    })
    await expect(canvas.getByText(/Nicest place for burgers/)).toBeVisible()
    await expect(canvas.getByText('To eat')).toBeVisible()
  },
})

export const WithMenu = meta.story({
  render: () => <RestaurantDetailPageRoute />,
  play: async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText('Burger Kingdom')).toBeVisible(), {
      timeout: 5000,
    })
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Dessert')).toBeVisible()
    await expect(canvas.getByText('To drink')).toBeVisible()
  },
})

export const Rating = meta.story({
  render: () => <RestaurantDetailPageRoute />,
  play: async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText('Burger Kingdom')).toBeVisible(), {
      timeout: 5000,
    })
    await expect(canvas.getByText(/4\.2 Very good/)).toBeVisible()
  },
})
