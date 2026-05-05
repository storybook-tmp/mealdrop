import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Button } from './Button'

const meta = {
  component: Button,
  tags: ['ai-generated'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Order now',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /order now/i })).toBeVisible()
  },
}

export const Clear: Story = {
  args: {
    children: 'Home',
    clear: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /home/i })
    await expect(button).toBeVisible()
  },
}

export const Large: Story = {
  args: {
    children: 'Submit',
    large: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /submit/i })).toBeVisible()
  },
}

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    children: 'Add to cart',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /add to cart/i })).toBeVisible()
  },
}

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /unavailable/i })).toBeDisabled()
  },
}

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    // Button uses font-family 'Hind' from styled-components — fails if global CSS did not load.
    await expect(getComputedStyle(button).fontFamily).toContain('Hind')
  },
}
