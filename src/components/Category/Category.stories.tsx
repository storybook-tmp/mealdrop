import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { categories } from '../../stub/categories'

import { Category } from './Category'

const meta = {
  component: Category,
  tags: ['ai-generated'],
} satisfies Meta<typeof Category>

export default meta
type Story = StoryObj<typeof meta>

export const Square: Story = {
  args: {
    ...categories[0],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza')).toBeVisible()
    await expect(canvas.getByAltText('restaurant category')).toBeVisible()
  },
}

export const Round: Story = {
  args: {
    ...categories[1],
    round: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burgers')).toBeVisible()
    await expect(canvas.getByAltText('restaurant category')).toBeVisible()
  },
}

export const LongTitle: Story = {
  args: {
    ...categories[3],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Comfort food')).toBeVisible()
  },
}
