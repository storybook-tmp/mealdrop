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
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /submit/i })).toBeVisible()
  },
}

export const Clear: Story = {
  args: {
    children: 'Cancel',
    clear: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /cancel/i })).toBeVisible()
  },
}

export const Disabled: Story = {
  args: {
    children: 'Save',
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /save/i })).toBeDisabled()
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

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    children: 'Order',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /order/i })).toBeVisible()
  },
}

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    // Button uses font-family 'Hind' from styled-components — fails if global styles/theme didn't load
    await expect(getComputedStyle(button).fontFamily).toBe('Hind')
  },
}
