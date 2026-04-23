import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { Header } from './Header'

const meta = {
  component: Header,
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Header />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /turn on dark mode/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
  },
}

export const WithItemsInCart: Story = {
  parameters: {
    reduxState: {
      cart: {
        visible: false,
        items: cartItems.slice(0, 2),
      },
    },
  },
  render: () => <Header />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText(/11\.00/)).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: /food cart/i }))
    await waitFor(async () => {
      await expect(canvas.getByTestId('sidebar')).toBeVisible()
    })
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}

export const CartAlreadyOpen: Story = {
  parameters: {
    reduxState: {
      cart: {
        visible: true,
        items: cartItems.slice(0, 3),
      },
    },
  },
  render: () => <Header sticky />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}
