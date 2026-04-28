import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { waitFor, expect } from 'storybook/test'

import { HomePage } from './HomePage'

const meta = {
  component: HomePage,
  tags: ['ai-generated'],
} satisfies Meta<typeof HomePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /hungry/i })).toBeVisible()
    await expect(canvas.getByRole('link', { name: /view all restaurants/i })).toBeVisible()
    await waitFor(() => {
      expect(canvas.getByText(/saigon bistro/i)).toBeVisible()
    })
  },
}
