import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'

const meta = {
  title: 'AI Generated/Medium/Input',
  component: Input,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
    id: 'email',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    id: 'password',
    error: 'Password must be at least 8 characters',
  },
}
