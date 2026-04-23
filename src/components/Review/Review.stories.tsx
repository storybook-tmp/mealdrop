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
  render: () => <Review />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No reviews yet')).toBeVisible()
  },
}

export const VeryGood: Story = {
  render: () => <Review rating={4.2} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/4\.2/)).toBeVisible()
    await expect(canvas.getByText(/Very good/)).toBeVisible()
  },
}

export const Excellent: Story = {
  render: () => <Review rating={5} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/5\.0/)).toBeVisible()
    await expect(canvas.getByText(/Excellent/)).toBeVisible()
  },
}
