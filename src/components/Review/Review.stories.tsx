import type { Meta, StoryObj } from '@storybook/react-vite'

import { Review } from './Review'

const meta = {
  title: 'AI Generated/Simple/Review',
  component: Review,
  parameters: {
    layout: 'centered',
  },
  args: {
    rating: 4.2,
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
