import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/categories/burgers']}>
        <Routes>
          <Route path="/categories/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    skipRouter: true,
  },
} satisfies Meta<typeof CategoryDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Burgers')).toBeVisible()
      },
      { timeout: 5000 }
    )
  },
}

export const WithRestaurants: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Burger Kingdom')).toBeVisible()
      },
      { timeout: 5000 }
    )
  },
}

export const Breadcrumbs: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('categories')).toBeVisible()
      },
      { timeout: 5000 }
    )
  },
}
