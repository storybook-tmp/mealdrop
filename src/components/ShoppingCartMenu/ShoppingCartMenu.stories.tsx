import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { ShoppingCartMenu } from './ShoppingCartMenu'

const onQuantityChange = fn()

const meta = {
  component: ShoppingCartMenu,
  tags: ['ai-generated'],
} satisfies Meta<typeof ShoppingCartMenu>

export default meta
type Story = StoryObj<typeof meta>

export const OpenWithItems: Story = {
  args: {
    isOpen: true,
    cartItems,
    totalPrice: 17.75,
    onClose: fn(),
    onGoToCheckoutClick: fn(),
    onItemChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible()
    await expect(canvas.getByText('Fries')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}

export const Empty: Story = {
  args: {
    isOpen: true,
    cartItems: [],
    totalPrice: 0,
    onClose: fn(),
    onGoToCheckoutClick: fn(),
    onItemChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled()
  },
}

export const QuantityChange: Story = {
  args: {
    isOpen: true,
    cartItems: cartItems.slice(0, 1),
    totalPrice: 2.5,
    onClose: fn(),
    onGoToCheckoutClick: fn(),
    onItemChange: onQuantityChange,
  },
  play: async ({ canvas, userEvent }) => {
    const quantity = canvas.getByLabelText(/1 times/i)

    await userEvent.selectOptions(quantity, '2')
    await expect(onQuantityChange).toHaveBeenCalledWith({ ...cartItems[0], quantity: 2 })
  },
}
