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
    children: 'Add to cart',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Add to cart' })).toBeVisible()
  },
}

export const Clear: Story = {
  args: {
    children: 'Home',
    clear: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Home' })).toBeVisible()
  },
}

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    'aria-label': 'food cart',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'food cart' })).toBeVisible()
  },
}

export const Disabled: Story = {
  args: {
    children: 'Checkout',
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Checkout' })
    await expect(button).toBeVisible()
    await expect(button).toBeDisabled()
  },
}

export const Large: Story = {
  args: {
    children: 'Go to checkout',
    large: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Go to checkout' })).toBeVisible()
  },
}
