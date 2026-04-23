import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { SuccessPage } from './SuccessPage'

const meta = {
  component: SuccessPage,
} satisfies Meta<typeof SuccessPage>

export default meta

type Story = StoryObj<typeof meta>

export const WithOrderItems: Story = {
  parameters: {
    reduxState: {
      order: {
        items: cartItems.slice(0, 3),
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Order confirmed!')).toBeVisible()
    await expect(canvas.getByText('Estimated delivery')).toBeVisible()
    await expect(canvas.getByText('13:23 today')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const EmptyOrder: Story = {
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Order confirmed!')).toBeVisible()
    await expect(canvas.getByText('Your cart is empty.')).toBeVisible()
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible()
  },
}

export const DarkMode: Story = {
  parameters: {
    darkMode: true,
    reduxState: {
      order: {
        items: cartItems.slice(0, 2),
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible()
    await expect(canvas.getByText('Order confirmed!')).toBeVisible()
    await expect(canvas.getByText('Fries')).toBeVisible()
  },
}
