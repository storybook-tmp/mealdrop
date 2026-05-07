import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { HeaderComponent } from './Header'

const meta = {
  component: HeaderComponent,
  tags: ['ai-generated'],
} satisfies Meta<typeof HeaderComponent>

export default meta
type Story = StoryObj<typeof meta>

export const EmptyCart: Story = {
  args: {
    toggleCartVisibility: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(/go to home page/i)).toBeVisible()
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
  },
}

export const WithCartTotal: Story = {
  args: {
    cartItems,
    totalPrice: 17.75,
    toggleCartVisibility: fn(),
    saveItem: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Order')).toBeVisible()
    await expect(canvas.getByText('€17.75')).toBeVisible()
  },
}

export const CartOpen: Story = {
  args: {
    cartItems,
    isCartVisible: true,
    totalPrice: 17.75,
    toggleCartVisibility: fn(),
    goToCheckout: fn(),
    saveItem: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(/go to home page/i)).toBeVisible()
    await expect(canvas.queryByRole('button', { name: /food cart/i })).not.toBeInTheDocument()
  },
}
