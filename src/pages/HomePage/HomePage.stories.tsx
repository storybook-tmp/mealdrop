import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { HomePage } from './HomePage'

const meta = {
  component: HomePage,
  parameters: {
    mealdrop: {
      initialPath: '/',
      routePath: '/',
    },
  },
  render: () => <HomePage />,
} satisfies Meta<typeof HomePage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /our favorite picks/i })).toBeVisible()

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })

    await expect(canvas.getByRole('heading', { name: /categories/i })).toBeVisible()
  },
}

export const NavigateToCategories: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('button', { name: /view all categories/i })).toBeVisible()

    await userEvent.click(canvas.getByRole('button', { name: /view all categories/i }))

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /what’s on the menu\?/i })).toBeVisible()
    })
  },
}

export const DarkMode: Story = {
  parameters: {
    mealdrop: {
      darkMode: true,
      initialPath: '/',
      routePath: '/',
    },
  },
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })

    await expect(canvas.getByRole('button', { name: /turn on light mode/i })).toBeVisible()
    await expect(document.body.classList.contains('dark-mode')).toBe(true)
  },
}
