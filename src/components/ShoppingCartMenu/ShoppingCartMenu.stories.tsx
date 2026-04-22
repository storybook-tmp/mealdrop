import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { ShoppingCartMenu } from './ShoppingCartMenu'

const meta = {
  component: ShoppingCartMenu,
  tags: ['ai-generated'],
} satisfies Meta<typeof ShoppingCartMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    cartItems,
    totalPrice: 17.75,
    onClose: () => {},
    onItemChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Fries')).toBeVisible()
  },
}

export const Empty: Story = {
  args: {
    isOpen: true,
    cartItems: [],
    totalPrice: 0,
    onClose: () => {},
    onItemChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Checkout' })).toBeDisabled()
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    cartItems,
    totalPrice: 17.75,
    onClose: () => {},
    onItemChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByTestId('sidebar')).toBeNull()
  },
}
