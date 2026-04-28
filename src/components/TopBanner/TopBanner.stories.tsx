import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { TopBanner } from './TopBanner'

const meta = preview.meta({
  component: TopBanner,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
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
    title: 'Burger Kingdom',
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1003&q=20',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible()
  },
})

export const TitleOnly = meta.story({
  args: {
    title: 'Order confirmed!',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Order confirmed!')).toBeVisible()
  },
})
