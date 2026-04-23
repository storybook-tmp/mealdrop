import type { Meta, StoryObj } from '@storybook/react-vite'

import { cartItems } from '../../stub/cart-items'

import { CheckoutPage } from './CheckoutPage'

const meta = {
  component: CheckoutPage,
} satisfies Meta<typeof CheckoutPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    appState: {
      cart: {
        items: cartItems,
      },
    },
    route: {
      entry: '/checkout',
      path: '/checkout',
    },
  },
  render: () => <CheckoutPage />,
}
