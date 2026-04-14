import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { HomePage } from './HomePage'

const meta = {
  component: HomePage,
  parameters: {
    app: {
      route: {
        initialEntry: '/',
        path: '/',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomePage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /find your next meal/i })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })
    await expect(canvas.getByRole('heading', { name: /categories/i })).toBeVisible()
  },
}

export const NavigateToCategories: Story = {
  render: () => <HomePage />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /view all restaurants/i }))

    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: 'Categories' })).toBeVisible()
    })
    await expect(canvas.getByRole('heading', { name: /what.s on the menu/i })).toBeVisible()
  },
}

export const DarkMode: Story = {
  parameters: {
    app: {
      darkMode: true,
      route: {
        initialEntry: '/',
        path: '/',
      },
    },
  },
  render: () => <HomePage />,
  play: async ({ canvasElement, canvas }) => {
    await expect(canvas.getByRole('heading', { name: /find your next meal/i })).toBeVisible()
    await expect(canvasElement.ownerDocument.body).toHaveClass('dark-mode')
  },
}
