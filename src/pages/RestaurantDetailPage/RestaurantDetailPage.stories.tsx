import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    router: {
      initialEntries: ['/restaurants/1'],
      path: '/restaurants/:id',
    },
  },
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => expect(canvas.getByText('Burger Kingdom')).toBeVisible(),
      { timeout: 5000 }
    )
    await expect(canvas.getByText(/Nicest place for burgers/i)).toBeVisible()
  },
}

export const WithMenu: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => expect(canvas.getByText('To eat')).toBeVisible(),
      { timeout: 5000 }
    )
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const LoadingState: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
  },
}
