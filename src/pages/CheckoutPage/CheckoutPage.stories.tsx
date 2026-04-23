import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { CheckoutPage } from './CheckoutPage'

const checkoutItems = [
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
  render: () => <CheckoutPage />,
} satisfies Meta<typeof CheckoutPage>

export default meta

type Story = StoryObj<typeof meta>

export const EmptyCart: Story = {
  parameters: {
    route: '/checkout',
    routePath: '/checkout',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible()
    await expect(canvas.getByText(/your cart is empty/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /contact details/i })).toBeVisible()
  },
}

export const WithItems: Story = {
  parameters: {
    route: '/checkout',
    routePath: '/checkout',
    cartItems: checkoutItems,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Coca-Cola')).toBeVisible()
    await expect(canvas.getByText('€18.75')).toBeVisible()
  },
}

export const ValidationErrors: Story = {
  parameters: {
    route: '/checkout',
    routePath: '/checkout',
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /next/i }))

    await waitFor(async () => {
      await expect(canvas.getAllByText('Required').length).toBeGreaterThan(0)
    })
    await expect(canvas.getByText(/we'll only use your phone/i)).toBeVisible()
  },
}
