import { Route, Routes } from 'react-router-dom'

import preview from '#.storybook/preview'
import { expect, waitFor } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = preview.meta({
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
    initialEntries: ['/restaurants/1'],
  },
  decorators: [
    (Story) => (
      <>
        <div id="modal" />
        <Routes>
          <Route path="/restaurants/:id" element={<Story />} />
        </Routes>
      </>
    ),
  ],
})

export const Default = meta.story({
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Burger Palace')).toBeVisible()
      },
      { timeout: 5000 }
    )
    await expect(canvas.getByText(/Burgers, Fries, Shakes/)).toBeVisible()
  },
})

export const WithMenuSections = meta.story({
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('To eat')).toBeVisible()
      },
      { timeout: 5000 }
    )
    await expect(canvas.getByText('Dessert')).toBeVisible()
    await expect(canvas.getByText('To drink')).toBeVisible()
  },
})
