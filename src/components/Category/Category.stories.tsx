import type { Meta, StoryObj } from '@storybook/react-vite'

import { Category } from './Category'

const meta = {
  component: Category,
  tags: ['ai-generated'],
  args: {
    title: 'Pizza',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  },
} satisfies Meta<typeof Category>

export default meta
type Story = StoryObj<typeof meta>

export const Squared: Story = {}

export const Rounded: Story = {
  args: { round: true },
}
