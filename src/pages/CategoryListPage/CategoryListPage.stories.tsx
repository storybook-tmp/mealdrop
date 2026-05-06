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
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByTestId('Pizza')).toBeVisible()
    })
    await expect(canvas.getByTestId('Burgers')).toBeVisible()
    await expect(canvas.getByTestId('Sushi')).toBeVisible()
    await expect(canvas.getByTestId('header')).toBeVisible()
  },
}
