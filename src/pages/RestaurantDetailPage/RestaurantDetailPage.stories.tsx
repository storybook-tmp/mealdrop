import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor, within } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  parameters: {
    layout: 'fullscreen',
    app: {
      routePath: '/restaurants/:id',
    },
  },
} satisfies Meta<typeof RestaurantDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    app: {
      route: '/restaurants/1',
      routePath: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await waitFor(() => expect(canvas.getByRole('heading', { name: 'Burger Kingdom' })).toBeVisible())
    await expect(canvas.getByText('Specialties: Nicest place for burgers')).toBeVisible()
    await userEvent.click(canvas.getByRole('heading', { name: 'Cheeseburger' }))

    await waitFor(() =>
      expect(canvasElement.ownerDocument.querySelector('[data-testid="modal"]')).toBeTruthy()
    )
    const modal = canvasElement.ownerDocument.querySelector('[data-testid="modal"]') as HTMLElement

    await waitFor(() =>
      expect(within(modal).getByRole('button', { name: 'confirm' })).toBeVisible()
    )
    await expect(within(modal).getByText('add for €8.50')).toBeVisible()
  },
}

export const ExistingCartItem: Story = {
  parameters: {
    app: {
      route: '/restaurants/1',
      routePath: '/restaurants/:id',
      preloadedState: {
        cart: {
          items: [
            {
              id: 1,
              name: 'Cheeseburger',
              description: 'Nice grilled burger with cheese',
              price: 8.5,
              quantity: 2,
            },
          ],
        },
      },
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await waitFor(() => expect(canvas.getByLabelText('food quantity')).toBeVisible())
    await userEvent.click(canvas.getByRole('heading', { name: 'Cheeseburger' }))

    await waitFor(() =>
      expect(canvasElement.ownerDocument.querySelector('[data-testid="modal"]')).toBeTruthy()
    )
    const modal = canvasElement.ownerDocument.querySelector('[data-testid="modal"]') as HTMLElement

    const confirmButton = within(modal).getByRole('button', { name: 'confirm' })
    await waitFor(() => expect(confirmButton).toBeVisible())
    await expect(confirmButton).toHaveTextContent('add for €17.00')
    await userEvent.click(within(modal).getByLabelText('increase quantity by one'))
    await expect(confirmButton).toHaveTextContent('add for €25.50')
    await userEvent.click(confirmButton)

    await waitFor(() =>
      expect(canvasElement.ownerDocument.querySelector('[data-testid="modal"]')).toBeNull()
    )
    await expect(canvas.getByLabelText('food quantity')).toHaveTextContent('3')
  },
}

export const MissingRestaurant: Story = {
  parameters: {
    app: {
      route: '/restaurants/999',
      routePath: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() =>
      expect(canvas.getByRole('heading', { name: "We can't find this page" })).toBeVisible()
    )
    await expect(canvas.getByText('This page doesn’t exist, keep looking.')).toBeVisible()
  },
}
