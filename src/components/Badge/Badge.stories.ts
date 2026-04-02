import { config } from '../../../.storybook/preview'

import { Badge } from './Badge'

const meta = config.meta({
  title: 'AI Generated/Simple/Badge',
  component: Badge,
  args: {
    text: 'comfort food',
  },
})

export const Default = meta.story()

export const ShortLabel = meta.story({
  args: {
    text: 'new',
  },
})
