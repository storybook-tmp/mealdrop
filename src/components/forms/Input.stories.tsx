import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Input } from './Input'

const meta = {
  component: Input,
  tags: ['ai-generated'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Email: Story = {
  args: {
    id: 'email',
    label: 'Email',
    placeholder: 'email address',
    type: 'email',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText(/email/i)
    await userEvent.type(input, 'customer@example.com')
    await expect(input).toHaveValue('customer@example.com')
  },
}

export const WithError: Story = {
  args: {
    id: 'firstName',
    label: 'First name',
    error: 'Required',
  },
}

export const Telephone: Story = {
  args: {
    id: 'phone',
    label: 'Phone number',
    placeholder: 'phone number',
    type: 'tel',
  },
}
