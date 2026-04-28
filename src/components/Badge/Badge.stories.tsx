import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './Badge'

const meta = {
  component: Badge,
  tags: ['ai-generated'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { text: 'burgers' },
}

export const Pizza: Story = {
  args: { text: 'pizza' },
}

export const LongLabel: Story = {
  args: { text: 'comfort food' },
}
