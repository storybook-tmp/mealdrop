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

export const ClearStyle: Story = {
  args: {
    clear: true,
    children: 'Home',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /home/i })
    await expect(button).toBeVisible()
  },
}

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    children: 'Cart',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /cart/i })
    await expect(button).toBeVisible()
  },
}

export const Disabled: Story = {
  args: {
    children: 'Submit',
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    await expect(button).toBeDisabled()
  },
}

export const Large: Story = {
  args: {
    large: true,
    children: 'Place order',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /place order/i })
    await expect(button).toBeVisible()
  },
}

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    // Button uses buttonPrimary color which is #202020 (grey.dark6) in light theme
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)')
  },
}
