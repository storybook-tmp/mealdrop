import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { CheckoutPage } from './CheckoutPage'

const meta = {
  component: CheckoutPage,
  tags: ['ai-generated'],
} satisfies Meta<typeof CheckoutPage>

export default meta
type Story = StoryObj<typeof meta>

export const WithCart: Story = {
  parameters: {
    route: {
      path: '/checkout',
      initialEntries: ['/checkout'],
    },
    reduxState: {
      cart: {
        visible: false,
        items: cartItems.slice(0, 2),
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('€11.00')).toBeVisible()
  },
}

export const ShowsValidation: Story = {
  parameters: {
    route: {
      path: '/checkout',
      initialEntries: ['/checkout'],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /next/i }))

    await expect(canvas.getAllByText('Required')).toHaveLength(4)
  },
}

export const AdvancesToDelivery: Story = {
  parameters: {
    route: {
      path: '/checkout',
      initialEntries: ['/checkout'],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText(/first name/i), 'Ada')
    await userEvent.type(canvas.getByLabelText(/last name/i), 'Lovelace')
    await userEvent.type(canvas.getByLabelText(/email/i), 'ada@example.com')
    await userEvent.type(canvas.getByLabelText(/phone number/i), '0612345678')
    await userEvent.click(canvas.getByRole('button', { name: /next/i }))

    await expect(canvas.getByText('Delivery details')).toBeVisible()
    await expect(canvas.getByLabelText(/postcode/i)).toBeVisible()
  },
}
