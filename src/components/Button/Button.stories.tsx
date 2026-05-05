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
  },
}

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    children: 'Order',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeVisible()
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Checkout',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled()
  },
}

export const Large: Story = {
  args: {
    large: true,
    children: 'Checkout',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeVisible()
  },
}

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    // Button uses color.buttonPrimary which is #202020 in lightTheme
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)')
  },
}
