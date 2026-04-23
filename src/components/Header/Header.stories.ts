import type { Meta, StoryObj } from '@storybook/react'
import { HeaderComponent } from './Header'

const meta = {
  title: 'AI Generated/Medium/Header',
  component: HeaderComponent,
} satisfies Meta<typeof HeaderComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isCartVisible: false,
    cartItems: [],
    totalPrice: 0,
    logoOnly: false,
    sticky: false,
    toggleCartVisibility: () => {},
    goToCheckout: () => {},
    saveItem: () => {},
  },
}

export const WithCartItems: Story = {
  args: {
    isCartVisible: false,
    cartItems: [{ id: '1', name: 'Pizza', price: 10.99, quantity: 2 } as any],
    totalPrice: 21.98,
    logoOnly: false,
    sticky: false,
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
