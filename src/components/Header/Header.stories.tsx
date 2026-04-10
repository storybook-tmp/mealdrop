import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { toCurrency } from '../../helpers'
import { Header } from './Header'

const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

const meta = {
  component: Header,
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultHeader: Story = {
  render: () => <Header />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()

    await userEvent.click(canvas.getByRole('button', { name: /food cart/i }))

    await expect(canvas.getByText(/your order/i)).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled()
  },
}

export const HeaderWithCartTotal: Story = {
  parameters: {
    appState: {
      cart: {
        visible: false,
        items: cartItems,
      },
    },
  },
  render: () => <Header />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/order/i)).toBeVisible()
    await expect(canvas.getByText(toCurrency(totalPrice))).toBeVisible()
    await expect(canvas.getByRole('link', { name: /all restaurants/i })).toBeVisible()
  },
}

export const CartMenuOpen: Story = {
  parameters: {
    appState: {
      cart: {
        visible: true,
        items: cartItems,
      },
    },
  },
  render: () => <Header />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText(/your order/i)).toBeVisible()
    await expect(canvas.getByText(/cheeseburger/i)).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()

    await userEvent.click(canvas.getByRole('button', { name: /close sidebar/i }))

    await waitFor(() => {
      expect(canvas.queryByText(/your order/i)).not.toBeInTheDocument()
    })
  },
}
