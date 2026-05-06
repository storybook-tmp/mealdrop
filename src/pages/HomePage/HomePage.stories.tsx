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
    await expect(canvas.getByText(/hungry/i)).toBeVisible()
    await waitFor(() => {
      expect(canvas.getByText('Our favorite picks')).toBeVisible()
    })
  },
}
