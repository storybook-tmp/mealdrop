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
  parameters: {
    route: {
      initialEntries: ['/'],
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /our favorite picks/i })).toBeVisible()
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    })
    await expect(canvas.getByRole('heading', { name: /categories/i })).toBeVisible()
  },
}
