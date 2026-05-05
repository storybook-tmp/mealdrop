import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { categories } from '../../stub/categories'

import { Category } from './Category'

const meta = {
  component: Category,
} satisfies Meta<typeof Category>

export default meta
type Story = StoryObj<typeof meta>

export const Square: Story = {
  args: {
    ...categories[0],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('Pizza')).toBeVisible()
    await expect(canvas.getByText('Pizza')).toBeVisible()
  },
}

export const Round: Story = {
  args: {
    ...categories[1],
    round: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('Burgers')).toBeVisible()
    await expect(canvas.getByRole('img', { name: /restaurant category/i })).toBeVisible()
  },
}

export const Sushi: Story = {
  args: {
    ...categories[4],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Sushi')).toBeVisible()
  },
}
