import type { Meta, StoryObj } from '@storybook/react-vite'

import { cartItems } from '../../stub/cart-items'

import { Header } from './Header'

const meta = {
  component: Header,
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    appState: {
      cart: {
        visible: true,
        items: cartItems,
      },
    },
    route: {
      entry: '/',
    },
  },
  render: () => <Header />,
}
