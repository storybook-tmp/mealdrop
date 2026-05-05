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
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/on the menu/i)).toBeVisible()
    await expect(canvas.getByTestId('Pizza')).toBeVisible()
    await expect(canvas.getByTestId('Burgers')).toBeVisible()
  },
}
