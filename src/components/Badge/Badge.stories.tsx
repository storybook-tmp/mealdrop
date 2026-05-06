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

export const ShortText: Story = {
  args: {
    text: 'new',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('new')).toBeVisible()
  },
}
