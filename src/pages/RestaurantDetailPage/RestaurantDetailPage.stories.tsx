import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
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
  parameters: {
    layout: 'fullscreen',
    skipRouter: true,
  },
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Burger Kingdom')).toBeVisible()
      },
      { timeout: 5000 }
    )
    await expect(canvas.getByText(/specialties: nicest place for burgers/i)).toBeVisible()
    await expect(canvas.getByText('To eat')).toBeVisible()
  },
}

export const WithMenu: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('To eat')).toBeVisible()
      },
      { timeout: 5000 }
    )
    await expect(canvas.getByText('Dessert')).toBeVisible()
    await expect(canvas.getByText('To drink')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const FoodItems: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Fries')).toBeVisible()
      },
      { timeout: 5000 }
    )
    await expect(canvas.getByText('Coca-Cola')).toBeVisible()
    await expect(canvas.getByText('Vanilla ice cream')).toBeVisible()
  },
}
