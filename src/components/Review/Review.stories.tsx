import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Review } from './Review'

const meta = {
  component: Review,
  tags: ['ai-generated'],
} satisfies Meta<typeof Review>

export default meta
type Story = StoryObj<typeof meta>

export const WithRating: Story = {
  args: {
    rating: 4.2,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/4\.2 very good/i)).toBeVisible()
  },
}

export const NoRating: Story = {
  args: {
    rating: undefined,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No reviews yet')).toBeVisible()
  },
}

export const Excellent: Story = {
  args: {
    rating: 5.0,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/excellent/i)).toBeVisible()
  },
}
