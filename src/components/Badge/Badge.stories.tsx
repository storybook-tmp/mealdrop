import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { Badge } from './Badge'

const meta = preview.meta({
  component: Badge,
  tags: ['ai-generated'],
})

export const Default = meta.story({
  args: {
    text: 'burgers',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('burgers')).toBeVisible()
  },
})

export const LongText = meta.story({
  args: {
    text: 'comfort food',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('comfort food')).toBeVisible()
  },
})

export const Capitalized = meta.story({
  args: {
    text: 'pizza',
  },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('pizza')
    await expect(badge).toBeVisible()
    // Badge uses text-transform: capitalize
    await expect(getComputedStyle(badge.parentElement!).textTransform).toBe('capitalize')
  },
})
