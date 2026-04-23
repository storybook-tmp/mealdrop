import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { SuccessPage } from './SuccessPage'

const meta = {
  component: SuccessPage,
  parameters: {
    app: {
      preloadedState: {
        order: {
          items: cartItems.slice(0, 2),
        },
      },
      route: {
        initialEntry: '/success',
        path: '/success',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SuccessPage>

export default meta

type Story = StoryObj<typeof meta>

export const PopulatedOrder: Story = {
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /13:23 today/i })).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const EmptyOrder: Story = {
  parameters: {
    app: {
      preloadedState: {
        order: {
          items: [],
        },
      },
      route: {
        initialEntry: '/success',
        path: '/success',
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible()
    await expect(canvas.getByText(/your cart is empty/i)).toBeVisible()
  },
}

export const DarkMode: Story = {
  parameters: {
    app: {
      darkMode: true,
      preloadedState: {
        order: {
          items: cartItems.slice(0, 2),
        },
      },
      route: {
        initialEntry: '/success',
        path: '/success',
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvasElement, canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible()
    await expect(canvasElement.ownerDocument.body).toHaveClass('dark-mode')
  },
}
