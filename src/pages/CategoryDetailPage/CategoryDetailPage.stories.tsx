import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
  parameters: {
    route: {
      initialEntry: '/categories/burgers',
      path: '/categories/:id',
    },
  },
} satisfies Meta<typeof CategoryDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const Burgers: Story = {
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i, level: 2 })).toBeVisible()
    })

    await expect(canvas.getByRole('heading', { name: /kara fin/i, level: 2 })).toBeVisible()
    await expect(canvas.queryByText(/this is not the food you're looking for/i)).not.toBeInTheDocument()
  },
}

export const Pizza: Story = {
  parameters: {
    route: {
      initialEntry: '/categories/pizza',
      path: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /kara fin/i, level: 2 })).toBeVisible()
    })

    await expect(canvas.getByRole('heading', { name: /ciao bella/i, level: 2 })).toBeVisible()
    await expect(canvas.queryByText(/burger kingdom/i)).not.toBeInTheDocument()
  },
}

export const EmptyCategory: Story = {
  parameters: {
    route: {
      initialEntry: '/categories/desserts',
      path: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText(/this is not the food you're looking for/i)).toBeVisible()
    })

    await expect(canvas.getByRole('button', { name: /see all restaurants/i })).toBeVisible()
    await expect(canvas.getByAltText(/no restaurants found/i)).toBeVisible()
  },
}
