import type { Meta, StoryObj } from '@storybook/react-vite'

import { categories } from '../../stub/categories'
import { Category } from './Category'

const [pizzaCategory] = categories

const meta = {
  title: 'AI Generated/Medium/Category',
  component: Category,
  args: {
    title: pizzaCategory.title,
    photoUrl: pizzaCategory.photoUrl,
  },
} satisfies Meta<typeof Category>

export default meta

type Story = StoryObj<typeof meta>

export const Featured: Story = {}

export const Round: Story = {
  args: {
    round: true,
  },
}
