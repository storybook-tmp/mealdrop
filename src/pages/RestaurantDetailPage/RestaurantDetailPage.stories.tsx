import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { toCurrency } from '../../helpers'
import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const restaurant = restaurantsCompleteData[0]

const meta = {
  component: RestaurantDetailPage,
} satisfies Meta<typeof RestaurantDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    reactRouter: {
      path: '/restaurants/:id',
      initialEntry: '/restaurants/1',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: restaurant.name })).toBeVisible()
    })
    await expect(canvas.getByText(`Specialties: ${restaurant.specialty}`)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: 'To eat' })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: 'To drink' })).toBeVisible()
  },
}

export const FoodModal: Story = {
  parameters: {
    reactRouter: {
      path: '/restaurants/:id',
      initialEntry: '/restaurants/1',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const documentCanvas = within(canvasElement.ownerDocument.body)

    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: restaurant.menu.food[0].name })).toBeVisible()
    })

    await userEvent.click(canvas.getByRole('heading', { name: restaurant.menu.food[0].name }))

    await waitFor(async () => {
      await expect(documentCanvas.getByTestId('modal')).toBeVisible()
    })
    await expect(
      documentCanvas.getByText(`add for ${toCurrency(restaurant.menu.food[0].price)}`)
    ).toBeVisible()
    await userEvent.click(documentCanvas.getByRole('button', { name: 'close modal' }))
  },
}

export const NotFound: Story = {
  parameters: {
    reactRouter: {
      path: '/restaurants/:id',
      initialEntry: '/restaurants/missing',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: "We can't find this page" })).toBeVisible()
    })
    await expect(canvas.getAllByRole('button', { name: 'Home' }).at(-1)).toBeVisible()
  },
}
