import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

const meta = {
  title: 'AI Generated/Medium/Button',
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Order Now',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    disabled: true,
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Add to cart',
    icon: 'cart',
  },
}

export const Clear: Story = {
  args: {
    children: 'Cancel',
    clear: true,
  },
}
