import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { CategoryListPage } from './CategoryListPage'

const meta = {
  component: CategoryListPage,
  tags: ['ai-generated'],
} satisfies Meta<typeof CategoryListPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/what.*menu/i)).toBeVisible()
  },
}
