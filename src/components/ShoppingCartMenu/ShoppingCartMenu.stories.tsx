import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { ShoppingCartMenu } from './ShoppingCartMenu'

const meta = {
  component: ShoppingCartMenu,
  args: {
    isOpen: false,
    totalPrice: 0,
    onClose: () => {},
    cartItems: [],
    onItemChange: () => {},
  },
} satisfies Meta<typeof ShoppingCartMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Closed: Story = {
  render: () => (
    <ShoppingCartMenu
      isOpen={false}
      totalPrice={0}
      onClose={() => {}}
      cartItems={[]}
      onItemChange={() => {}}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.queryByTestId('sidebar')).toBeNull()
  },
}

export const EmptyOpen: Story = {
  render: () => (
    <ShoppingCartMenu
      isOpen
      totalPrice={0}
      onClose={() => {}}
      cartItems={[]}
      onItemChange={() => {}}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled()
  },
}

export const WithItems: Story = {
  render: () => (
    <ShoppingCartMenu
      isOpen
      totalPrice={11}
      onClose={() => {}}
      cartItems={cartItems.slice(0, 2)}
      onItemChange={() => {}}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Fries')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}
