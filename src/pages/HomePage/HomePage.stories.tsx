import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { HomePage } from './HomePage'

const meta = {
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomePage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <HomePage />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('heading', { name: /hungry\?/i })).toBeVisible()
    await waitFor(() => expect(canvas.getByText('Burger Kingdom')).toBeVisible())
    await expect(canvas.getByRole('heading', { name: 'Categories' })).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: 'View all restaurants' }))
    await waitFor(() => expect(window.location.pathname).toBe('/categories'))
  },
}

export const DarkMode: Story = {
  parameters: {
    app: {
      darkMode: true,
    },
  },
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText('Burger Kingdom')).toBeVisible())
    await expect(canvas.getByRole('button', { name: 'turn on light mode' })).toBeVisible()
    await waitFor(() => expect(document.body.classList.contains('dark-mode')).toBe(true))
  },
}

export const WithCartItems: Story = {
  parameters: {
    app: {
      preloadedState: {
        cart: {
          items: cartItems.slice(0, 2),
        },
      },
    },
  },
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText('Burger Kingdom')).toBeVisible())
    await expect(canvas.getByText('Order')).toBeVisible()
    await expect(canvas.getByText('€11.00')).toBeVisible()
  },
}
