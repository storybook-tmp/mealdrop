import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from 'react-router-dom'
import { expect } from 'storybook/test'

import { Button } from './Button'

const meta = {
  component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const CheckoutAction: Story = {
  render: () => <Button large>Checkout</Button>,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}

export const HeaderNavigation: Story = {
  render: () => (
    <Link to="/" tabIndex={-1}>
      <Button clear>Home</Button>
    </Link>
  ),
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /home/i })

    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/')
  },
}

export const QuantityButton: Story = {
  render: () => (
    <Button round clear icon="plus" aria-label="increase quantity by one" iconSize={16} />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /increase quantity by one/i })).toBeVisible()
    await expect(
      canvas.getByRole('button', { name: /increase quantity by one/i })
    ).toBeEnabled()
  },
}
