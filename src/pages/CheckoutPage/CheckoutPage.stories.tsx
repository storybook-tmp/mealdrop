import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { CheckoutPage } from './CheckoutPage'

const meta = {
  component: CheckoutPage,
  parameters: {
    layout: 'fullscreen',
    app: {
      route: '/checkout',
    },
  },
} satisfies Meta<typeof CheckoutPage>

export default meta

type Story = StoryObj<typeof meta>

export const EmptyCart: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Checkout' })).toBeVisible()
    await expect(canvas.getByText('Your cart is empty.')).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Next' })).toBeVisible()
  },
}

export const FilledCart: Story = {
  parameters: {
    app: {
      route: '/checkout',
      preloadedState: {
        cart: {
          items: cartItems.slice(0, 2),
        },
      },
    },
  },
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Fries')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('€11.00')).toBeVisible()
  },
}

export const CompleteOrder: Story = {
  parameters: {
    app: {
      route: '/checkout',
      preloadedState: {
        cart: {
          items: cartItems.slice(0, 2),
        },
      },
    },
  },
  render: () => <CheckoutPage />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('First name'), 'John')
    await userEvent.type(canvas.getByLabelText('Last name'), 'Doe')
    await userEvent.type(canvas.getByLabelText('Email'), 'john@example.com')
    await userEvent.type(canvas.getByLabelText('Phone number'), '0612345678')
    await userEvent.click(canvas.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(canvas.getByRole('button', { name: 'Complete order' })).toBeVisible()
    )

    await userEvent.type(canvas.getByLabelText('Streetname and housenumber'), 'Some street 13')
    await userEvent.type(canvas.getByLabelText('Postcode'), '1234AB')
    await userEvent.type(canvas.getByLabelText('City'), 'Amsterdam')
    await userEvent.click(canvas.getByRole('button', { name: 'Complete order' }))

    await waitFor(() => expect(window.location.pathname).toBe('/success'))
    await expect(canvas.getByText('Your cart is empty.')).toBeVisible()
  },
}
