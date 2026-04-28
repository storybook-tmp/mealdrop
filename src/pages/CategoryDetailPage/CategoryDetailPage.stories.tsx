import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { waitFor, expect } from 'storybook/test'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
  tags: ['ai-generated'],
  parameters: {
    routerOverride: true,
  },
} satisfies Meta<typeof CategoryDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/categories/pizza']}>
        <Routes>
          <Route path="/categories/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /pizza/i })).toBeVisible()
    await waitFor(() => {
      expect(canvas.getByText(/pizza palace/i)).toBeVisible()
    })
  },
}

export const Asian: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/categories/asian']}>
        <Routes>
          <Route path="/categories/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  render: () => <CategoryDetailPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /asian/i })).toBeVisible()
    await waitFor(() => {
      expect(canvas.getByText(/saigon bistro/i)).toBeVisible()
    })
  },
}
