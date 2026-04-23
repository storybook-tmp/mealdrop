import type { Meta, StoryObj } from '@storybook/react-vite'

import { Review } from './Review'

const meta = {
  title: 'AI Generated/Simple/Review',
  component: Review,
  args: {
    rating: 4.6,
  },
} satisfies Meta<typeof Review>

export default meta

type Story = StoryObj<typeof meta>

export const Rated: Story = {}

export const NoReviews: Story = {
  args: {
    rating: undefined,
  },
}
