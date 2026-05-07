import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { Button } from './Button'

const meta = {
  component: Button,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Add to order',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /add to order/i })
    await expect(button).toBeVisible()
    await expect(button).toBeEnabled()
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
    await expect(getComputedStyle(button).backgroundColor).toBe('rgba(0, 0, 0, 0)')
  },
}

export const IconOnly: Story = {
  args: {
    'aria-label': 'open cart',
    icon: 'cart',
    round: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /open cart/i })
    await expect(button).toBeVisible()
    await expect(button.querySelector('svg')).toBeInTheDocument()
  },
}

export const Disabled: Story = {
  args: {
    children: 'Checkout',
    disabled: true,
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
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)')
  },
}
