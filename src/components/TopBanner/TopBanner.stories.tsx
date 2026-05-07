import type { Meta, StoryObj } from '@storybook/react-vite'

import { categories } from '../../stub/categories'
import { TopBanner } from './TopBanner'

const meta = {
  component: TopBanner,
  tags: ['ai-generated'],
} satisfies Meta<typeof TopBanner>

export default meta
type Story = StoryObj<typeof meta>

export const PlainTitle: Story = {
  args: {
    title: 'Restaurants',
  },
}

export const PhotoTitle: Story = {
  args: {
    title: 'Pizza',
    photoUrl: categories[0].photoUrl,
  },
}

export const ImageOnly: Story = {
  args: {
    photoUrl: categories[4].photoUrl,
  },
}
