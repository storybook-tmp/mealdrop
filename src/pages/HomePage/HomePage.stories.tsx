import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { HomePage } from './HomePage'

const meta = {
  component: HomePage,
} satisfies Meta<typeof HomePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /hungry/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /view all restaurants/i })).toBeVisible()

    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })

    await expect(canvas.getByRole('heading', { name: /categories/i })).toBeVisible()
  },
}
