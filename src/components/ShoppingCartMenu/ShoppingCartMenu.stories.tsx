import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { ShoppingCartMenu } from './ShoppingCartMenu'

const meta = {
  component: ShoppingCartMenu,
  tags: ['ai-generated'],
} satisfies Meta<typeof ShoppingCartMenu>

export default meta
type Story = StoryObj<typeof meta>

const cartItems = [
  {
    id: 1,
    name: 'Cheeseburger',
    description: 'Nice grilled burger with cheese',
    price: 8.5,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Fries',
    description: 'Fried french fries',
    price: 2.5,
    quantity: 1,
  },
]

export const Open: Story = {
  args: {
    isOpen: true,
    cartItems,
    totalPrice: 19.5,
    onClose: () => {},
    onGoToCheckoutClick: () => {},
    onItemChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const Empty: Story = {
  args: {
    isOpen: true,
    cartItems: [],
    totalPrice: 0,
    onClose: () => {},
    onGoToCheckoutClick: () => {},
    onItemChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled()
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    cartItems,
    totalPrice: 19.5,
    onClose: () => {},
    onGoToCheckoutClick: () => {},
    onItemChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByTestId('sidebar')).toBeNull()
  },
}
