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
    await expect(button).toBeEnabled()
  },
}

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    await expect(button).toBeVisible()
    // buttonPrimary color is #202020 (baseColors.grey.dark6)
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)')
  },
}

export const Clear: Story = {
  args: {
    children: 'Cancel',
    clear: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /cancel/i })
    await expect(button).toBeVisible()
  },
}

export const Large: Story = {
  args: {
    children: 'Checkout',
    large: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /checkout/i })
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

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    'aria-label': 'food cart',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /food cart/i })
    await expect(button).toBeVisible()
  },
}
