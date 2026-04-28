import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { Review } from './Review'

const meta = preview.meta({
  component: Review,
  tags: ['ai-generated'],
})

export const Excellent = meta.story({
  args: {
    rating: 5.0,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/★ 5.0 Excellent/)).toBeVisible()
  },
})

export const VeryGood = meta.story({
  args: {
    rating: 4.5,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/★ 4.5 Very good/)).toBeVisible()
  },
})

export const NoReviews = meta.story({
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No reviews yet')).toBeVisible()
  },
})
