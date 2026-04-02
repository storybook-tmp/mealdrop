import type { Meta, StoryObj } from '@storybook/react'

import type { CartItem } from '../../app-state/cart'
import { ShoppingCartMenu } from './ShoppingCartMenu'

const cartItems: CartItem[] = [
  {
    id: 1,
    name: 'Spicy tuna roll',
    description: 'Fresh tuna, cucumber, chili mayo.',
    price: 12.5,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Miso soup',
    description: 'Classic broth with tofu and spring onion.',
    price: 4.25,
    quantity: 1,
  },
]

const meta = {
  title: 'AI Generated/Complex/ShoppingCartMenu',
  component: ShoppingCartMenu,
  args: {
    isOpen: true,
    onClose: () => undefined,
    onGoToCheckoutClick: () => undefined,
    onItemChange: () => undefined,
    cartItems,
    totalPrice: 29.25,
  },
} satisfies Meta<typeof ShoppingCartMenu>

export default meta

type Story = StoryObj<typeof meta>

export const WithItems: Story = {}

export const EmptyCart: Story = {
  args: {
    cartItems: [],
    totalPrice: 0,
  },
}
