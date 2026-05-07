import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const LoadedRestaurant: Story = {
  parameters: {
    route: {
      path: '/restaurants/:id',
      initialEntries: ['/restaurants/1'],
    },
  },
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })
    await expect(canvas.getByRole('heading', { name: /to eat/i })).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const OpensFoodItemModal: Story = {
  parameters: {
    route: {
      path: '/restaurants/:id',
      initialEntries: ['/restaurants/1'],
    },
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await waitFor(async () => {
      await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    })

    await userEvent.click(canvas.getByText('Cheeseburger'))

    await waitFor(async () => {
      await expect(canvasElement.ownerDocument.querySelector('[data-testid="modal"]')).toBeVisible()
    })
    await expect(canvasElement.ownerDocument.body).toHaveTextContent('add for €8.50')
  },
}
