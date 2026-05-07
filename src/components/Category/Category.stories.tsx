import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { categories } from '../../stub/categories'

import { Category as CategoryCard } from './Category'

const pizza = categories[0]
const sushi = categories[4]

const meta = {
  component: CategoryCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof CategoryCard>

export default meta
type Story = StoryObj<typeof meta>

export const Square: Story = {
  args: {
    ...pizza,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('Pizza')).toHaveTextContent('Pizza')
  },
}

export const Round: Story = {
  args: {
    ...sushi,
    round: true,
  },
}

export const Burger: Story = {
  args: {
    ...categories[1],
  },
}
