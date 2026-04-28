import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { TopBanner } from './TopBanner'

const meta = preview.meta({
  component: TopBanner,
  tags: ['ai-generated'],
})

export const WithTitle = meta.story({
  args: {
    title: 'Categories',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Categories')).toBeVisible()
  },
})

export const WithPhoto = meta.story({
  args: {
    title: 'Pizza',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza')).toBeVisible()
  },
})

export const NoTitle = meta.story({
  args: {
    photoUrl:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  play: async ({ canvas }) => {
    // Banner should still be present even without a title
    const heading = canvas.queryByRole('heading')
    await expect(heading).toBeNull()
  },
})
