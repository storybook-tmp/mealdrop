import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { CategoryListPage } from './CategoryListPage'

const cartItem = {
  ...restaurantsCompleteData[1].menu.food[1],
  quantity: 3,
}

const meta = {
  component: CategoryListPage,
} satisfies Meta<typeof CategoryListPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <CategoryListPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('heading', { name: 'Categories' })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: 'What’s on the menu?' })).toBeVisible()
    await expect(canvas.getByTestId('Pizza')).toBeVisible()
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
  render: () => <CategoryListPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Order')).toBeVisible()
    await expect(canvas.getByTestId('Burgers')).toBeVisible()
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
  render: () => <CategoryListPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByText(cartItem.name)).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Checkout' })).toBeVisible()
  },
}
