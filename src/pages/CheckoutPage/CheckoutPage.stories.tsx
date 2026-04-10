import type { Meta, StoryObj } from '@storybook/react-vite'
import { Route, Routes } from 'react-router-dom'
import { expect, userEvent, within } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { CheckoutPage } from './CheckoutPage'

const cartItems = [
  {
    ...restaurantsCompleteData[0].menu.food[0],
    quantity: 2,
  },
  {
    ...restaurantsCompleteData[0].menu.drinks[0],
    quantity: 1,
  },
]

const meta = {
  component: CheckoutPage,
} satisfies Meta<typeof CheckoutPage>

export default meta

type Story = StoryObj<typeof meta>

export const EmptyCart: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('heading', { name: 'Checkout' })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: 'Your order' })).toBeVisible()
    await expect(canvas.getByText('Your cart is empty.')).toBeVisible()
  },
}

export const FilledCart: Story = {
  parameters: {
    reduxState: {
      cart: {
        visible: false,
        items: cartItems,
      },
    },
  },
  render: () => <CheckoutPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(cartItems[0].name)).toBeVisible()
    await expect(canvas.getByText(cartItems[1].name)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: 'Contact details' })).toBeVisible()
  },
}

export const CompleteOrder: Story = {
  parameters: {
    reduxState: {
      cart: {
        visible: false,
        items: cartItems,
      },
    },
  },
  render: () => (
    <>
      <CheckoutPage />
      <Routes>
        <Route path="/success" element={<p>Order confirmed route</p>} />
      </Routes>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByLabelText('First name'), 'John')
    await userEvent.type(canvas.getByLabelText('Last name'), 'Doe')
    await userEvent.type(canvas.getByLabelText('Email'), 'john@example.com')
    await userEvent.type(canvas.getByLabelText('Phone number'), '0612345678')
    await userEvent.click(canvas.getByRole('button', { name: 'Next' }))

    await expect(canvas.getByRole('heading', { name: 'Delivery details' })).toBeVisible()
    await userEvent.type(canvas.getByLabelText('Streetname and housenumber'), 'Some street 13')
    await userEvent.type(canvas.getByLabelText('Postcode'), '1234AB')
    await userEvent.type(canvas.getByLabelText('City'), 'Amsterdam')
    await userEvent.click(canvas.getByRole('button', { name: 'Complete order' }))

    await expect(canvas.getByText('Order confirmed route')).toBeVisible()
  },
}
