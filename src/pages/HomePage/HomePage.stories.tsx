import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor, within } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { HomePage } from './HomePage'

const cartItem = {
  ...restaurantsCompleteData[0].menu.food[0],
  quantity: 1,
}

const meta = {
  component: HomePage,
} satisfies Meta<typeof HomePage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <HomePage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('heading', { name: 'Our favorite picks' })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: 'Categories' })).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'View all restaurants' })).toBeVisible()
    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: restaurantsCompleteData[0].name })
      ).toBeVisible()
    })
  },
}

export const FilledCart: Story = {
  parameters: {
    reduxState: {
      cart: {
        visible: false,
        items: [cartItem],
      },
    },
  },
  render: () => <HomePage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Order')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: 'Award winning' })).toBeVisible()
  },
}

export const OpenCart: Story = {
  parameters: {
    reduxState: {
      cart: {
        visible: true,
        items: [cartItem],
      },
    },
  },
  render: () => <HomePage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByText(cartItem.name)).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Checkout' })).toBeVisible()
  },
}
