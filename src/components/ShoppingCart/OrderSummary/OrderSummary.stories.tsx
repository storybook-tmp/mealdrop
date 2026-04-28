import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { OrderSummary } from './OrderSummary'

const meta = preview.meta({
  component: OrderSummary,
  tags: ['ai-generated'],
})

export const Empty = meta.story({
  args: {
    cartItems: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByText('Your cart is empty.')).toBeVisible()
  },
})

export const WithItems = meta.story({
  args: {
    cartItems: [
      { id: 1, name: 'Classic Burger', price: 9.99, quantity: 2 },
      { id: 2, name: 'Milkshake', price: 5.99, quantity: 1 },
      { id: 3, name: 'Cheese Burger', price: 11.99, quantity: 1 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByText('Classic Burger')).toBeVisible()
    await expect(canvas.getByText('Milkshake')).toBeVisible()
    await expect(canvas.getByText('Total')).toBeVisible()
  },
})

export const SingleItem = meta.story({
  args: {
    cartItems: [{ id: 1, name: 'Margherita', price: 10.99, quantity: 1 }],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Margherita')).toBeVisible()
    await expect(canvas.getByText('Your order')).toBeVisible()
  },
})
