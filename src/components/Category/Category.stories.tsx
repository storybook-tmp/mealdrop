import type { Meta, StoryObj } from '@storybook/react'

import { Category } from './Category'

const meta = {
  title: 'AI Generated/Medium/Category',
  component: Category,
} satisfies Meta<typeof Category>

export default meta
type Story = StoryObj<typeof meta>

export const Squared: Story = {
  args: {
    title: 'Pizza',
    photoUrl: 'https://via.placeholder.com/300x200',
  },
}

export const Rounded: Story = {
  args: {
    title: 'Sushi',
    photoUrl: 'https://via.placeholder.com/200x200',
    round: true,
  },
}
