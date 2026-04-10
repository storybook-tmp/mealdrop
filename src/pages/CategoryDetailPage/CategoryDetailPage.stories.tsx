import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor, within } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { CategoryDetailPage } from './CategoryDetailPage'

const cartItem = {
  ...restaurantsCompleteData[0].menu.food[0],
  quantity: 2,
}

const meta = {
  component: CategoryDetailPage,
} satisfies Meta<typeof CategoryDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const Burgers: Story = {
  parameters: {
    reactRouter: {
      path: '/categories/:id',
      initialEntry: '/categories/burgers',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('heading', { name: 'Burgers' })).toBeVisible()
    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: restaurantsCompleteData[0].name })
      ).toBeVisible()
    })
    await expect(canvas.getByText('categories')).toBeVisible()
  },
}

export const EmptyCategory: Story = {
  parameters: {
    reactRouter: {
      path: '/categories/:id',
      initialEntry: '/categories/desserts',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('heading', { name: 'Desserts' })).toBeVisible()
    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: "This is not the food you're looking for." })
      ).toBeVisible()
    })
    await expect(canvas.getByRole('button', { name: 'See all restaurants' })).toBeVisible()
  },
}

export const BurgersWithCart: Story = {
  parameters: {
    reactRouter: {
      path: '/categories/:id',
      initialEntry: '/categories/burgers',
    },
    reduxState: {
      cart: {
        visible: true,
        items: [cartItem],
      },
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByText(cartItem.name)).toBeVisible()
    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: restaurantsCompleteData[1].name })
      ).toBeVisible()
    })
  },
}
