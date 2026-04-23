import type { Meta, StoryObj } from '@storybook/react-vite'

import { cartItems } from '../../stub/cart-items'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
} satisfies Meta<typeof RestaurantDetailPage>

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
      entry: '/restaurants/1',
      path: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
}
