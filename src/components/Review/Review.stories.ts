import { config } from '../../../.storybook/preview'

import { Review } from './Review'

const meta = config.meta({
  title: 'AI Generated/Simple/Review',
  component: Review,
})

export const EmptyState = meta.story({
  args: {
    rating: undefined,
  },
})

export const Excellent = meta.story({
  args: {
    rating: 5,
  },
})
