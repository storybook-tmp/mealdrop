import preview from '../../../.storybook/preview'

import { Review } from './Review'

const meta = preview.meta({
  title: 'AI Generated/Simple/Review',
  component: Review,
})

export const Excellent = meta.story({
  args: {
    rating: 5,
  },
})

export const NoReviews = meta.story({
  args: {},
})
