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
    await expect(canvas.getByRole('button', { name: /order now/i })).toBeVisible()
  },
})

export const Clear = meta.story({
  args: {
    children: 'Home',
    clear: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /home/i })).toBeVisible()
  },
})

export const WithIcon = meta.story({
  args: {
    children: 'Add to cart',
    icon: 'cart',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /add to cart/i })).toBeVisible()
  },
})

export const Disabled = meta.story({
  args: {
    children: 'Submit',
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled()
  },
})

export const CssCheck = meta.story({
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    // Button uses font-family: 'Hind' — fails if GlobalStyle did not load.
    await expect(getComputedStyle(button).fontFamily).toBe('Hind')
  },
})
