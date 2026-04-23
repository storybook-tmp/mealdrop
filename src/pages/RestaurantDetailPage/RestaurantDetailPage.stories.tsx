import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  parameters: {
    mealdrop: {
      initialPath: '/restaurants/1',
      routePath: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
} satisfies Meta<typeof RestaurantDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })

    await expect(canvas.getByRole('heading', { name: /to eat/i })).toBeVisible()
    await expect(canvas.getByText(/^burgers$/i)).toBeVisible()
  },
}

export const FoodItemModal: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const ownerDocument = canvasElement.ownerDocument

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })

    await userEvent.click(canvas.getByRole('heading', { name: /cheeseburger/i }))

    await waitFor(() => {
      expect(ownerDocument.querySelector('[data-testid="modal"]')).toBeTruthy()
    })

    await expect(ownerDocument.body).toHaveTextContent(/add for €8\.50/i)

    await userEvent.click(ownerDocument.body.querySelector('[aria-label="increase quantity by one"]')!)

    await expect(ownerDocument.body).toHaveTextContent(/add for €17\.00/i)
  },
}

export const ServerError: Story = {
  parameters: {
    mealdrop: {
      initialPath: '/restaurants/500',
      routePath: '/restaurants/:id',
    },
  },
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /something went wrong!/i })).toBeVisible()
    })

    await expect(canvas.getByRole('button', { name: /try again/i })).toBeVisible()
  },
}
