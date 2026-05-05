import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { Button } from './Button'

const meta = preview.meta({
  component: Button,
  tags: ['ai-generated'],
})

export const Default = meta.story({
  args: {
    children: 'Order now',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /order now/i })
    await expect(button).toBeVisible()
    await expect(button).toBeEnabled()
  },
})

export const Clear = meta.story({
  args: {
    children: 'Home',
    clear: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /home/i })
    await expect(button).toBeVisible()
  },
})

export const CssCheck = meta.story({
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    // Button uses font-family: 'Hind' — fails if global CSS did not load
    await expect(getComputedStyle(button).fontFamily).toBe('Hind')
  },
})

export const WithIcon = meta.story({
  args: {
    icon: 'cart',
    children: 'Add to cart',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /add to cart/i })
    await expect(button).toBeVisible()
  },
})

export const Disabled = meta.story({
  args: {
    children: 'Unavailable',
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /unavailable/i })
    await expect(button).toBeDisabled()
  },
})
