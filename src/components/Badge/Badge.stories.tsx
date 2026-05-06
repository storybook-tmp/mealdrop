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
    await expect(canvas.getByText('pizza')).toBeVisible()
  },
}

export const LongText: Story = {
  args: {
    text: 'comfort food',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('comfort food')).toBeVisible()
  },
}

export const Capitalized: Story = {
  args: {
    text: 'burgers',
  },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('burgers')
    await expect(badge).toBeVisible()
    await expect(getComputedStyle(badge.parentElement!).textTransform).toBe('capitalize')
  },
}
