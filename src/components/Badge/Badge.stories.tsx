import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './Badge'

const meta = {
  title: 'AI Generated/Simple/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  args: {
    text: 'comfort food',
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Seasonal: Story = {
  args: {
    text: 'seasonal special',
  },
}
