import type { Meta, StoryObj } from '@storybook/react-vite'

import { ShoppingCartMenu } from './ShoppingCartMenu'

const meta = {
  title: 'AI Generated/Complex/ShoppingCartMenu',
  component: ShoppingCartMenu,
} satisfies Meta<typeof ShoppingCartMenu>

export default meta
type Story = StoryObj<typeof meta>

export const WithItems: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onItemChange: () => {},
    totalPrice: 2450,
    cartItems: [
      {
        id: 1,
        name: 'Margherita Pizza',
        price: 850,
        quantity: 2,
        description: 'Classic tomato and mozzarella',
      },
      {
        id: 2,
        name: 'Caesar Salad',
        price: 750,
        quantity: 1,
        description: 'Fresh romaine with parmesan',
      },
    ],
  },
}

export const EmptyCart: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onItemChange: () => {},
    totalPrice: 0,
    cartItems: [],
  },
}
