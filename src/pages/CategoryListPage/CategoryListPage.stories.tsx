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
    await expect(canvas.getByText(/on the menu/i)).toBeVisible()
    await expect(canvas.getByTestId('Pizza')).toBeVisible()
    await expect(canvas.getByTestId('Burgers')).toBeVisible()
  },
}

export const WithTopBanner: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Categories' })).toBeVisible()
    await expect(canvas.getByText(/Satisfy your cravings/i)).toBeVisible()
  },
}
