import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { IconButton } from './IconButton'

const meta = {
  component: IconButton,
  tags: ['ai-generated'],
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Cart: Story = {
  args: {
    name: 'cart',
    'aria-label': 'open cart',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /open cart/i })).toHaveAttribute(
      'type',
      'button'
    )
  },
}

export const SmallBack: Story = {
  args: {
    name: 'arrow-left',
    small: true,
    'aria-label': 'go back',
  },
}

export const Close: Story = {
  args: {
    name: 'cross',
    'aria-label': 'close panel',
  },
}
