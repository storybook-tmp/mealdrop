import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Badge } from './Badge'

const meta = {
  component: Badge,
  tags: ['ai-generated'],
  args: {
    text: 'burgers',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Badge text="burgers" />,
  play: async ({ canvas }) => {
    const badge = canvas.getByText('burgers')
    await expect(badge).toBeVisible()
  },
}

export const ComfortFood: Story = {
  render: () => <Badge text="comfort food" />,
  play: async ({ canvas }) => {
    const badge = canvas.getByText('comfort food')
    await expect(badge).toBeVisible()
  },
}

export const Pizza: Story = {
  render: () => <Badge text="pizza" />,
  play: async ({ canvas }) => {
    const badge = canvas.getByText('pizza')
    await expect(badge).toBeVisible()
  },
}
