import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { SuccessPage } from './SuccessPage'

const confirmedOrder = [
  {
    ...restaurantsCompleteData[0].menu.food[0],
    quantity: 2,
  },
  {
    ...restaurantsCompleteData[0].menu.dessert[0],
    quantity: 1,
  },
]

const meta = {
  component: SuccessPage,
  render: () => <SuccessPage />,
} satisfies Meta<typeof SuccessPage>

export default meta

type Story = StoryObj<typeof meta>

export const EmptyOrder: Story = {
  parameters: {
    route: '/success',
    routePath: '/success',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible()
    await expect(canvas.getByText(/estimated delivery/i)).toBeVisible()
    await expect(canvas.getByText(/your cart is empty/i)).toBeVisible()
  },
}

export const ConfirmedOrder: Story = {
  parameters: {
    route: '/success',
    routePath: '/success',
    orderItems: confirmedOrder,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Vanilla ice cream')).toBeVisible()
    await expect(canvas.getByText('€19.00')).toBeVisible()
  },
}

export const DeliveryEstimate: Story = {
  parameters: {
    route: '/success',
    routePath: '/success',
    orderItems: confirmedOrder,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/estimated delivery/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /13:23 today/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible()
  },
}
