import type { Meta, StoryObj } from '@storybook/react-vite'

import { Category } from './Category'

const meta = {
  title: 'AI Generated/Simple/Category',
  component: Category,
  args: {
    title: 'Sushi',
    photoUrl: '/src/assets/images/restaurants.png',
  },
} satisfies Meta<typeof Category>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Rounded: Story = {
  args: {
    round: true,
    title: 'Desserts',
  },
}
