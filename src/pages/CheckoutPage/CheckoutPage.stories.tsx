import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { CheckoutPage } from './CheckoutPage'

const meta = {
  component: CheckoutPage,
} satisfies Meta<typeof CheckoutPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    reduxState: {
      cart: {
        visible: false,
        items: cartItems.slice(0, 2),
      },
    },
  },
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /contact details/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const EmptyCart: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible()
    await expect(canvas.getByText('Your cart is empty.')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /next/i })).toBeVisible()
  },
}

export const ValidationErrors: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /next/i }))
    await expect(canvas.getAllByText('Required')).toHaveLength(4)
    await expect(canvas.getByText(/we'll only use your phone/i)).toBeVisible()
  },
}
