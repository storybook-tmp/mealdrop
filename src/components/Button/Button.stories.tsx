import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './Button'

const meta = {
  title: 'AI Generated/Medium/Button',
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Order now',
  },
}

export const Clear: Story = {
  args: {
    children: 'Cancel',
    clear: true,
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Add to cart',
    icon: 'cart',
  },
}
