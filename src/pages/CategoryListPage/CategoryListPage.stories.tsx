import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { CategoryListPage } from './CategoryListPage'

const meta = {
  component: CategoryListPage,
} satisfies Meta<typeof CategoryListPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /what’s on the menu\?/i })).toBeVisible()
    await expect(canvas.getByText(/feeling like having pizza\?/i)).toBeVisible()
    await expect(canvas.getByRole('link', { name: /pizza/i })).toHaveAttribute(
      'href',
      '/categories/pizza'
    )
  },
}

export const DarkMode: Story = {
  parameters: {
    darkMode: true,
  },
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /turn on light mode/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /what’s on the menu\?/i })).toBeVisible()
    await expect(canvas.getByRole('link', { name: /comfort food/i })).toHaveAttribute(
      'href',
      '/categories/comfort-food'
    )
  },
}

export const WithCartOpen: Story = {
  parameters: {
    reduxState: {
      cart: {
        visible: true,
        items: cartItems.slice(0, 2),
      },
    },
  },
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Your order')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /what’s on the menu\?/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}
