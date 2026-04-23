import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import type { CartItem } from '../../../../app-state/cart'

import { FoodItemModal } from './FoodItemModal'

const sampleItem: CartItem = {
  id: 42,
  name: 'Salmon poke bowl',
  description: 'Fresh salmon with avocado, edamame, and sesame rice.',
  price: 14.5,
  quantity: 1,
}

const meta = {
  title: 'AI Generated/Complex/FoodItemModal',
  component: FoodItemModal,
  args: {
    item: sampleItem,
    cartItems: [],
    onClose: fn(),
    onItemSave: fn(),
    onItemRemove: fn(),
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FoodItemModal>

export default meta

type Story = StoryObj<typeof meta>

export const NewItem: Story = {}

export const ExistingItemInCart: Story = {
  args: {
    cartItems: [
      {
        ...sampleItem,
        quantity: 3,
      },
    ],
  },
}
