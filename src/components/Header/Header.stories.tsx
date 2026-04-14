import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { toCurrency } from '../../helpers'
import { cartItems } from '../../stub/cart-items'

import { Header } from './Header'

const openCartItems = cartItems.slice(0, 2)

const meta = {
  component: Header,
  render: (args) => <Header {...args} />,
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toHaveAttribute(
      'href',
      '/'
    )
    await expect(canvas.getByRole('button', { name: /home/i })).toBeVisible()

    await userEvent.click(canvas.getByRole('button', { name: /food cart/i }))

    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled()
  },
}

export const OpenCart: Story = {
  parameters: {
    mealdrop: {
      preloadedState: {
        cart: {
          items: openCartItems,
          visible: true,
        },
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText(/^Fries$/)).toBeVisible()
    await expect(
      canvas.getAllByText(toCurrency(openCartItems[0].price + openCartItems[1].price))
    ).toHaveLength(2)

    await userEvent.click(canvas.getByRole('button', { name: /close sidebar/i }))

    await waitFor(() => {
      expect(canvas.queryByTestId('sidebar')).not.toBeInTheDocument()
    })
  },
}

export const StickyDarkMode: Story = {
  args: {
    sticky: true,
  },
  parameters: {
    mealdrop: {
      darkMode: true,
    },
  },
  play: async ({ canvas }) => {
    const header = canvas.getByTestId('header')

    await expect(header).toBeVisible()
    await expect(canvas.getByRole('button', { name: /turn on light mode/i })).toBeVisible()
    await expect(window.getComputedStyle(header).position).toBe('sticky')
  },
}
