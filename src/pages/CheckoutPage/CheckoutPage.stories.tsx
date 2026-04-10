import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { toCurrency } from '../../helpers'
import { CheckoutPage } from './CheckoutPage'

const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

const meta = {
  component: CheckoutPage,
  parameters: {
    route: {
      initialEntry: '/checkout',
      path: '/checkout',
    },
  },
} satisfies Meta<typeof CheckoutPage>

export default meta

type Story = StoryObj<typeof meta>

export const EmptyCart: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /^checkout$/i, level: 2 })).toBeVisible()
    await expect(canvas.getByText(/your cart is empty/i)).toBeVisible()
    await expect(canvas.getByText(/step 1 of 2/i)).toBeVisible()
  },
}

export const WithOrderSummary: Story = {
  parameters: {
    appState: {
      cart: {
        visible: false,
        items: cartItems,
      },
    },
  },
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /your order/i, level: 3 })).toBeVisible()
    await expect(canvas.getByText(/cheeseburger/i)).toBeVisible()
    await expect(canvas.getByText(toCurrency(totalPrice))).toBeVisible()
  },
}

export const AdvanceToDeliveryDetails: Story = {
  parameters: {
    appState: {
      cart: {
        visible: false,
        items: cartItems,
      },
    },
  },
  render: () => <CheckoutPage />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText(/first name/i), 'John')
    await userEvent.type(canvas.getByLabelText(/last name/i), 'Doe')
    await userEvent.type(canvas.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(canvas.getByLabelText(/phone number/i), '0612345678')
    await userEvent.click(canvas.getByRole('button', { name: /^next$/i }))

    await expect(canvas.getByText(/step 2 of 2/i)).toBeVisible()
    await expect(canvas.getByLabelText(/streetname and housenumber/i)).toBeVisible()
    await expect(canvas.getByRole('button', { name: /complete order/i })).toBeVisible()
  },
}
