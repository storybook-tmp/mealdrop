import type { Meta, StoryObj } from '@storybook/react'

import { HeaderComponent } from './Header'
import type { CartItem } from '../../app-state/cart'

const sampleCartItems: CartItem[] = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 2 },
  { id: 2, name: 'Caesar Salad', price: 8.5, quantity: 1 },
]

const meta = {
  title: 'AI Generated/Complex/Header',
  component: HeaderComponent,
} satisfies Meta<typeof HeaderComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    logoOnly: false,
    sticky: false,
    isCartVisible: false,
    cartItems: [],
    totalPrice: 0,
    toggleCartVisibility: () => {},
    goToCheckout: () => {},
    saveItem: () => {},
  },
}

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
}

export const WithCartItems: Story = {
  args: {
    isCartVisible: false,
    cartItems: sampleCartItems,
    totalPrice: 34.48,
    toggleCartVisibility: () => {},
    goToCheckout: () => {},
    saveItem: () => {},
  },
}
