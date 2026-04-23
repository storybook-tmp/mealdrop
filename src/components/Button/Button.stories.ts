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

export const Large: Story = {
  args: {
    children: 'Checkout',
    large: true,
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Cart',
    icon: 'cart',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Place order',
    disabled: true,
  },
}
