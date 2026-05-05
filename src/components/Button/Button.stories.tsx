import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Button } from './Button'

const meta = {
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'View all restaurants',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /view all restaurants/i })

    await expect(button).toBeVisible()
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)')
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
    await expect(button).toBeEnabled()
  },
}

export const DisabledIcon: Story = {
  args: {
    children: 'Checkout',
    disabled: true,
    icon: 'cart',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /checkout/i })

    await expect(button).toBeDisabled()
  },
}
