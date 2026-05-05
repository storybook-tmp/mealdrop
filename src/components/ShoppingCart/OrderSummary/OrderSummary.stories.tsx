import type { Meta, StoryObj } from '@storybook/react'

import { OrderSummary } from './OrderSummary'

const meta = {
  title: 'AI Generated/Complex/OrderSummary',
  component: OrderSummary,
} satisfies Meta<typeof OrderSummary>

export default meta
type Story = StoryObj<typeof meta>

export const WithItems: Story = {
  args: {
    cartItems: [
      { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 2 },
      { id: 2, name: 'Tiramisu', price: 6.5, quantity: 1 },
    ],
  },
}

export const Empty: Story = {
  args: {
    cartItems: [],
  },
}
