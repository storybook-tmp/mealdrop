import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor, within } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  parameters: {
    app: {
      route: {
        initialEntry: '/restaurants/1',
        path: '/restaurants/:id',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RestaurantDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })
    await expect(canvas.getByRole('heading', { name: /to eat/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /cheeseburger/i })).toBeVisible()
    await expect(canvas.getByText(/specialties: nicest place for burgers/i)).toBeVisible()
  },
}

export const OpensExistingCartItemModal: Story = {
  parameters: {
    app: {
      preloadedState: {
        cart: {
          items: [
            {
              description: 'Nice grilled burger with cheese',
              id: 1,
              name: 'Cheeseburger',
              price: 8.5,
              quantity: 2,
            },
          ],
        },
      },
      route: {
        initialEntry: '/restaurants/1',
        path: '/restaurants/:id',
      },
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas, userEvent, canvasElement }) => {
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /cheeseburger/i })).toBeVisible()
    })

    await userEvent.click(canvas.getByRole('heading', { name: /cheeseburger/i }))

    await waitFor(async () => {
      await expect(canvasElement.ownerDocument.body).toHaveTextContent('add for €17.00')
    })
    await expect(canvasElement.ownerDocument.querySelector('[data-testid="modal"]')).toBeTruthy()
  },
}

export const MissingRestaurant: Story = {
  parameters: {
    app: {
      route: {
        initialEntry: '/restaurants/missing',
        path: '/restaurants/:id',
      },
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(canvas.getByText(/we can't find this page/i)).toBeVisible()
    })
    const errorHeading = canvas.getByRole('heading', { name: /we can't find this page/i })
    const errorContainer = errorHeading.parentElement

    if (!errorContainer) {
      throw new Error('Expected the error block container to exist')
    }

    await expect(within(errorContainer).getByRole('button', { name: /home/i })).toBeVisible()
  },
}
