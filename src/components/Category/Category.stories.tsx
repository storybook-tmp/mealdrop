import type { Meta, StoryObj } from '@storybook/react-vite'

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
}

export const Round: Story = {
  args: {
    ...categories[1],
    round: true,
  },
}

export const Sushi: Story = {
  args: {
    ...categories[4],
  },
}
