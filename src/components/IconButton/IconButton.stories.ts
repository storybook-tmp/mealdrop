import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { IconButton } from './IconButton'

const meta = {
  title: 'AI Generated/Simple/IconButton',
  component: IconButton,
  args: {
    name: 'cart',
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
  args: {
    name: 'plus',
    small: true,
  },
}
