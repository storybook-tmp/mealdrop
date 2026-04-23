import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { CategoryListPage } from './CategoryListPage'

const meta = {
  component: CategoryListPage,
  parameters: {
    layout: 'fullscreen',
    app: {
      route: '/categories',
    },
  },
} satisfies Meta<typeof CategoryListPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <CategoryListPage />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('heading', { name: 'Categories' })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: 'What’s on the menu?' })).toBeVisible()
    const pizzaCategory = canvas.getByTestId('Pizza')
    await expect(pizzaCategory).toBeVisible()
    await userEvent.click(pizzaCategory.closest('a')!)
    await waitFor(() => expect(window.location.pathname.startsWith('/categories/')).toBe(true))
  },
}

export const DarkMode: Story = {
  parameters: {
    app: {
      route: '/categories',
      darkMode: true,
    },
  },
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Categories' })).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'turn on light mode' })).toBeVisible()
    await waitFor(() => expect(document.body.classList.contains('dark-mode')).toBe(true))
  },
}

export const WithCartItems: Story = {
  parameters: {
    app: {
      route: '/categories',
      preloadedState: {
        cart: {
          items: cartItems.slice(0, 2),
        },
      },
    },
  },
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Order')).toBeVisible()
    await expect(canvas.getByText('€11.00')).toBeVisible()
    await expect(canvas.getByText('Comfort food')).toBeVisible()
  },
}
