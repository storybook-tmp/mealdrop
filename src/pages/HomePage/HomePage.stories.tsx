import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { HomePage } from './HomePage'

const meta = {
  component: HomePage,
  parameters: {
    route: {
      initialEntry: '/',
      path: '/',
    },
  },
} satisfies Meta<typeof HomePage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /our favorite picks/i, level: 2 })).toBeVisible()

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i, level: 2 })).toBeVisible()
    })

    await expect(canvas.getByRole('button', { name: /view all categories/i })).toBeVisible()
  },
}

export const DarkMode: Story = {
  parameters: {
    browserState: {
      darkMode: true,
    },
  },
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    const header = canvas.getByTestId('header')

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i, level: 2 })).toBeVisible()
    })

    await expect(header).toBeVisible()
    await expect(globalThis.getComputedStyle(header).backgroundColor).toBe('rgb(32, 32, 32)')
  },
}

export const WithCartOpen: Story = {
  parameters: {
    appState: {
      cart: {
        visible: true,
        items: cartItems,
      },
    },
  },
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i, level: 2 })).toBeVisible()
    })

    await expect(canvas.getByText(/your order/i)).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}
