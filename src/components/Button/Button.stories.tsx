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
    const button = canvas.getByRole('button', { name: /view all restaurants/i })
    await expect(button).toBeVisible()
    await expect(button).toBeEnabled()
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
    await expect(getComputedStyle(button).backgroundColor).toBe('rgba(0, 0, 0, 0)')
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
    children: 'Order',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /order/i })
    await expect(button).toBeVisible()
  },
}

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    // Button uses font-family: 'Hind' — fails if global CSS did not load
    await expect(getComputedStyle(button).fontFamily).toContain('Hind')
  },
}
