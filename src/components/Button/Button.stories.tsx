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
    children: 'Save order',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /save order/i })).toBeEnabled()
  },
}

export const Clear: Story = {
  args: {
    children: 'All restaurants',
    clear: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /all restaurants/i })).toBeVisible()
  },
}

export const IconOnly: Story = {
  args: {
    'aria-label': 'food cart',
    icon: 'cart',
    round: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
  },
}

export const Disabled: Story = {
  args: {
    children: 'Checkout',
    disabled: true,
    large: true,
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
