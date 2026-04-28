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
  args: { text: 'burgers' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('burgers')).toBeVisible()
  },
}

export const Pizza: Story = {
  args: { text: 'pizza' },
}

export const Asian: Story = {
  args: { text: 'asian' },
}
