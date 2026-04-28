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
    const button = canvas.getByRole('button', { name: /order now/i })
    await expect(button).toBeVisible()
    await expect(button).toBeEnabled()
  },
}

export const Clear: Story = {
  args: {
    children: 'Home',
    clear: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /home/i })
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

export const WithIcon: Story = {
  args: {
    children: 'Cart',
    icon: 'cart',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /cart/i })
    await expect(button).toBeVisible()
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
