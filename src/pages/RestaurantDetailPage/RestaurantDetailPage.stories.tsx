import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    reactRouter: {
      initialEntries: ['/restaurants/1'],
      routePath: '/restaurants/:id',
    },
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
    await expect(canvas.getByText(/nicest place for burgers/i)).toBeVisible()
    await expect(canvas.getByText(/4\.2/)).toBeVisible()
  },
}
