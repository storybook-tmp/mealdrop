import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Badge } from './Badge'

const meta = {
  component: Badge,
  tags: ['ai-generated'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'pizza',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/pizza/i)).toBeVisible()
  },
}

export const LongText: Story = {
  args: {
    text: 'comfort-food',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/comfort-food/i)).toBeVisible()
  },
}

export const MultipleBadges: Story = {
  args: {
    text: 'burgers',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Badge text="burgers" />
      <Badge text="sushi" />
      <Badge text="pizza" />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/burgers/i)).toBeVisible()
    await expect(canvas.getByText(/sushi/i)).toBeVisible()
    await expect(canvas.getByText(/pizza/i)).toBeVisible()
  },
}
