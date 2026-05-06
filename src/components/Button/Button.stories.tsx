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

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    // Button uses font-family: 'Hind' — fails if GlobalStyle did not load
    await expect(getComputedStyle(button).fontFamily).toBe('Hind')
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

export const WithIcon: Story = {
  args: {
    children: 'Add to cart',
    icon: 'cart',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /add to cart/i })).toBeVisible()
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
    children: 'Get started',
    large: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /get started/i })).toBeVisible()
  },
}
