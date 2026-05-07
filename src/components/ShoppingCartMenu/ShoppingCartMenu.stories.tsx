import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import type { CartItem } from '../../app-state/cart'

import { ShoppingCartMenu } from './ShoppingCartMenu'

const cartItems: CartItem[] = [
  {
    id: 1,
    name: 'Cheeseburger',
    description: 'Nice grilled burger with cheese',
    price: 8.5,
    quantity: 2,
  },
  {
    id: 4,
    name: 'Coca-Cola',
    price: 1.75,
    quantity: 1,
  },
]

const meta = {
  component: ShoppingCartMenu,
  tags: ['ai-generated'],
  args: {
    onClose: () => {},
    onGoToCheckoutClick: () => {},
    onItemChange: () => {},
  },
} satisfies Meta<typeof ShoppingCartMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    totalPrice: 18.75,
    cartItems,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}

export const Empty: Story = {
  args: {
    isOpen: true,
    totalPrice: 0,
    cartItems: [],
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    totalPrice: 18.75,
    cartItems,
  },
}
