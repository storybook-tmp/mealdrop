import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { toCurrency } from '../../helpers'
import { cartItems } from '../../stub/cart-items'

import { CheckoutPage } from './CheckoutPage'

const checkoutItems = cartItems.slice(0, 3)

const meta = {
  component: CheckoutPage,
  parameters: {
    mealdrop: {
      initialPath: '/checkout',
      routePath: '/checkout',
    },
  },
  render: () => <CheckoutPage />,
} satisfies Meta<typeof CheckoutPage>

export default meta

type Story = StoryObj<typeof meta>

export const EmptyCart: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible()
    await expect(canvas.getByText(/your cart is empty\./i)).toBeVisible()
    await expect(canvas.getByText(/step 1 of 2/i)).toBeVisible()
  },
}

export const FilledCart: Story = {
  parameters: {
    mealdrop: {
      initialPath: '/checkout',
      routePath: '/checkout',
      preloadedState: {
        cart: {
          items: checkoutItems,
          visible: false,
        },
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/^Fries$/)).toBeVisible()
    await expect(canvas.getByText(/^Cheeseburger$/)).toBeVisible()
    await expect(canvas.getByText(toCurrency(13))).toBeVisible()
  },
}

export const CompleteOrder: Story = {
  parameters: {
    mealdrop: {
      initialPath: '/checkout',
      routePath: '/checkout',
      preloadedState: {
        cart: {
          items: checkoutItems,
          visible: false,
        },
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText(/first name/i), 'John')
    await userEvent.type(canvas.getByLabelText(/last name/i), 'Doe')
    await userEvent.type(canvas.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(canvas.getByLabelText(/phone number/i), '0612345678')
    await userEvent.click(canvas.getByRole('button', { name: /next/i }))

    await waitFor(() => {
      expect(canvas.getByText(/step 2 of 2/i)).toBeVisible()
    })

    await userEvent.type(canvas.getByLabelText(/streetname and housenumber/i), 'Main street 12')
    await userEvent.type(canvas.getByLabelText(/postcode/i), '1234AB')
    await userEvent.type(canvas.getByLabelText(/city/i), 'Amsterdam')
    await userEvent.click(canvas.getByRole('button', { name: /complete order/i }))

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible()
    })

    await expect(canvas.getByText(/estimated delivery/i)).toBeVisible()
  },
}
