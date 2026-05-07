import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { Header } from './Header'

const cartState = {
  items: cartItems.slice(0, 2),
  visible: false,
}

const meta = {
  component: Header,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const EmptyCart: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByLabelText(/go to home page/i)).toBeVisible()
    const cartButton = canvas.getByRole('button', { name: /food cart/i })
    await expect(cartButton).toBeVisible()
    await userEvent.click(cartButton)
    await expect(await canvas.findByRole('heading', { name: /your order/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled()
  },
}

export const WithCart: Story = {
  parameters: {
    app: {
      preloadedState: {
        cart: cartState,
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
    await expect(canvas.getByText(/€11/)).toBeVisible()
  },
}

export const OpenCartMenu: Story = {
  parameters: {
    app: {
      preloadedState: {
        cart: {
          ...cartState,
          visible: true,
        },
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible()
    await expect(canvas.getByText('Fries')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}
