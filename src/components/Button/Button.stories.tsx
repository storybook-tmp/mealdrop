import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Button } from './Button'

const meta = {
  component: Button,
  tags: ['ai-generated'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => <Button>Order now</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Order now' })
    await expect(button).toBeVisible()
    await expect(button).not.toBeDisabled()
  },
}

export const Clear: Story = {
  render: () => <Button clear>Home</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Home' })
    await expect(button).toBeVisible()
    await expect(button).not.toBeDisabled()
  },
}

export const Disabled: Story = {
  render: () => <Button disabled>Checkout</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Checkout' })
    await expect(button).toBeVisible()
    await expect(button).toBeDisabled()
  },
}

export const WithIcon: Story = {
  render: () => <Button icon="cart">Cart</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /cart/i })
    await expect(button).toBeVisible()
  },
}

export const Large: Story = {
  render: () => <Button large>Place order</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Place order' })
    await expect(button).toBeVisible()
  },
}
