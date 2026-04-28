import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Route, Routes } from 'react-router-dom'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
  tags: ['ai-generated'],
  parameters: {
    memoryRouter: { initialEntries: ['/categories/burgers'] },
  },
  render: () => (
    <Routes>
      <Route path="/categories/:id" element={<CategoryDetailPage />} />
    </Routes>
  ),
} satisfies Meta<typeof CategoryDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Burgers: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('Burger Kingdom')).toBeVisible()
  },
}

export const Pizza: Story = {
  parameters: {
    memoryRouter: { initialEntries: ['/categories/pizza'] },
  },
}
