import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Review } from './Review'

const meta = {
  component: Review,
  tags: ['ai-generated'],
} satisfies Meta<typeof Review>

export default meta
type Story = StoryObj<typeof meta>

export const NoReviews: Story = {
  args: {
    rating: undefined,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No reviews yet')).toBeVisible()
  },
}

export const Adequate: Story = {
  args: {
    rating: 3.2,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/3\.2/)).toBeVisible()
    await expect(canvas.getByText(/Adequate/)).toBeVisible()
  },
}

export const Excellent: Story = {
  args: {
    rating: 5.0,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/5\.0/)).toBeVisible()
    await expect(canvas.getByText(/Excellent/)).toBeVisible()
  },
}
