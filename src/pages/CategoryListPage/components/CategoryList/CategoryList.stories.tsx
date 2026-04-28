import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { categories } from '../../../../stub/categories'
import { CategoryList } from './CategoryList'

const meta = {
  component: CategoryList,
  tags: ['ai-generated'],
  args: {
    categories,
  },
} satisfies Meta<typeof CategoryList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza')).toBeVisible()
    await expect(canvas.getByText('Burgers')).toBeVisible()
  },
}

export const SingleCategory: Story = {
  args: {
    categories: [categories[0]],
  },
}
