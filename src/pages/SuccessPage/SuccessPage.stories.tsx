import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { SuccessPage } from './SuccessPage'

const orderItems = [
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
} satisfies Meta<typeof SuccessPage>

export default meta

type Story = StoryObj<typeof meta>

export const EmptyOrder: Story = {
  render: () => <SuccessPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('heading', { name: 'Order confirmed!' })).toBeVisible()
    await expect(canvas.getByText('Your cart is empty.')).toBeVisible()
  },
}

export const SingleOrder: Story = {
  parameters: {
    reduxState: {
      order: {
        items: [orderItems[0]],
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Estimated delivery')).toBeVisible()
    await expect(canvas.getByText(orderItems[0].name)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: '13:23 today' })).toBeVisible()
  },
}

export const MultipleItems: Story = {
  parameters: {
    reduxState: {
      order: {
        items: orderItems,
      },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(orderItems[0].name)).toBeVisible()
    await expect(canvas.getByText(orderItems[1].name)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: 'Your order' })).toBeVisible()
  },
}
