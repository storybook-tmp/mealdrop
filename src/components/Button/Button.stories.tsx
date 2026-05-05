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

export const Large: Story = {
  args: {
    children: 'View all restaurants',
    large: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /view all restaurants/i })).toBeVisible()
  },
}

export const Clear: Story = {
  args: {
    children: 'Home',
    clear: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /home/i })).toBeVisible()
  },
}

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    children: 'Cart',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /cart/i })).toBeVisible()
  },
}

export const IconOnly: Story = {
  args: {
    icon: 'cart',
    'aria-label': 'food cart',
    round: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
  },
}

export const Disabled: Story = {
  args: {
    children: 'Submit',
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /submit/i })).toBeDisabled()
  },
}

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    // Button uses color.buttonPrimary which is baseColors.grey.dark6 = '#202020'
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)')
  },
}
