import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { ShoppingCartMenu } from './ShoppingCartMenu'

const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

const meta = {
  title: 'AI Generated/Complex/ShoppingCartMenu',
  component: ShoppingCartMenu,
  args: {
    isOpen: true,
    cartItems,
    totalPrice,
    onClose: fn(),
    onGoToCheckoutClick: fn(),
    onItemChange: fn(),
  },
} satisfies Meta<typeof ShoppingCartMenu>

export default meta

type Story = StoryObj<typeof meta>

export const FilledCart: Story = {}

export const EmptyCart: Story = {
  args: {
    cartItems: [],
    totalPrice: 0,
  },
}
