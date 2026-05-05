import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { Route, Routes, MemoryRouter } from 'react-router-dom'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    /** Opt out of the global MemoryRouter so we can provide route params */
    useCustomRouter: true,
  },
  decorators: [
    // This replaces the global MemoryRouter with one that has the right route
    (Story) => (
      <MemoryRouter initialEntries={['/restaurants/1']}>
        <div id="modal" />
        <Routes>
          <Route path="/restaurants/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText('Burger Kingdom')).toBeVisible()
    })
    await expect(canvas.getByText(/Specialties:/)).toBeVisible()
  },
}
