import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { HomePage } from './HomePage'

const meta = {
  component: HomePage,
} satisfies Meta<typeof HomePage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /hungry\?/i })).toBeVisible()
    await expect(canvas.getByRole('link', { name: /view all restaurants/i })).toHaveAttribute(
      'href',
      '/categories'
    )
    await waitFor(async () => {
      await expect(canvas.getByText('Burger Kingdom')).toBeVisible()
    })
    await expect(canvas.getByRole('heading', { name: /categories/i })).toBeVisible()
  },
}

export const DarkMode: Story = {
  parameters: {
    darkMode: true,
  },
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /turn on light mode/i })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByText('Burger Kingdom')).toBeVisible()
    })
    await expect(canvas.getByText('View all categories')).toBeVisible()
  },
}

export const WithCartOpen: Story = {
  parameters: {
    reduxState: {
      cart: {
        visible: true,
        items: cartItems.slice(0, 2),
      },
    },
  },
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Your order')).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByText('Burger Kingdom')).toBeVisible()
    })
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}
