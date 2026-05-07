import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
    app: {
      routePath: '/restaurants/:id',
    },
  },
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const BurgerKingdom: Story = {
  parameters: {
    app: {
      route: '/restaurants/1',
      routePath: '/restaurants/:id',
    },
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await expect(await canvas.findByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    await userEvent.click(canvas.getByRole('heading', { name: /cheeseburger/i }))

    const documentCanvas = within(canvasElement.ownerDocument.body)
    const modal = await documentCanvas.findByTestId('modal')
    const modalCanvas = within(modal)
    await expect(modal).toBeVisible()
    await expect(modalCanvas.getByRole('heading', { name: /cheeseburger/i })).toBeVisible()

    await userEvent.click(modalCanvas.getByRole('button', { name: /increase quantity by one/i }))
    await expect(modalCanvas.getByText('2')).toBeVisible()
    await userEvent.click(modalCanvas.getByRole('button', { name: /confirm/i }))
    await expect(canvas.getByText(/€17/)).toBeVisible()
  },
}

export const WithExistingCart: Story = {
  parameters: {
    app: {
      route: '/restaurants/1',
      routePath: '/restaurants/:id',
      preloadedState: {
        cart: {
          items: [cartItems[1]],
          visible: false,
        },
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    await expect(canvas.getByLabelText(/food quantity/i)).toHaveTextContent('1')
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
  },
}

export const MissingRestaurant: Story = {
  parameters: {
    app: {
      route: '/restaurants/missing',
      routePath: '/restaurants/:id',
    },
  },
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByRole('heading', { name: /we can't find this page/i })
    ).toBeVisible()
    await expect(canvas.getByText(/this page doesn’t exist/i)).toBeVisible()
  },
}
