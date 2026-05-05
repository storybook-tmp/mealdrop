import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { CheckoutPage } from './CheckoutPage'

const meta = {
  component: CheckoutPage,
} satisfies Meta<typeof CheckoutPage>

export default meta
type Story = StoryObj<typeof meta>

export const EmptyCart: Story = {
  parameters: {
    appRoute: {
      initialEntry: '/checkout',
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible()
    await expect(canvas.getByText(/your cart is empty/i)).toBeVisible()
  },
}

export const ContactValidation: Story = {
  parameters: {
    appRoute: {
      initialEntry: '/checkout',
    },
    appStore: {
      preloadedState: {
        cart: {
          visible: false,
          items: cartItems,
        },
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText(/cheeseburger/i)).toBeVisible()

    await userEvent.click(canvas.getByRole('button', { name: /next/i }))
    await expect(canvas.getAllByText(/required/i)).toHaveLength(4)

    await userEvent.type(canvas.getByLabelText(/first name/i), 'Ada')
    await userEvent.type(canvas.getByLabelText(/last name/i), 'Lovelace')
    await userEvent.type(canvas.getByLabelText(/email/i), 'ada@example.com')
    await userEvent.type(canvas.getByLabelText(/phone number/i), '0612345678')
    await userEvent.click(canvas.getByRole('button', { name: /next/i }))

    await expect(canvas.getByRole('heading', { name: /delivery details/i })).toBeVisible()
    await expect(canvas.getByText(/step 2 of 2/i)).toBeVisible()
  },
}
