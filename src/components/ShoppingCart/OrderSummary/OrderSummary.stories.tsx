import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../../stub/cart-items'

import { OrderSummary } from './OrderSummary'

const meta = {
  component: OrderSummary,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof OrderSummary>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    cartItems: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible()
    await expect(canvas.getByText(/your cart is empty/i)).toBeVisible()
  },
}

export const WithItems: Story = {
  args: {
    cartItems: cartItems.slice(0, 3),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Fries')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText(/€13/)).toBeVisible()
  },
}
