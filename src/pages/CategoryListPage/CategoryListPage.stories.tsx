import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { toCurrency } from '../../helpers'
import { CategoryListPage } from './CategoryListPage'

const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

const meta = {
  component: CategoryListPage,
  parameters: {
    route: {
      initialEntry: '/categories',
      path: '/categories',
    },
  },
} satisfies Meta<typeof CategoryListPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /^categories$/i, level: 1 })).toBeVisible()
    await expect(canvas.getByText(/what’s on the menu\?/i)).toBeVisible()
    await expect(canvas.getByRole('link', { name: /pizza/i })).toHaveAttribute(
      'href',
      '/categories/pizza'
    )
  },
}

export const DarkMode: Story = {
  parameters: {
    browserState: {
      darkMode: true,
    },
  },
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    const header = canvas.getByTestId('header')

    await expect(canvas.getByRole('heading', { name: /^categories$/i, level: 1 })).toBeVisible()
    await expect(globalThis.getComputedStyle(header).backgroundColor).toBe('rgb(32, 32, 32)')
  },
}

export const WithCartItems: Story = {
  parameters: {
    appState: {
      cart: {
        visible: false,
        items: cartItems,
      },
    },
  },
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/order/i)).toBeVisible()
    await expect(canvas.getByText(toCurrency(totalPrice))).toBeVisible()
    await expect(canvas.getByRole('link', { name: /burgers/i })).toBeVisible()
  },
}
