import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { toCurrency } from '../../helpers'
import { SuccessPage } from './SuccessPage'

const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

const meta = {
  component: SuccessPage,
  parameters: {
    route: {
      initialEntry: '/success',
      path: '/success',
    },
  },
} satisfies Meta<typeof SuccessPage>

export default meta

type Story = StoryObj<typeof meta>

export const WithOrderItems: Story = {
  parameters: {
    appState: {
      order: {
        items: cartItems,
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i, level: 1 })).toBeVisible()
    await expect(canvas.getByText(/estimated delivery/i)).toBeVisible()
    await expect(canvas.getByText(toCurrency(totalPrice))).toBeVisible()
  },
}

export const EmptyOrder: Story = {
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i, level: 1 })).toBeVisible()
    await expect(canvas.getByText(/your cart is empty/i)).toBeVisible()
    await expect(canvas.getByText(/13:23 today/i)).toBeVisible()
  },
}

export const DarkMode: Story = {
  parameters: {
    appState: {
      order: {
        items: cartItems,
      },
    },
    browserState: {
      darkMode: true,
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    const header = canvas.getByTestId('header')

    await expect(canvas.getByRole('heading', { name: /order confirmed!/i, level: 1 })).toBeVisible()
    await expect(globalThis.getComputedStyle(header).backgroundColor).toBe('rgb(32, 32, 32)')
    await expect(canvas.getByText(/cheeseburger/i)).toBeVisible()
  },
}
