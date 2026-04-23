import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { Header } from './Header'

const meta = {
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const EmptyCart: Story = {
  render: () => <Header />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByLabelText('go to home page')).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'food cart' })).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: 'food cart' }))
    await waitFor(() => expect(canvas.getByTestId('sidebar')).toBeVisible())
    await expect(canvas.getByText('€0.00')).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Checkout' })).toBeDisabled()
  },
}

export const FilledCartOpen: Story = {
  parameters: {
    app: {
      preloadedState: {
        cart: {
          visible: true,
          items: cartItems.slice(0, 2),
        },
      },
    },
  },
  render: () => <Header />,
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => expect(canvas.getByTestId('sidebar')).toBeVisible())
    await expect(canvas.getByText('Fries')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getAllByText(/€/)[0]).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: 'Checkout' }))
    await waitFor(() => expect(window.location.pathname).toBe('/checkout'))
  },
}

export const DarkMode: Story = {
  parameters: {
    app: {
      darkMode: true,
    },
  },
  render: () => <Header />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'turn on light mode' })).toBeVisible()
    await waitFor(() => expect(document.body.classList.contains('dark-mode')).toBe(true))
  },
}
