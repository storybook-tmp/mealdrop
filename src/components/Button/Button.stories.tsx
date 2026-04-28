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

export const CssCheck = meta.story({
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    const style = getComputedStyle(button)
    // Button uses theme color.buttonPrimary which is baseColors.grey.dark6 = #202020
    await expect(style.backgroundColor).toBe('rgb(32, 32, 32)')
  },
})

export const Clear = meta.story({
  args: {
    children: 'Cancel',
    clear: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /cancel/i })
    await expect(button).toBeVisible()
    const style = getComputedStyle(button)
    // Clear button has transparent background
    await expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)')
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
    children: 'Sold out',
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /sold out/i })).toBeDisabled()
  },
})
