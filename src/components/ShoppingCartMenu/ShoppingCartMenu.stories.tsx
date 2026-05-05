import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { ShoppingCartMenu } from './ShoppingCartMenu'

const cartItems = [
  { id: 1, name: 'Cheeseburger', description: 'Nice grilled burger with cheese', price: 8.5, quantity: 2 },
  { id: 2, name: 'Fries', description: 'Fried french fries', price: 2.5, quantity: 1 },
]

const meta = {
  component: ShoppingCartMenu,
  tags: ['ai-generated'],
  args: {
    isOpen: false,
    totalPrice: 0,
    cartItems: [],
    onClose: () => {},
    onItemChange: () => {},
  },
} satisfies Meta<typeof ShoppingCartMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  render: () => (
    <ShoppingCartMenu
      isOpen
      totalPrice={19.5}
      cartItems={cartItems}
      onClose={() => {}}
      onItemChange={() => {}}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Fries')).toBeVisible()
  },
}

export const Empty: Story = {
  render: () => (
    <ShoppingCartMenu
      isOpen
      totalPrice={0}
      cartItems={[]}
      onClose={() => {}}
      onItemChange={() => {}}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Your order')).toBeVisible()
    const checkoutButton = canvas.getByRole('button', { name: 'Checkout' })
    await expect(checkoutButton).toBeDisabled()
  },
}

export const Closed: Story = {
  render: () => (
    <ShoppingCartMenu
      isOpen={false}
      totalPrice={0}
      cartItems={[]}
      onClose={() => {}}
      onItemChange={() => {}}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.queryByTestId('sidebar')).not.toBeInTheDocument()
  },
}
