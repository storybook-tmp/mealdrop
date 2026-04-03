import { fn } from 'storybook/test'

import preview from '../../../../../.storybook/preview'

import { FoodItemModal } from './FoodItemModal'

const spicyTunaRoll = {
  id: 7,
  name: 'Spicy tuna roll',
  description: 'Tuna, cucumber, chili mayo, and crispy shallots.',
  price: 13.75,
  quantity: 1,
}

const meta = preview.meta({
  title: 'AI Generated/Complex/FoodItemModal',
  component: FoodItemModal,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    cartItems: [],
    item: spicyTunaRoll,
    onClose: fn(),
    onItemRemove: fn(),
    onItemSave: fn(),
  },
})

export const NewItem = meta.story()

export const ExistingSelection = meta.story({
  args: {
    cartItems: [
      {
        ...spicyTunaRoll,
        quantity: 3,
      },
    ],
  },
})
