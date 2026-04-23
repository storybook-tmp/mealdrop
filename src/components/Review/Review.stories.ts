import type { Meta, StoryObj } from '@storybook/react-vite'

import { Review } from './Review'

const meta = {
  title: 'AI Generated/Simple/Review',
  component: Review,
} satisfies Meta<typeof Review>

export default meta
type Story = StoryObj<typeof meta>

export const Excellent: Story = {
  args: {
    rating: 5.0,
  },
}

export const NoRating: Story = {
  args: {
    rating: undefined,
  },
}
