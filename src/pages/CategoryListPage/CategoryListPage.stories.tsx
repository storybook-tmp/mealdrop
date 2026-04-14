import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { CategoryListPage } from './CategoryListPage'

const meta = {
  component: CategoryListPage,
  parameters: {
    mealdrop: {
      initialPath: '/categories',
      routePath: '/categories',
    },
  },
  render: () => <CategoryListPage />,
} satisfies Meta<typeof CategoryListPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /what’s on the menu\?/i })).toBeVisible()
    await expect(canvas.getByRole('link', { name: /pizza/i })).toBeVisible()
    await expect(canvas.getByRole('link', { name: /asian/i })).toBeVisible()
  },
}

export const OpenPizzaCategory: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('link', { name: /pizza/i }))

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /pizza/i })).toBeVisible()
    })

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /ciao bella/i })).toBeVisible()
    })
  },
}

export const DarkMode: Story = {
  parameters: {
    mealdrop: {
      darkMode: true,
      initialPath: '/categories',
      routePath: '/categories',
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /what’s on the menu\?/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /turn on light mode/i })).toBeVisible()
    await expect(document.body.classList.contains('dark-mode')).toBe(true)
  },
}
