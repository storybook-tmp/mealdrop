import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { HomePage } from './HomePage'

const meta = {
  component: HomePage,
  tags: ['ai-generated'],
} satisfies Meta<typeof HomePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByTestId('header')).toBeVisible()
      },
      { timeout: 5000 }
    )
  },
}

export const WithLoadedRestaurants: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        const cards = canvas.queryAllByTestId('restaurant-card')
        expect(cards.length).toBeGreaterThan(0)
      },
      { timeout: 5000 }
    )
  },
}
