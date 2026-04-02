import { config } from '../../../../../.storybook/preview'

import { cartItems as stubCartItems } from '../../../../stub/cart-items'

import { FoodItemModal } from './FoodItemModal'

const burgerItem = {
  id: 1,
  name: 'Cheeseburger',
  description: 'Nice grilled burger with cheese',
  price: 8.5,
  quantity: 1,
}

const meta = config.meta({
  title: 'AI Generated/Complex/FoodItemModal',
  component: FoodItemModal,
  args: {
    item: burgerItem,
    cartItems: [],
    onClose: () => {},
    onItemSave: () => {},
    onItemRemove: () => {},
  },
})

export const NewItem = meta.story()

export const ExistingCartItem = meta.story({
  args: {
    cartItems: stubCartItems,
  },
})
