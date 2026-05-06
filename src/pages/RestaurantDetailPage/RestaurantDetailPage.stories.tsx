import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    skipRouter: true,
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/restaurants/1']}>
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
    await waitFor(
      () => {
        expect(canvas.getByText('Pizza Palace')).toBeVisible()
      },
      { timeout: 5000 }
    )
    await expect(canvas.getByText(/specialties/i)).toBeVisible()
    await expect(canvas.getByText('To eat')).toBeVisible()
  },
}
