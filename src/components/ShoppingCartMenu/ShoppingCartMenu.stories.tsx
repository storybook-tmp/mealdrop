import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { ShoppingCartMenu } from './ShoppingCartMenu'

const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

const meta = {
  title: 'AI Generated/Complex/ShoppingCartMenu',
  component: ShoppingCartMenu,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isOpen: true,
    onClose: fn(),
    onItemChange: fn(),
    onGoToCheckoutClick: fn(),
    cartItems,
    totalPrice,
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
