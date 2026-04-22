import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { CategoryListPage } from './CategoryListPage'

const meta = {
  component: CategoryListPage,
  tags: ['ai-generated'],
} satisfies Meta<typeof CategoryListPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByRole('heading', { name: /menu/i })).toBeVisible()
      },
      { timeout: 3000 }
    )
    await expect(canvas.getByText('Pizza')).toBeVisible()
    await expect(canvas.getByText('Burgers')).toBeVisible()
  },
}
