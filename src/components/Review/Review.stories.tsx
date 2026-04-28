import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Review } from './Review'

const meta = {
  component: Review,
  tags: ['ai-generated'],
} satisfies Meta<typeof Review>

export default meta
type Story = StoryObj<typeof meta>

export const NoRating: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/no reviews yet/i)).toBeVisible()
  },
}

export const VeryGood: Story = { args: { rating: 4.2 } }
export const Adequate: Story = { args: { rating: 3.0 } }
export const Excellent: Story = { args: { rating: 5.0 } }
