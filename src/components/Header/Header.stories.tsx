import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { Header } from './Header'
import { cartItems } from '../../stub/cart-items'

const meta = {
  component: Header,
  parameters: {
    app: {
      route: {
        initialEntry: '/',
        path: '/',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

const headerCartItems = cartItems.slice(0, 2)

export const Default: Story = {
  parameters: {
    app: {
      preloadedState: {
        cart: {
          items: headerCartItems,
        },
      },
      route: {
        initialEntry: '/',
        path: '/',
      },
    },
  },
  render: () => <Header />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /food cart/i })).toHaveTextContent('€11.00')
    await expect(canvas.getByRole('button', { name: /turn on dark mode/i })).toBeVisible()
  },
}

export const CartOpen: Story = {
  parameters: {
    app: {
      preloadedState: {
        cart: {
          items: headerCartItems,
        },
      },
      route: {
        initialEntry: '/',
        path: '/',
      },
    },
  },
  render: () => <Header />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /food cart/i }))

    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}

export const DarkModeToggle: Story = {
  render: () => <Header />,
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /turn on dark mode/i }))

    await waitFor(async () => {
      await expect(canvas.getByRole('button', { name: /turn on light mode/i })).toBeVisible()
    })
    await expect(canvasElement.ownerDocument.body).toHaveClass('dark-mode')
  },
}
