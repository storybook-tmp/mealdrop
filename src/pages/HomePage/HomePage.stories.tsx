import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { HomePage } from './HomePage'

const homeCartItem = {
  ...restaurantsCompleteData[0].menu.food[1],
  quantity: 3,
}

const meta = {
  component: HomePage,
  render: () => <HomePage />,
} satisfies Meta<typeof HomePage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    route: '/',
    routePath: '/',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /our favorite picks/i })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })
    await expect(canvas.getByText('Pizza')).toBeVisible()
  },
}

export const WithOpenCart: Story = {
  parameters: {
    route: '/',
    routePath: '/',
    cartItems: [homeCartItem],
    cartVisible: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /our favorite picks/i })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByText(/your order/i)).toBeVisible()
    })
    await expect(canvas.getByText(homeCartItem.name)).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeVisible()
  },
}
