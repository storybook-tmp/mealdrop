import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { toCurrency } from '../../helpers'
import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const burger = restaurantsCompleteData[0].menu.food[0]

const meta = {
  component: RestaurantDetailPage,
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const BurgerKingdom: Story = {
  parameters: {
    appRoute: {
      initialEntry: '/restaurants/1',
      path: '/restaurants/:id',
    },
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })

    await userEvent.click(canvas.getByRole('heading', { name: /cheeseburger/i }))

    await waitFor(async () => {
      await expect(
        canvasElement.ownerDocument.querySelector('[data-testid="modal"]')
      ).toBeVisible()
    })

    const modal = canvasElement.ownerDocument.querySelector('[data-testid="modal"]')
    await expect(modal).toHaveTextContent(/cheeseburger/i)

    const confirmButton = canvasElement.ownerDocument.querySelector<HTMLButtonElement>(
      '[aria-label="confirm"]'
    )

    if (!confirmButton) {
      throw new Error('Expected the modal confirm button to render')
    }

    await expect(confirmButton).toBeVisible()
    await userEvent.click(confirmButton)

    await waitFor(async () => {
      await expect(
        canvasElement.ownerDocument.querySelector('[data-testid="modal"]')
      ).not.toBeInTheDocument()
    })

    await expect(canvas.getAllByText(toCurrency(burger.price))).toHaveLength(2)
  },
}

export const NotFound: Story = {
  parameters: {
    appRoute: {
      initialEntry: '/restaurants/not-found',
      path: '/restaurants/:id',
    },
  },
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /we can't find this page/i })).toBeVisible()
    })

    await expect(canvas.getAllByRole('button', { name: /home/i })).toHaveLength(2)
  },
}
