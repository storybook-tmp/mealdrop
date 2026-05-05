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
    await expect(canvas.getByRole('heading', { name: /on the menu/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /categories/i })).toBeVisible()
  },
}

export const ShowsCategories: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza')).toBeVisible()
    await expect(canvas.getByText('Burgers')).toBeVisible()
    await expect(canvas.getByText('Sushi')).toBeVisible()
  },
}
