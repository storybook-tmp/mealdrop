import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { CheckoutPage } from './CheckoutPage'

const cartState = {
  items: cartItems.slice(0, 3),
  visible: false,
}

const meta = {
  component: CheckoutPage,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
    app: {
      route: '/checkout',
      routePath: '/checkout',
    },
  },
} satisfies Meta<typeof CheckoutPage>

export default meta
type Story = StoryObj<typeof meta>

export const WithCart: Story = {
  parameters: {
    app: {
      route: '/checkout',
      routePath: '/checkout',
      preloadedState: {
        cart: cartState,
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /contact details/i })).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const EmptyCart: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible()
    await expect(canvas.getByText(/your cart is empty/i)).toBeVisible()
  },
}

export const ContactDetailsComplete: Story = {
  parameters: {
    app: {
      route: '/checkout',
      routePath: '/checkout',
      preloadedState: {
        cart: cartState,
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText(/first name/i), 'Jane')
    await userEvent.type(canvas.getByLabelText(/last name/i), 'Doe')
    await userEvent.type(canvas.getByLabelText(/email/i), 'jane@example.com')
    await userEvent.type(canvas.getByLabelText(/phone number/i), '0612345678')
    await userEvent.click(canvas.getByRole('button', { name: /next/i }))

    await expect(await canvas.findByRole('heading', { name: /delivery details/i })).toBeVisible()
    await expect(canvas.getByLabelText(/postcode/i)).toBeVisible()
  },
}
