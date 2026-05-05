import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Input } from './Input'

const meta = {
  component: Input,
  tags: ['ai-generated'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Email', id: 'email', placeholder: 'you@example.com' },
}

export const WithError: Story = {
  args: { label: 'Email', id: 'email-err', error: 'Invalid email address' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Invalid email address')).toBeVisible()
  },
}

export const Filled: Story = {
  args: { label: 'Name', id: 'name' },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Name')
    await userEvent.type(input, 'John Smith')
    await expect(input).toHaveValue('John Smith')
  },
}
