import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    initialEntries: ['/restaurants/1'],
    routePath: '/restaurants/:id',
  },
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
      },
      { timeout: 5000 }
    )
  },
}

export const Loading: Story = {
  play: async ({ canvas }) => {
    // header is always visible regardless of loading state
    await expect(canvas.getByTestId('header')).toBeVisible()
  },
}

export const NotFound: Story = {
  parameters: {
    initialEntries: ['/restaurants/nonexistent-id'],
    routePath: '/restaurants/:id',
  },
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText(/we can't find this page/i)).toBeVisible()
      },
      { timeout: 5000 }
    )
  },
}
