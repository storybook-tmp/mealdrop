import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Button } from './Button'

const meta = {
  component: Button,
  tags: ['ai-generated'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Order now',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /order now/i })
    await expect(button).toBeVisible()
    await expect(button).not.toBeDisabled()
  },
}

export const Clear: Story = {
  args: {
    clear: true,
    children: 'View all restaurants',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /view all restaurants/i })
    await expect(button).toBeVisible()
  },
}

export const Disabled: Story = {
  args: {
    children: 'Checkout',
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /checkout/i })
    await expect(button).toBeDisabled()
  },
}

export const Large: Story = {
  args: {
    large: true,
    children: 'View all restaurants',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /view all restaurants/i })).toBeVisible()
  },
}

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    'aria-label': 'food cart',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
  },
}

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    // Primary button uses buttonPrimary = grey.dark6 = '#202020' — fails if styled-components CSS did not load.
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)')
  },
}
