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
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /submit/i })).toBeVisible()
  },
}

export const Clear: Story = {
  args: {
    clear: true,
    children: 'Cancel',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /cancel/i })).toBeVisible()
  },
}

export const Large: Story = {
  args: {
    large: true,
    children: 'Get started',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /get started/i })).toBeVisible()
  },
}

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    children: 'Add to cart',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /add to cart/i })).toBeVisible()
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled()
  },
}

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    await expect(getComputedStyle(button).fontFamily).toContain('Hind')
  },
}
