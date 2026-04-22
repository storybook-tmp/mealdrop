import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { HomePage } from './HomePage'

const meta = {
  component: HomePage,
  tags: ['ai-generated'],
} satisfies Meta<typeof HomePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await waitFor(
      () => expect(canvas.getByText('Our favorite picks')).toBeVisible(),
      { timeout: 5000 }
    )
    await waitFor(
      () => expect(canvas.getAllByTestId('restaurant-card').length).toBeGreaterThan(0),
      { timeout: 5000 }
    )
  },
}

export const WithSections: Story = {
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await waitFor(
      () => expect(canvas.getByText('Our favorite picks')).toBeVisible(),
      { timeout: 5000 }
    )
  },
}
