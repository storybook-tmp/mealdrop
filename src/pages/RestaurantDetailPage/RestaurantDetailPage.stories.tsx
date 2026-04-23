import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const selectedRestaurant = restaurantsCompleteData[0]
const selectedCartItem = {
  ...selectedRestaurant.menu.food[0],
  quantity: 2,
}

const meta = {
  component: RestaurantDetailPage,
  render: () => <RestaurantDetailPage />,
} satisfies Meta<typeof RestaurantDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    route: `/restaurants/${selectedRestaurant.id}`,
    routePath: '/restaurants/:id',
  },
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: selectedRestaurant.name })).toBeVisible()
    })
    await expect(canvas.getByRole('heading', { name: /to eat/i })).toBeVisible()
    await expect(canvas.getByText(/specialties:/i)).toBeVisible()
  },
}

export const OpenFoodModal: Story = {
  parameters: {
    route: `/restaurants/${selectedRestaurant.id}`,
    routePath: '/restaurants/:id',
  },
  play: async ({ canvas, canvasElement }) => {
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /to eat/i })).toBeVisible()
    })

    await userEvent.click(canvas.getByRole('heading', { name: /cheeseburger/i }))

    const documentQueries = within(canvasElement.ownerDocument.body)
    let modal: HTMLElement

    await waitFor(async () => {
      modal = documentQueries.getByTestId('modal')
      await expect(modal).toBeVisible()
    })
    const modalQueries = within(modal!)

    await expect(modalQueries.getByText(/nice grilled burger with cheese/i)).toBeVisible()
    await expect(modalQueries.getByRole('button', { name: /confirm/i })).toBeVisible()
  },
}

export const WithCartQuantity: Story = {
  parameters: {
    route: `/restaurants/${selectedRestaurant.id}`,
    routePath: '/restaurants/:id',
    cartItems: [selectedCartItem],
  },
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /to eat/i })).toBeVisible()
    })
    await expect(canvas.getByLabelText(/food quantity/i)).toBeVisible()
    await expect(canvas.getByText('2')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /cheeseburger/i })).toBeVisible()
  },
}
