import type { Meta, StoryObj } from '@storybook/react-vite'

import { cartItems } from '../../../stub/cart-items'
import { OrderSummary } from './OrderSummary'

const meta = {
  component: OrderSummary,
  tags: ['ai-generated'],
} satisfies Meta<typeof OrderSummary>

export default meta
type Story = StoryObj<typeof meta>

export const FilledCart: Story = {
  args: {
    cartItems,
  },
}

export const OneItem: Story = {
  args: {
    cartItems: [cartItems[0]],
  },
}

export const EmptyCart: Story = {
  args: {
    cartItems: [],
  },
}
