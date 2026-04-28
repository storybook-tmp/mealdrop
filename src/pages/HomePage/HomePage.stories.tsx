import preview from '#.storybook/preview'
import { expect, waitFor } from 'storybook/test'

import { HomePage } from './HomePage'

const meta = preview.meta({
  component: HomePage,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
})

export const Default = meta.story({
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Hungry/)).toBeVisible()
    await expect(canvas.getByText('View all restaurants')).toBeVisible()
  },
})

export const WithRestaurants = meta.story({
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Our favorite picks')).toBeVisible()
    await waitFor(
      () => expect(canvas.getByText('Burger Kingdom')).toBeVisible(),
      { timeout: 5000 }
    )
  },
})

export const WithCategories = meta.story({
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Hungry/)).toBeVisible()
    await expect(canvas.getByTestId('Pizza')).toBeVisible()
    await expect(canvas.getByTestId('Burgers')).toBeVisible()
  },
})
