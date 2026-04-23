import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { CategoryListPage } from './CategoryListPage'

const meta = {
  component: CategoryListPage,
  parameters: {
    app: {
      route: {
        initialEntry: '/categories',
        path: '/categories',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CategoryListPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Categories' })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /what.s on the menu/i })).toBeVisible()
    await expect(canvas.getByText('Pizza')).toBeVisible()
    await expect(canvas.getByText('Sushi')).toBeVisible()
  },
}

export const OpenPizzaCategory: Story = {
  render: () => <CategoryListPage />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Pizza'))

    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /pizza/i })).toBeVisible()
      await expect(canvas.getByRole('heading', { name: /ciao bella/i })).toBeVisible()
    }, { timeout: 3000 })
  },
}

export const DarkMode: Story = {
  parameters: {
    app: {
      darkMode: true,
      route: {
        initialEntry: '/categories',
        path: '/categories',
      },
    },
  },
  render: () => <CategoryListPage />,
  play: async ({ canvasElement, canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Categories' })).toBeVisible()
    await expect(canvasElement.ownerDocument.body).toHaveClass('dark-mode')
  },
}
