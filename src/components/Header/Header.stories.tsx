import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { toCurrency } from '../../helpers'
import { restaurantsCompleteData } from '../../stub/restaurants'

import { Header } from './Header'

const cartItem = {
  ...restaurantsCompleteData[0].menu.food[0],
  quantity: 2,
}

const meta = {
  component: Header,
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Header />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByRole('link', { name: 'go to home page' })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /turn on dark mode/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'food cart' })).toBeVisible()
  },
}

export const FilledCart: Story = {
  parameters: {
    reduxState: {
      cart: {
        visible: false,
        items: [cartItem],
      },
    },
  },
  render: () => <Header />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Order')).toBeVisible()
    await expect(canvas.getByText(toCurrency(cartItem.price * cartItem.quantity))).toBeVisible()
  },
}

export const OpenCart: Story = {
  parameters: {
    reduxState: {
      cart: {
        visible: true,
        items: [cartItem],
      },
    },
  },
  render: () => <Header />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByText(cartItem.name)).toBeVisible()

    await userEvent.click(canvas.getByRole('button', { name: 'close sidebar' }))

    await waitFor(() => {
      expect(canvas.queryByTestId('sidebar')).not.toBeInTheDocument()
    })
  },
}
