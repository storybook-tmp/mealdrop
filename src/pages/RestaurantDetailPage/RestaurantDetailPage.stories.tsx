import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  parameters: {
    router: {
      initialEntries: ['/restaurants/1'],
      routePath: '/restaurants/:id',
    },
  },
} satisfies Meta<typeof RestaurantDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: 'Burger Kingdom' })).toBeVisible()
    })
    await expect(canvas.getByText(/specialties: nicest place for burgers/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /to eat/i })).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const NotFound: Story = {
  parameters: {
    router: {
      initialEntries: ['/restaurants/999'],
      routePath: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(canvas.getByText(/we can't find this page/i)).toBeVisible()
    })
    await expect(canvas.getAllByRole('button', { name: /home/i })).toHaveLength(2)
  },
}

export const ExistingCartItemModal: Story = {
  parameters: {
    reduxState: {
      cart: {
        visible: false,
        items: [{ ...cartItems[1], quantity: 2 }],
      },
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await waitFor(async () => {
      await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    })
    await userEvent.click(canvas.getByText('Cheeseburger'))

    await waitFor(async () => {
      await expect(canvasElement.ownerDocument.body.querySelector('[data-testid="modal"]')).not.toBeNull()
    })

    const confirmButton = canvasElement.ownerDocument.body.querySelector(
      '[aria-label="confirm"]'
    ) as HTMLButtonElement | null

    await expect(confirmButton).not.toBeNull()
    await expect(confirmButton).toHaveTextContent(/17\.00/)
  },
}
