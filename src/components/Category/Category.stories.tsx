import type { Meta, StoryObj } from '@storybook/react'

import { Category } from './Category'

const photoUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23d8eef2'/%3E%3Ccircle cx='120' cy='120' r='56' fill='%23e5f8bc'/%3E%3Crect x='170' y='82' width='120' height='120' rx='18' fill='%23ffffff'/%3E%3C/svg%3E"

const meta = {
  title: 'AI Generated/Medium/Category',
  component: Category,
  args: {
    title: 'Burgers',
    photoUrl,
  },
} satisfies Meta<typeof Category>

export default meta

type Story = StoryObj<typeof meta>

export const SquareCard: Story = {}

export const RoundCard: Story = {
  args: {
    round: true,
    title: 'Desserts',
  },
}
