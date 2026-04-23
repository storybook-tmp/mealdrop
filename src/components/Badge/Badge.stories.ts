import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'AI Generated/Simple/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'New',
  },
}

export const Popular: Story = {
  args: {
    text: 'Popular',
  },
}
