import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { Routes, Route, MemoryRouter } from 'react-router-dom'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    router: false,
  },
  decorators: [
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
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Burger Palace')).toBeVisible()
      },
      { timeout: 5000 }
    )
    await expect(canvas.getByText(/gourmet burgers and fries/i)).toBeVisible()
  },
}
