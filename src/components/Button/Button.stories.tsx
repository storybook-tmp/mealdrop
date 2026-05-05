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
    children: 'View all restaurants',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /view all restaurants/i })).toBeVisible()
  },
}

export const Clear: Story = {
  args: {
    clear: true,
    children: 'Home',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /home/i })
    await expect(button).toBeVisible()
    await expect(getComputedStyle(button).backgroundColor).toBe('rgba(0, 0, 0, 0)')
  },
}

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    children: 'Order',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /order/i })).toBeVisible()
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Checkout',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled()
  },
}

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    // Default Button uses buttonPrimary color (#202020) — fails if styled-components / ThemeProvider did not load.
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)')
  },
}
