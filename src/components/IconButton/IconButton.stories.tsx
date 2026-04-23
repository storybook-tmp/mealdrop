import type { Meta, StoryObj } from '@storybook/react'

import { IconButton } from './IconButton'

const meta = {
  title: 'AI Generated/Simple/IconButton',
  component: IconButton,
  args: {
    name: 'cart',
  },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SmallCloseButton: Story = {
  args: {
    name: 'cross',
    small: true,
    'aria-label': 'Close',
  },
}
