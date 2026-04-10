import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { categories } from '../../stub/categories'
import { restaurantsCompleteData } from '../../stub/restaurants'

import { TopBanner } from './TopBanner'

const meta = {
  component: TopBanner,
  render: (args) => <TopBanner {...args} />,
} satisfies Meta<typeof TopBanner>

export default meta

type Story = StoryObj<typeof meta>

export const PlainTitle: Story = {
  args: {
    title: 'Order confirmed!',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible()
  },
}

export const CategoryHero: Story = {
  args: {
    title: categories[0].title,
    photoUrl: categories[0].photoUrl,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /pizza/i })).toBeVisible()
  },
}

export const RestaurantHero: Story = {
  args: {
    title: restaurantsCompleteData[0].name,
    photoUrl: restaurantsCompleteData[0].photoUrl,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
  },
}
