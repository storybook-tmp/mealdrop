import { config } from '../../../.storybook/preview'

import { Logo } from './Logo'

const meta = config.meta({
  title: 'AI Generated/Simple/Logo',
  component: Logo,
})

export const Default = meta.story()

export const LargeAnimated = meta.story({
  args: {
    large: true,
    animated: true,
  },
})
