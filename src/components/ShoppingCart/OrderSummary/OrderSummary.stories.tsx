import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../../stub/cart-items'
import { toCurrency } from '../../../helpers'

import { OrderSummary } from './OrderSummary'

const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

const meta = {
  component: OrderSummary,
} satisfies Meta<typeof OrderSummary>

export default meta
type Story = StoryObj<typeof meta>

export const WithItems: Story = {
  args: {
    cartItems,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible()
    await expect(canvas.getByText(/cheeseburger/i)).toBeVisible()
    await expect(canvas.getByText(toCurrency(cartTotal))).toBeVisible()
  },
}

export const Empty: Story = {
  args: {
    cartItems: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/your cart is empty/i)).toBeVisible()
    await expect(canvas.getByText(toCurrency(0))).toBeVisible()
  },
}

export const SingleItem: Story = {
  args: {
    cartItems: [cartItems[0]],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/fries/i)).toBeVisible()
    await expect(canvas.getAllByText(toCurrency(cartItems[0].price))).toHaveLength(2)
  },
}
