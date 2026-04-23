import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { Header } from './Header'

const cartItem = {
  ...restaurantsCompleteData[0].menu.food[0],
  quantity: 2,
}

const meta = {
  component: Header,
  render: () => <Header />,
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /turn on dark mode/i })).toBeVisible()
  },
}

export const WithCartOpen: Story = {
  parameters: {
    cartItems: [cartItem],
    cartVisible: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Order')).toBeVisible()
    await expect(canvas.getAllByText('€17.00').length).toBeGreaterThan(0)
    await waitFor(async () => {
      await expect(canvas.getByText(/your order/i)).toBeVisible()
    })
    await expect(canvas.getByText(cartItem.name)).toBeVisible()
  },
}

export const ToggleTheme: Story = {
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('button', { name: /turn on dark mode/i })

    await userEvent.click(toggle)

    await expect(canvas.getByRole('button', { name: /turn on light mode/i })).toBeVisible()
  },
}
