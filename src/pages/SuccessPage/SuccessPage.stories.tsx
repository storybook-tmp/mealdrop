import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { SuccessPage } from './SuccessPage'

const meta = {
  component: SuccessPage,
  parameters: {
    layout: 'fullscreen',
    app: {
      route: '/success',
    },
  },
} satisfies Meta<typeof SuccessPage>

export default meta

type Story = StoryObj<typeof meta>

export const EmptyOrder: Story = {
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Order confirmed!' })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: '13:23 today' })).toBeVisible()
    await expect(canvas.getByText('Your cart is empty.')).toBeVisible()
  },
}

export const SingleItemOrder: Story = {
  parameters: {
    app: {
      route: '/success',
      preloadedState: {
        order: {
          items: cartItems.slice(0, 1),
        },
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Fries')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: '€2.50' })).toBeVisible()
    await expect(canvas.getByText('Estimated delivery')).toBeVisible()
  },
}

export const LargeOrder: Story = {
  parameters: {
    app: {
      route: '/success',
      preloadedState: {
        order: {
          items: cartItems,
        },
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Sprite')).toBeVisible()
    await expect(canvas.getByText('€17.75')).toBeVisible()
  },
}
