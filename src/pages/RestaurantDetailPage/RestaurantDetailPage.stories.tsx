import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { Route, Routes } from 'react-router-dom'
import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    routerInitialEntries: ['/restaurants/1'],
  },
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/restaurants/:id" element={<Story />} />
      </Routes>
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
    await expect(canvas.getByText(/nicest place for burgers/i)).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}
