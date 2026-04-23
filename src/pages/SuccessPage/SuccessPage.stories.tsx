import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { toCurrency } from '../../helpers'
import { cartItems } from '../../stub/cart-items'

import { SuccessPage } from './SuccessPage'

const orderItems = cartItems.slice(0, 3)

const meta = {
  component: SuccessPage,
  parameters: {
    mealdrop: {
      initialPath: '/success',
      routePath: '/success',
      preloadedState: {
        order: {
          items: orderItems,
        },
      },
    },
  },
  render: () => <SuccessPage />,
} satisfies Meta<typeof SuccessPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible()
    await expect(canvas.getByText(/estimated delivery/i)).toBeVisible()
    await expect(canvas.getByText(/^Fries$/)).toBeVisible()
  },
}

export const SingleItemOrder: Story = {
  parameters: {
    mealdrop: {
      initialPath: '/success',
      routePath: '/success',
      preloadedState: {
        order: {
          items: [cartItems[1]],
        },
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/^Cheeseburger$/)).toBeVisible()
    await expect(canvas.getAllByText(toCurrency(cartItems[1].price))).toHaveLength(2)
  },
}

export const DarkMode: Story = {
  parameters: {
    mealdrop: {
      darkMode: true,
      initialPath: '/success',
      routePath: '/success',
      preloadedState: {
        order: {
          items: orderItems,
        },
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /13:23 today/i })).toBeVisible()
    await expect(document.body.classList.contains('dark-mode')).toBe(true)
  },
}
