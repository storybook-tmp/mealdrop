import { fn } from 'storybook/test'

import preview from '../../../.storybook/preview'

import { ShoppingCartMenu } from './ShoppingCartMenu'

const cartItems = [
  {
    id: 1,
    name: 'Salmon roll',
    description: 'Fresh salmon, avocado, cucumber, and sesame.',
    price: 12.5,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Miso soup',
    description: 'Classic miso broth with tofu and spring onion.',
    price: 5.25,
    quantity: 1,
  },
]

const meta = preview.meta({
  title: 'AI Generated/Complex/ShoppingCartMenu',
  component: ShoppingCartMenu,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    cartItems,
    isOpen: true,
    onClose: fn(),
    onGoToCheckoutClick: fn(),
    onItemChange: fn(),
    totalPrice: 30.25,
  },
})

export const FilledCart = meta.story()

export const EmptyCart = meta.story({
  args: {
    cartItems: [],
    totalPrice: 0,
  },
})
