import { fn } from 'storybook/test'

import preview from '../../../.storybook/preview'

import { IconButton } from './IconButton'

const meta = preview.meta({
  title: 'AI Generated/Simple/IconButton',
  component: IconButton,
  args: {
    onClick: fn(),
  },
})

export const Default = meta.story({
  args: {
    name: 'arrow-right',
    'aria-label': 'Go to next step',
  },
})

export const Compact = meta.story({
  args: {
    name: 'cross',
    small: true,
    'aria-label': 'Close menu',
  },
})
