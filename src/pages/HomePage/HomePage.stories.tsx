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
      async () => {
        const cards = canvas.getAllByTestId('restaurant-card')
        await expect(cards[0]).toBeVisible()
      },
      { timeout: 5000 }
    )
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [],
    },
  },
}
