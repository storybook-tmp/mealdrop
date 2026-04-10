import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
  parameters: {
    router: {
      initialEntries: ['/categories/pizza'],
      routePath: '/categories/:id',
    },
  },
} satisfies Meta<typeof CategoryDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Pizza' })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByText('Kara Fin')).toBeVisible()
    })
    await expect(canvas.getByRole('link', { name: 'categories' })).toHaveAttribute(
      'href',
      '/categories'
    )
    await expect(canvas.getByText('Ciao Bella')).toBeVisible()
  },
}

export const EmptyCategory: Story = {
  parameters: {
    router: {
      initialEntries: ['/categories/desserts'],
      routePath: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Desserts' })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByText(/this is not the food you're looking for/i)).toBeVisible()
    })
    await expect(canvas.getByRole('button', { name: /see all restaurants/i })).toBeVisible()
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
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByText('Kara Fin')).toBeVisible()
    })
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}
