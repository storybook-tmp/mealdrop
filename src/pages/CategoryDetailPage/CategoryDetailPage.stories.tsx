import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
  parameters: {
    mealdrop: {
      initialPath: '/categories/pizza',
      routePath: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
} satisfies Meta<typeof CategoryDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const PizzaRestaurants: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /pizza/i })).toBeVisible()
    })

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /ciao bella/i })).toBeVisible()
    })
    await expect(canvas.getByRole('link', { name: 'categories' })).toHaveAttribute('href', '/categories')
  },
}

export const EmptyCategory: Story = {
  parameters: {
    mealdrop: {
      initialPath: '/categories/desserts',
      routePath: '/categories/:id',
    },
  },
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByText(/this is not the food you're looking for\./i)).toBeVisible()
    })

    await expect(canvas.getByRole('button', { name: /see all restaurants/i })).toBeVisible()

    await userEvent.click(canvas.getByRole('button', { name: /see all restaurants/i }))

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /what’s on the menu\?/i })).toBeVisible()
    })
  },
}

export const DarkModeAsian: Story = {
  parameters: {
    mealdrop: {
      darkMode: true,
      initialPath: '/categories/asian',
      routePath: '/categories/:id',
    },
  },
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /warung atika/i })).toBeVisible()
    })

    await expect(canvas.getByRole('button', { name: /turn on light mode/i })).toBeVisible()
    await expect(document.body.classList.contains('dark-mode')).toBe(true)
  },
}
