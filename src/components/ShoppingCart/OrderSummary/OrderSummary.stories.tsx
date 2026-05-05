import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { OrderSummary } from './OrderSummary'
import { cartItems } from '../../../stub/cart-items'

const meta = {
  component: OrderSummary,
  tags: ['ai-generated'],
} satisfies Meta<typeof OrderSummary>

export default meta
type Story = StoryObj<typeof meta>

export const WithItems: Story = {
  args: {
    cartItems,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Fries')).toBeVisible()
    await expect(canvas.getByText('Total')).toBeVisible()
  },
}

export const Empty: Story = {
  args: {
    cartItems: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByText('Your cart is empty.')).toBeVisible()
  },
}

export const SingleItem: Story = {
  args: {
    cartItems: [
      {
        id: 1,
        name: 'Cheeseburger',
        description: 'Nice grilled burger with cheese',
        price: 8.5,
        quantity: 2,
      },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Total')).toBeVisible()
  },
}
