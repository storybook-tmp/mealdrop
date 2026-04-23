import { config } from '../../../.storybook/preview'

import { cartItems as stubCartItems } from '../../stub/cart-items'

import { HeaderComponent } from './Header'

const featuredCartItems = stubCartItems.slice(0, 2)
const featuredCartTotal = featuredCartItems.reduce((total, item) => total + item.price * item.quantity, 0)

const meta = config.meta({
  title: 'AI Generated/Complex/Header',
  component: HeaderComponent,
  args: {
    sticky: true,
    cartItems: featuredCartItems,
    totalPrice: featuredCartTotal,
    toggleCartVisibility: () => {},
    goToCheckout: () => {},
    saveItem: () => {},
  },
})

export const Default = meta.story()

export const WithOpenCart = meta.story({
  args: {
    isCartVisible: true,
  },
})
