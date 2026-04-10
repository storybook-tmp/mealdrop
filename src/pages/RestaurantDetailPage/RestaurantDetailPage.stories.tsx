import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor, within } from 'storybook/test'

import { toCurrency } from '../../helpers'
import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  parameters: {
    route: {
      initialEntry: '/restaurants/1',
      path: '/restaurants/:id',
    },
  },
} satisfies Meta<typeof RestaurantDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i, level: 2 })).toBeVisible()
    })

    await userEvent.click(canvas.getByRole('heading', { name: /cheeseburger/i, level: 4 }))

    const modalQueries = within(canvasElement.ownerDocument.body)

    await waitFor(() => {
      expect(modalQueries.getByTestId('modal')).toBeVisible()
    })

    const modal = modalQueries.getByTestId('modal')

    await expect(within(modal).getByText(/nice grilled burger with cheese/i)).toBeVisible()
    await userEvent.click(modalQueries.getByRole('button', { name: /increase quantity by one/i }))
    await userEvent.click(modalQueries.getByRole('button', { name: /confirm/i }))

    await waitFor(() => {
      expect(modalQueries.queryByTestId('modal')).not.toBeInTheDocument()
    })

    await expect(canvas.getByText(/order/i)).toBeVisible()
    await expect(canvas.getByText(toCurrency(17))).toBeVisible()
    await expect(canvas.getByLabelText(/food quantity/i)).toHaveTextContent('2')
  },
}

export const NotFound: Story = {
  parameters: {
    route: {
      initialEntry: '/restaurants/404',
      path: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText(/we can't find this page/i)).toBeVisible()
    })

    const errorBody = canvas.getByText(/this page doesn’t exist, keep looking/i)
    const errorContainer = errorBody.closest('div')

    if (!errorContainer) {
      throw new Error('Expected the 404 error container to exist')
    }

    await expect(within(errorContainer).getByRole('button', { name: /^home$/i })).toBeVisible()
    await expect(errorBody).toBeVisible()
  },
}

export const ServerError: Story = {
  parameters: {
    route: {
      initialEntry: '/restaurants/error',
      path: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText(/something went wrong!/i)).toBeVisible()
    })

    await expect(canvas.getByRole('button', { name: /try again/i })).toBeVisible()
    await expect(canvas.getByText(/our bad, something went wrong on our side/i)).toBeVisible()
  },
}
