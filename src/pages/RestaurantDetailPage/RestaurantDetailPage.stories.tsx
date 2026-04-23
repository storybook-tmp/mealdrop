import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { RestaurantDetailPage } from './RestaurantDetailPage'

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    reactRouter: {
      initialEntries: ['/restaurants/1'],
      path: '/restaurants/:id',
    },
  },
} satisfies Meta<typeof RestaurantDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByRole('heading', { name: 'Burger Kingdom' })).toBeVisible()
      },
      { timeout: 5000 }
    )
    await expect(canvas.getByText(/Nicest place for burgers/)).toBeVisible()
  },
}

export const WithCategories: Story = {
  parameters: {
    reactRouter: {
      initialEntries: ['/restaurants/2'],
      path: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByRole('heading', { name: 'Kara Fin' })).toBeVisible()
      },
      { timeout: 5000 }
    )
    await expect(canvas.getByText('burgers')).toBeVisible()
  },
}

export const NotFound: Story = {
  parameters: {
    reactRouter: {
      initialEntries: ['/restaurants/999'],
      path: '/restaurants/:id',
    },
  },
  render: () => <RestaurantDetailPage />,
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText("We can't find this page")).toBeVisible()
      },
      { timeout: 5000 }
    )
  },
}
