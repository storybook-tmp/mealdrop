import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta = {
  title: 'AI Generated/Medium/Input',
  component: Input,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email address',
    id: 'email',
    placeholder: 'you@example.com',
    type: 'email',
  },
}

export const WithError: Story = {
  args: {
    label: 'Phone number',
    id: 'phone',
    placeholder: '+1 555 000 0000',
    error: 'Please enter a valid phone number',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    id: 'password',
    type: 'password',
    placeholder: '••••••••',
  },
}
