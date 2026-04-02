import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'AI Generated/Medium/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    type: 'email',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    type: 'email',
    error: 'Invalid email address',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Name',
    defaultValue: 'John Doe',
    placeholder: 'Enter name',
  },
}
