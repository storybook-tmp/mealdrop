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
  play: async ({ canvas }) => {
    await waitFor(
      () => expect(canvas.getByText('Our favorite picks')).toBeVisible(),
      { timeout: 5000 },
    )
  },
}

export const WithRestaurants: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => expect(canvas.getByText('Burger Kingdom')).toBeVisible(),
      { timeout: 5000 },
    )
  },
}

export const Categories: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => expect(canvas.getByText(/pizza/i)).toBeVisible(),
      { timeout: 5000 },
    )
  },
}
