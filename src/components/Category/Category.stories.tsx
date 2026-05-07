import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { categories } from '../../stub/categories'

import { Category } from './Category'

const pizza = categories[0]

const meta = {
  component: Category,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
  args: {
    ...pizza,
  },
} satisfies Meta<typeof Category>

export default meta
type Story = StoryObj<typeof meta>

export const Square: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza')).toBeVisible()
    await expect(canvas.getByAltText('restaurant category')).toBeVisible()
  },
}

export const Round: Story = {
  args: {
    round: true,
  },
  play: async ({ canvas }) => {
    const image = canvas.getByAltText('restaurant category')
    await expect(canvas.getByText('Pizza')).toBeVisible()
    await expect(getComputedStyle(image).borderRadius).toBe('50%')
  },
}
