import preview from '../../../.storybook/preview'

import { Badge } from './Badge'

const meta = preview.meta({
  title: 'AI Generated/Simple/Badge',
  component: Badge,
})

export const Cuisine = meta.story({
  args: {
    text: 'Italian',
  },
})

export const Delivery = meta.story({
  args: {
    text: 'Fast delivery',
  },
})
