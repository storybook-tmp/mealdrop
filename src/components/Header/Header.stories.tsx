import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { toCurrency } from '../../helpers'

import { Header } from './Header'

const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

const meta = {
  component: Header,
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const EmptyCart: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
    await expect(canvas.queryByText(/order/i)).not.toBeInTheDocument()
  },
}

export const WithCartTotal: Story = {
  parameters: {
    appStore: {
      preloadedState: {
        cart: {
          visible: false,
          items: cartItems,
        },
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(toCurrency(cartTotal))).toBeVisible()
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeEnabled()
  },
}

export const OpenCartMenu: Story = {
  parameters: {
    appStore: {
      preloadedState: {
        cart: {
          visible: true,
          items: cartItems,
        },
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible()
    await expect(canvas.getByText(/cheeseburger/i)).toBeVisible()

    await userEvent.click(canvas.getByRole('button', { name: /close sidebar/i }))
    await waitFor(async () => {
      await expect(canvas.queryByTestId('sidebar')).not.toBeInTheDocument()
    })
  },
}
